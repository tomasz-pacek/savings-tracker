"use client";

import { CheckCircle2, Circle } from "lucide-react";

type Props = {
  password: string;
};

const rules = [
  {
    id: "length",
    label: "Minimum length of 8 characters",
    test: (v: string) => v.length >= 8,
  },
  {
    id: "upper",
    label: "At least one uppercase letter",
    test: (v: string) => /[A-Z]/.test(v),
  },
  {
    id: "digit",
    label: "At least one digit",
    test: (v: string) => /[0-9]/.test(v),
  },
  {
    id: "special",
    label: "At least one special character",
    test: (v: string) => /[^A-Za-z0-9]/.test(v),
  },
];

export default function PasswordRequirements({ password }: Props) {
  const passed = rules.map((r) => r.test(password));
  return (
    <ul className="space-y-1.5">
      {rules.map((rule, i) => (
        <li key={rule.id} className="flex items-center gap-2 text-sm">
          {passed[i] ? (
            <CheckCircle2 className="h-4 w-4 shrink-0 text-green-500" />
          ) : (
            <Circle className="text-muted-foreground h-4 w-4 shrink-0" />
          )}
          <span
            className={passed[i] ? "text-green-600" : "text-muted-foreground"}
          >
            {rule.label}
          </span>
        </li>
      ))}
    </ul>
  );
}
