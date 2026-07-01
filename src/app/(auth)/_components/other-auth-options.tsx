"use client";

import ActionButton from "@/components/shared/action-button";
import { authClient } from "@/lib/auth-client";
import { useState } from "react";
import { FaGoogle } from "react-icons/fa";
import { toast } from "sonner";

export default function OtherAuthOptions() {
  const [loading, setLoading] = useState<boolean>(false);
  const handleGoogleLogin = async () => {
    await authClient.signIn.social(
      {
        provider: "google",
      },
      {
        onRequest: () => {
          setLoading(true);
        },
        onSuccess: () => {
          setLoading(false);
        },
        onError: (ctx) => {
          toast(ctx.error.message || "Something went wrong");
          console.error(ctx.error.message);
          setLoading(false);
        },
      },
    );
  };
  return (
    <div className="w-full">
      <ActionButton
        onClick={handleGoogleLogin}
        className="w-full rounded-sm border-none bg-white py-5 text-black hover:bg-white/90"
        loadingSpinner
        isPending={loading}
        disabled={loading}
      >
        <FaGoogle />
        Login with Google
      </ActionButton>
    </div>
  );
}
