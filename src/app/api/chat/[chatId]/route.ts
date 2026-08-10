import { openrouter } from "@/lib/ai/ai";
import { convertToModelMessages, stepCountIs, streamText, UIMessage } from "ai";
import { db } from "@/db";
import { chatMessage } from "@/db/schema";
import { eq, and } from "drizzle-orm";
import { createSavingsTools } from "@/lib/ai/tools/savings";
import { getCurrentSession } from "@/lib/auth-utils";

export async function POST(
  req: Request,
  { params }: { params: Promise<{ chatId: string }> },
) {
  const { chatId } = await params;
  const { messages }: { messages: UIMessage[] } = await req.json();

  const session = await getCurrentSession();

  if (!session) {
    return new Response("Unauthorized", { status: 401 });
  }

  const userId = session.user.id;

  const lastMsg = messages.at(-1);

  let userMessageId: string | undefined;

  if (lastMsg?.role === "user") {
    const text = lastMsg.parts
      .filter((part) => part.type === "text")
      .map((part) => part.text)
      .join("");

    const existing = await db
      .select()
      .from(chatMessage)
      .where(
        and(
          eq(chatMessage.chatId, chatId),
          eq(chatMessage.content, text),
          eq(chatMessage.role, "user"),
        ),
      );

    if (existing.length === 0) {
      const [userMessage] = await db
        .insert(chatMessage)
        .values({
          chatId,
          role: "user",
          content: text,
          generationStatus: "pending",
        })
        .returning({
          id: chatMessage.id,
        });

      userMessageId = userMessage.id;
    } else {
      userMessageId = existing.at(-1)?.id;
    }
  }

  const result = streamText({
    model: openrouter.chat("gpt-4o-mini"),
    maxOutputTokens: 2000,
    stopWhen: stepCountIs(5),

    system: `
      You are an AI assistant for a savings tracking application.
      Help users manage and understand their savings goals.
      All amounts (targetAmount, currentAmount, deposit amounts) are in USD.
      Always format amounts with a $ sign, e.g. $1,200.
      Be concise and helpful.
    `,

    tools: createSavingsTools(userId),
    messages: await convertToModelMessages(messages),

    onFinish: async ({ text }) => {
      if (!text.trim()) return;

      await db.insert(chatMessage).values({
        chatId,
        role: "assistant",
        content: text,
      });

      if (userMessageId) {
        await db
          .update(chatMessage)
          .set({
            generationStatus: "completed",
          })
          .where(eq(chatMessage.id, userMessageId));
      }
    },

    onError: async ({ error }) => {
      console.error("AI error:", error);

      if (userMessageId) {
        await db
          .update(chatMessage)
          .set({
            generationStatus: "error",
          })
          .where(eq(chatMessage.id, userMessageId));
      }
    },
  });

  return result.toUIMessageStreamResponse();
}
