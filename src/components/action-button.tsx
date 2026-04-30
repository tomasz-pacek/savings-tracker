"use client";

import { Button } from "./ui/button";

type Props = {
  content: string;
  className: string;
  isPending?: boolean;
  isPendingContent?: string;
  type?: "button" | "submit" | "reset";
  variant?:
    | "default"
    | "outline"
    | "secondary"
    | "ghost"
    | "destructive"
    | "link";
  size?: "default" | "xs" | "sm" | "lg" | "icon";
  onClick?: () => void;
  disabled?: boolean;
};

export default function ActionButton({
  content,
  className,
  isPending,
  isPendingContent,
  type,
  variant,
  size,
  onClick,
  disabled,
}: Props) {
  return (
    <Button
      className={className}
      disabled={disabled}
      type={type}
      variant={variant}
      size={size}
      onClick={onClick}
    >
      {isPending ? isPendingContent : content}
    </Button>
  );
}
