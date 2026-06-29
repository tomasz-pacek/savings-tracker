import { getCurrentSession } from "@/lib/auth-utils";
import NewHere from "../_components/new-here";
import RegisterForm from "./_components/register-form";
import { redirect } from "next/navigation";
import BeamsBackground from "../_components/background-beam";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import AuthSeparator from "../_components/auth-separator";
import OtherAuthOptions from "../_components/other-auth-options";

export default async function RegisterPage() {
  const session = await getCurrentSession();
  if (session?.user) redirect("/");
  return (
    <div className="relative flex h-screen w-screen items-center justify-center">
      <BeamsBackground />
      <Card className="absolute top-1/2 left-1/2 w-md -translate-x-1/2 -translate-y-1/2 px-4 py-8">
        <CardHeader>
          <CardTitle className="text-xl">Create your account</CardTitle>
          <CardDescription>
            Complete all fields to create your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <RegisterForm />
          <AuthSeparator />
          <OtherAuthOptions />
        </CardContent>
      </Card>
    </div>
  );
}
