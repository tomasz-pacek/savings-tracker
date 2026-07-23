"use client";

import ActionButton from "@/components/shared/action-button";
import { createChat } from "../actions";
import { useRouter } from "next/navigation";

export default function CreateChatButton() {
  const router = useRouter();
  const handleCreateChat = async () => {
    const chatId = await createChat();
    router.push(`/user/chat/${chatId}`);
  };
  return <ActionButton onClick={handleCreateChat}>New chat</ActionButton>;
}
