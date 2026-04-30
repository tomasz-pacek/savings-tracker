import { getCurrentSession } from "@/lib/auth-utils";
import CardWrapper from "../_components/card-wrapper";
import NewHere from "../_components/new-here";
import { redirect } from "next/navigation";
import LoginForm from "./_components/login-form";

export default async function LoginPage() {
  const session = await getCurrentSession();
  if (session?.user) redirect("/");
  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <CardWrapper cardTitle="Login to your account">
        <LoginForm />
        <NewHere
          introText="New here?"
          actionText="Create your account"
          href="/register"
        />
      </CardWrapper>
    </div>
  );
}
