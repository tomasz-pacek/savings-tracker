"use client";

import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ActionsBar() {
  const router = useRouter();

  return (
    <div className="w-full flex items-center justify-between">
      {/* Back Button */}
      <Button
        className="bg-transparent text-muted-foreground hover:bg-muted-foreground/10"
        onClick={() => router.back()}
      >
        <ChevronLeft />
        Back
      </Button>
      {/* Container to Edit and Delete Current Goal */}
      <div className="flex items-center justify-center gap-x-2">
        <Button className="bg-transparent text-foreground hover:bg-foreground/10">
          Edit goal
        </Button>
        <Button className="bg-transparent text-destructive hover:bg-destructive/10">
          Delete goal
        </Button>
      </div>
    </div>
  );
}
