import { openrouter } from "@/lib/ai/ai";
import { convertToModelMessages, streamText, UIMessage } from "ai";
import { db } from "@/db";
import { chatMessage } from "@/db/schema";
import { eq, and } from "drizzle-orm";

export async function POST(
  req: Request,
  { params }: { params: Promise<{ chatId: string }> },
) {
  const { chatId } = await params;
  const { messages }: { messages: UIMessage[] } = await req.json();

  const lastMsg = messages.at(-1);
  if (lastMsg?.role === "user") {
    const text = lastMsg.parts
      .filter((p) => p.type === "text")
      .map((p) => p.text)
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
      await db
        .insert(chatMessage)
        .values({ chatId, role: "user", content: text });
    }
  }

  const result = streamText({
    model: openrouter.chat("gpt-4o-mini"),
    maxOutputTokens: 2000,
    system: `
      You are an AI assistant for a savings tracking application.
      Help users manage and understand their savings goals.
      Be concise and helpful.
    `,
    messages: await convertToModelMessages(messages),
    onFinish: async ({ text }) => {
      await db
        .insert(chatMessage)
        .values({ chatId, role: "assistant", content: text });
    },
  });

  return result.toUIMessageStreamResponse();
}
