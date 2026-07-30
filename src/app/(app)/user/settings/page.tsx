import { getCurrentSession } from "@/lib/auth-utils";
import { redirect } from "next/navigation";
import SettingsCardTemplate from "./_components/settings-card-template";
import { Lock, TriangleAlert, User } from "lucide-react";
import ChangePasswordForm from "./_components/change-password-form";
import DangerZoneForm from "./_components/danger-zone-form";
import { Metadata } from "next";
import ActionsBar from "./_components/actions-bar";
import UsernameChangeForm from "./_components/username-change-form";
import EmailChangeForm from "./_components/email-change-form";
import HeaderServer from "@/components/header/header-server";

export const metadata: Metadata = {
  title: "Settings",
  description:
    "Manage your account settings, and update your profile to personalize your experience.",
};

export default async function UserSettingsPage() {
  const session = await getCurrentSession();

  if (!session) redirect("/");

  return (
    <div className="flex min-h-screen flex-col">
      <HeaderServer />
      <main className="container mx-auto mt-6 px-4">
        <ActionsBar />
        <div className="w-full space-y-6">
          <SettingsCardTemplate
            icon={User}
            heading="Personal Information"
            description="Manage your name and email"
          >
            <div className="flex w-full flex-col items-center justify-center gap-4 sm:flex-row">
              <UsernameChangeForm user={session.user} />
              <EmailChangeForm user={session.user} />
            </div>
          </SettingsCardTemplate>
          <SettingsCardTemplate
            icon={Lock}
            heading="Change Password"
            description="Update your account password"
          >
            <ChangePasswordForm />
          </SettingsCardTemplate>
          <SettingsCardTemplate
            icon={TriangleAlert}
            heading="Danger Zone"
            description="After deleting your account all data will be permanently deleted. This operation can't be undone."
            iconWrapperClassName="bg-destructive/15"
            iconClassName="text-destructive"
          >
            <DangerZoneForm />
          </SettingsCardTemplate>
        </div>
      </main>
    </div>
  );
}
