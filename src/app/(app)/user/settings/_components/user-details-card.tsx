import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { getUserInitials } from "@/lib/get-user-initials";
import { User } from "better-auth";
import LogoutButton from "./logout-button";

type Props = {
  user: User;
};

export default function UserDetailsCard({ user }: Props) {
  const initials = getUserInitials(user.name);
  return (
    <Card>
      <CardContent className="w-full">
        <div className="flex flex-row items-center justify-center gap-4">
          <div className="bg-foreground/10 flex size-12 items-center justify-center rounded-full">
            <p className="text-xl font-bold tracking-wider">{initials}</p>
          </div>
          <div className="flex flex-col items-start justify-center gap-1">
            <p className="capitalize">{user.name}</p>
            <p className="text-muted-foreground">{user.email}</p>
          </div>
        </div>
        <Separator className="my-4" />
        <LogoutButton />
      </CardContent>
    </Card>
  );
}
