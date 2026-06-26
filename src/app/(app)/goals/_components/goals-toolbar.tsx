"use client";

import ActionButton from "@/components/shared/action-button";
import { exportUserDataAsCSV } from "../actions";
import { useState } from "react";

export default function GoalsToolbar() {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleExport = async () => {
    setIsLoading(true);
    exportUserDataAsCSV()
      .then((csv) => {
        const blob = new Blob([csv], { type: "text/csv;charset-utf8" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        const date = new Date().toISOString().slice(0, 10);
        a.href = url;
        a.download = `my-goals-${date}.csv`;
        a.click();
        URL.revokeObjectURL(url);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  return (
    <div className="w-full">
      <div className="flex w-full flex-row items-center justify-end">
        <ActionButton
          variant={"outline"}
          size={"sm"}
          isPending={isLoading}
          disabled={isLoading}
          pendingText="Exporting..."
          onClick={handleExport}
        >
          Export to CSV
        </ActionButton>
      </div>
    </div>
  );
}
