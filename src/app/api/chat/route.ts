import { openrouter } from "@/lib/ai/ai";
import { convertToModelMessages, streamText, UIMessage } from "ai";

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json();
  const result = streamText({
    model: openrouter("gpt-4o-mini"),
    maxOutputTokens: 2000,
    system: `
      You are an AI assistant for a savings tracking application.
      Help users manage and understand their savings goals.
      Be concise and helpful.
    `,
    messages: await convertToModelMessages(messages),
  });

  return result.toUIMessageStreamResponse();
}
