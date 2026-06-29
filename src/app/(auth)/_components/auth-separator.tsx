import { Separator } from "@/components/ui/separator";

export default function AuthSeparator() {
  return (
    <div className="w-full">
      <div className="relative my-6">
        <Separator className="bg-muted-foreground" />
        <span className="bg-card text-muted-foreground absolute left-1/2 -translate-1/2 px-2 text-xs">
          OR CONTINUE WITH
        </span>
      </div>
    </div>
  );
}
