"use client";

import * as React from "react";
import { Button, buttonVariants } from "../ui/button";
import { VariantProps } from "class-variance-authority";

type Props = React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    isPending?: boolean;
    pendingText?: string;
    children: React.ReactNode;
  };

export default function ActionButton({
  children,
  isPending,
  pendingText = "Loading...",
  disabled,
  ...props
}: Props) {
  return (
    <Button disabled={disabled || isPending} {...props}>
      {isPending ? pendingText : children}
    </Button>
  );
}
