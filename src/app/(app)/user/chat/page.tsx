"use client";

import ActionButton from "@/components/shared/action-button";
import { Input } from "@/components/ui/input";
import { ChangeEvent, useState, useTransition } from "react";
import { startChat } from "./actions";

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
    <form onSubmit={onSubmit}>
      <Input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Ask about your savings..."
        disabled={isPending}
      />
      <ActionButton
        type="submit"
        disabled={isPending}
        loadingSpinner
        isPending={isPending}
      >
        Send
      </ActionButton>
    </form>
  );
}
