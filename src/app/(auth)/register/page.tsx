import { getCurrentSession } from "@/lib/auth-utils";
import CardWrapper from "../_components/card-wrapper";
import NewHere from "../_components/new-here";
import RegisterForm from "./_components/register-form";
import { redirect } from "next/navigation";

export default async function RegisterPage() {
  const session = await getCurrentSession();
  if (session?.user) redirect("/");
  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <CardWrapper cardTitle="Create your account">
        <RegisterForm />
        <NewHere
          introText="Already been here?"
          actionText="Login to your account"
          href="/login"
        />
      </CardWrapper>
    </div>
  );
}
