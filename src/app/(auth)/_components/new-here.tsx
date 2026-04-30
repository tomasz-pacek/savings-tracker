import Link from "next/link";
import { Route } from "next";

type Props = {
  introText: string;
  actionText: string;
  href: Route;
};

export default function NewHere({ introText, actionText, href }: Props) {
  return (
    <div className="mt-6 flex w-full items-center justify-center gap-x-1 whitespace-nowrap">
      <p>{introText}</p>
      <p>{actionText}</p>
      <Link href={href} className="text-sky-500 underline">
        here
      </Link>
    </div>
  );
}
