"use client";

import ActionButton from "@/components/shared/action-button";
import { ChangeEvent, useState, useTransition } from "react";
import { startChat } from "./actions";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { ArrowUp } from "lucide-react";

export default function NewChatPage() {
  const [value, setValue] = useState<string>("");
  const [isPending, startTransition] = useTransition();

  const onSubmit = (e: ChangeEvent) => {
    e.preventDefault();
    if (!value.trim() || isPending) return;
    startTransition(() => {
      startChat(value);
    });
  };

  return (
    <div className="flex min-h-svh w-full flex-col items-center justify-center">
      <div>Ask me anything!</div>
      <form onSubmit={onSubmit} className="mt-auto mb-12 w-1/2">
        <InputGroup className="rounded-sm py-6">
          <InputGroupInput
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Ask about your savings..."
            disabled={isPending}
          />
          <InputGroupAddon align={"inline-end"}>
            <ActionButton
              type="submit"
              disabled={isPending}
              loadingSpinner
              isPending={isPending}
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
