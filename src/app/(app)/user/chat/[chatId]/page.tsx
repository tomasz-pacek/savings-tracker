import { getCurrentSession } from "@/lib/auth-utils";
import ChatClient from "./_components/chat-client";
import { getChatHistory } from "@/db/queries";
import { redirect } from "next/navigation";

type Props = {
  params: Promise<{ chatId: string }>;
};

export default async function ChatPage({ params }: Props) {
  const session = await getCurrentSession();
  if (!session) redirect("/login");
  const chatId = (await params).chatId;
  const history = await getChatHistory(session.user.id, chatId);
  const lastMessage = history.at(-1);

  const needsResponse =
    lastMessage?.role === "user" && lastMessage.generationStatus === "pending";

  return (
    <ChatClient
      key={chatId}
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
