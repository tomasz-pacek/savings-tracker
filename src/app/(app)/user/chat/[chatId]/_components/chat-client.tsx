"use client";

import ActionButton from "@/components/shared/action-button";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport, UIDataTypes, UIMessage, UITools } from "ai";
import { ArrowUp } from "lucide-react";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import MessagesView from "./messages-view";

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
  const isBusy = status !== "ready";

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
    <div className="flex h-svh w-full flex-col items-center justify-center">
      <MessagesView messages={messages} />
      <form onSubmit={onSubmit} className="mb-12 w-1/2 shrink-0">
        <InputGroup className="rounded-sm py-6">
          <InputGroupInput
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about your savings..."
            disabled={isBusy}
          />
          <InputGroupAddon align={"inline-end"}>
            <ActionButton
              type="submit"
              disabled={isBusy}
              isPending={isBusy}
              className="rounded-full bg-white px-2 text-black hover:bg-white/50"
            >
              <ArrowUp />
            </ActionButton>
          </InputGroupAddon>
        </InputGroup>
      </form>
    </div>
  );
}
