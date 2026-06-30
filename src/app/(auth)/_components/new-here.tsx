"use client";

import { Route } from "next";
import Link from "next/link";

type Props = {
  href: Route;
  span: string;
  hrefText: string;
};

export default function NewHere({ href, span, hrefText }: Props) {
  return (
    <div className="mt-4 flex w-full items-center justify-center gap-1">
      <span>{span}</span>
      <Link href={href} className="text-sky-600 hover:underline">
        {hrefText}
      </Link>
    </div>
  );
}
