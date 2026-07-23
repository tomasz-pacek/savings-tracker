"use client";

import ActionButton from "@/components/shared/action-button";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { ChatStatus } from "ai";
import { ArrowUp } from "lucide-react";
import { FormEvent, SetStateAction } from "react";

type Props = {
  inputValue: string;
  setInputValue: React.Dispatch<SetStateAction<string>>;
  handleSubmit: (e: FormEvent) => void;
  status: ChatStatus;
};

export default function ChatInput({
  inputValue,
  setInputValue,
  handleSubmit,
  status,
}: Props) {
  return (
    <div className="mt-auto w-1/2 self-center">
      <InputGroup className="rounded-sm py-6">
        <InputGroupInput
          className="px-6"
          placeholder="Ask about your savings or create a new goal..."
          value={inputValue}
          onChange={handleSubmit}
          disabled={status !== "ready"}
        />
        <InputGroupAddon align={"inline-end"} className="pr-3">
          <ActionButton
            disabled={status !== "ready"}
            className="bg-white hover:bg-white/50"
            size={"icon-lg"}
            loadingSpinner
            isPending={status !== "ready"}
          >
            <ArrowUp className="text-black" size={20} />
          </ActionButton>
        </InputGroupAddon>
      </InputGroup>
    </div>
  );
}
