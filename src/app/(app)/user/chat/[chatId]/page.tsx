import { db } from "@/db";
import { chatMessage } from "@/db/schema";
import { asc, eq } from "drizzle-orm";
import ChatClient from "./_components/chat-client";

type Props = {
  params: Promise<{ chatId: string }>;
};

export default async function ChatPage({ params }: Props) {
  const chatId = (await params).chatId;
  const history = await db
    .select()
    .from(chatMessage)
    .where(eq(chatMessage.chatId, chatId))
    .orderBy(asc(chatMessage.createdAt));

  const needsResponse = history.length > 0 && history.at(-1)!.role === "user";

  return (
    <ChatClient
      chatId={chatId}
      initialMessages={history.map((message) => ({
        id: message.id,
        role: message.role,
        parts: [{ type: "text", text: message.content }],
      }))}
      autoStart={needsResponse}
    />
  );
}
