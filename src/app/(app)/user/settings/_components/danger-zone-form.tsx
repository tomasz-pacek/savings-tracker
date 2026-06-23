"use client";

import ActionButton from "@/components/shared/action-button";
import { useState } from "react";
import DeleteAccountDialog from "./delete-account-dialog";

export default function DangerZoneForm() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <div className="flex w-full items-center justify-start">
      <ActionButton
        variant="destructive"
        className="font-normal"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        Delete account
      </ActionButton>
      <DeleteAccountDialog isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
}
