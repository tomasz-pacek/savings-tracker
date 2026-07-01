"use client";

import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ActionsBar() {
  const router = useRouter();
  return (
    <div className="my-4 w-full">
      <Button
        className="text-muted-foreground hover:bg-muted-foreground/10 bg-transparent"
        onClick={() => router.back()}
      >
        <ChevronLeft />
        Back
      </Button>
    </div>
  );
}
