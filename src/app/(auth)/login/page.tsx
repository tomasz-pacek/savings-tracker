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
  // TODO: description: ""
};

export default async function LoginPage() {
  const session = await getCurrentSession();
  if (session?.user) redirect("/");
  return (
    <div className="relative flex h-screen w-screen items-center justify-center">
      <BeamsBackground />
      <Card className="absolute top-1/2 left-1/2 w-md -translate-x-1/2 -translate-y-1/2 px-4 py-8">
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
