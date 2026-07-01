"use client";

import ActionButton from "@/components/shared/action-button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Label } from "@/components/ui/label";
import { authClient } from "@/lib/auth-client";
import { Eye, EyeClosed } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

type Props = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function DeleteAccountDialog({ isOpen, setIsOpen }: Props) {
  const router = useRouter();
  const [password, setPassword] = useState<string>("");
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);

  const handleDeletePassword = async () => {
    await authClient.deleteUser(
      {
        password,
      },
      {
        onRequest: () => {
          setIsDeleting(true);
        },
        onSuccess: () => {
          setIsOpen(false);
          setIsDeleting(false);
          router.replace("/");
          toast("Your account has been deleted");
        },
        onError: (ctx) => {
          console.error(ctx.error.message);
          toast(ctx.error.message || "Something went wrong");
        },
      },
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </DialogDescription>
        </DialogHeader>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (!isDeleting) handleDeletePassword();
          }}
        >
          <Label
            htmlFor="delete-account-password-input"
            className="flex flex-col items-start"
          >
            Enter your password to delete your account
            <InputGroup id="delete-account-password-input">
              <InputGroupInput
                placeholder="••••••••••••••••"
                type={isPasswordVisible ? "text" : "password"}
                autoComplete="off"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <InputGroupAddon
                align="inline-end"
                className="cursor-pointer"
                onClick={() => setIsPasswordVisible((prev) => !prev)}
              >
                {isPasswordVisible ? <EyeClosed /> : <Eye />}
              </InputGroupAddon>
            </InputGroup>
          </Label>

          <ActionButton
            type="submit"
            isPending={isDeleting}
            disabled={isDeleting}
            loadingSpinner
            className="mt-4 w-full"
            variant={"destructive"}
          >
            Delete account
          </ActionButton>
        </form>
      </DialogContent>
    </Dialog>
  );
}
