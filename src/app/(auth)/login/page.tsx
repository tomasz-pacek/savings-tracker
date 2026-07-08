import { getCurrentSession } from "@/lib/auth-utils";
import { redirect } from "next/navigation";
import BeamsBackground from "../_components/background-beam";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import LoginForm from "./_components/login-form";
import OtherAuthOptions from "../_components/other-auth-options";
import AuthSeparator from "../_components/auth-separator";
import NewHere from "../_components/new-here";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login",
  description:
    "Sign in to your account to manage your budget, track expenses, achieve financial goals, and get a complete overview of your finances.",
};

export default async function LoginPage() {
  const session = await getCurrentSession();
  if (session?.user) redirect("/");
  return (
    <div className="relative flex min-h-screen w-screen items-center justify-center overflow-hidden">
      <BeamsBackground className="absolute -z-10" />
      <Card className="- mx-4 w-full max-w-md px-4 py-8">
        <CardHeader>
          <CardTitle className="text-xl">Welcome back</CardTitle>
          <CardDescription>
            Enter your credentials to access your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <LoginForm />
          <AuthSeparator />
          <OtherAuthOptions />
          <NewHere
            href="/register"
            hrefText="Register Now"
            span="Don't have an account?"
          />
        </CardContent>
      </Card>
    </div>
  );
}
