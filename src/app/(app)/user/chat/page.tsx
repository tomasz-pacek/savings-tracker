"use client";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import ActionButton from "@/components/shared/action-button";
import { useChat } from "@ai-sdk/react";
import { ArrowUp } from "lucide-react";
import { FormEvent, useState } from "react";

export default function ChatPageMain() {
  const [input, setInput] = useState("");
  const { sendMessage } = useChat();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!input.trim()) return;

    sendMessage({
      text: input,
    });

    setInput("");
  };

  return (
    <div className="flex min-h-svh w-full flex-col p-8">
      <form onSubmit={handleSubmit} className="mt-auto w-1/2 self-center">
        <InputGroup className="rounded-sm py-6">
          <InputGroupInput
            className="px-6"
            placeholder="Ask about your savings or create a new goal..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={status !== "ready"}
          />

          <InputGroupAddon align="inline-end" className="pr-3">
            <ActionButton
              className="bg-white hover:bg-white/50"
              size="icon-lg"
              type="submit"
              disabled={status !== "ready"}
            >
              <ArrowUp className="text-black" size={20} />
            </ActionButton>
          </InputGroupAddon>
        </InputGroup>
      </form>
    </div>
  );
}
