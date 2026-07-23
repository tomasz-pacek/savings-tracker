"use client";

import { useChat } from "@ai-sdk/react";
import { useState, FormEvent } from "react";
import ChatMessages from "./_components/chat-messages";
import ChatInput from "../_components/chat-input";

export default function ChatPage() {
  const [inputValue, setInputValue] = useState<string>("");

  const { messages, sendMessage, status } = useChat({
    throttle: 500,
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!inputValue.trim()) return;

    sendMessage({
      text: inputValue,
    });

    setInputValue("");
  };

  return (
    <div className="flex min-h-svh w-full flex-col p-8">
      <ChatMessages messages={messages} />
      <ChatInput
        inputValue={inputValue}
        setInputValue={setInputValue}
        handleSubmit={handleSubmit}
        status={status}
      />
    </div>
  );
}
