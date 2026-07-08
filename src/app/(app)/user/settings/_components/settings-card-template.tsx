import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

type Props = {
  children: React.ReactNode;
  icon: LucideIcon;
  heading: string;
  description: string;
  iconWrapperClassName?: string;
  iconClassName?: string;
};

export default function SettingsCardTemplate({
  children,
  icon,
  heading,
  description,
  iconWrapperClassName = "bg-primary/50 border-primary",
  iconClassName,
}: Props) {
  const Icon = icon;
  return (
    <Card>
      <CardHeader className="flex items-center justify-start gap-4">
        <div className="flex items-center gap-3">
          <div
            className={cn(
              "flex size-10 shrink-0 items-center justify-center rounded-xl",
              iconWrapperClassName,
            )}
          >
            <Icon className={cn("size-5", iconClassName)} />
          </div>
          <div className="flex flex-col justify-center">
            <p className="text-base font-semibold">{heading}</p>
            <p className="text-muted-foreground">{description}</p>
          </div>
        </div>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}
