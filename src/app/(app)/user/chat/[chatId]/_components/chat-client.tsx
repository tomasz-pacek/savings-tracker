"use client";

import ActionButton from "@/components/shared/action-button";
import { Input } from "@/components/ui/input";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport, UIDataTypes, UIMessage, UITools } from "ai";
import { ChangeEvent, useEffect, useRef, useState } from "react";

type Props = {
  chatId: string;
  initialMessages: UIMessage<unknown, UIDataTypes, UITools>[];
  autoStart: boolean;
};

export default function ChatClient({
  chatId,
  initialMessages,
  autoStart,
}: Props) {
  const [input, setInput] = useState<string>("");

  const { messages, sendMessage, status, regenerate } = useChat({
    id: chatId,
    messages: initialMessages,
    transport: new DefaultChatTransport({ api: `/api/chat/${chatId}` }),
  });
  const isReady = status !== "ready";

  const triggered = useRef(false);
  useEffect(() => {
    if (autoStart && !triggered.current) {
      triggered.current = true;
      regenerate();
    }
  }, [autoStart, regenerate]);

  const onSubmit = (e: ChangeEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    sendMessage({ text: input });
    setInput("");
  };

  return (
    <div>
      {messages.map((message) => (
        <div key={message.id}>
          <strong>{message.role}</strong>
          {message.parts.map((part, i) =>
            part.type === "text" ? <span key={i}>{part.text}</span> : null,
          )}
        </div>
      ))}
      {status === "streaming" && <div>Thinking...</div>}
      <form onSubmit={onSubmit}>
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={isReady}
        />
        <ActionButton disabled={isReady} loadingSpinner isPending={isReady}>
          Send
        </ActionButton>
      </form>
    </div>
  );
}
