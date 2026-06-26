import { getCurrentSession } from "@/lib/auth-utils";
import UserDetailsCard from "./_components/user-details-card";
import { redirect } from "next/navigation";
import SettingsCardTemplate from "./_components/settings-card-template";
import { Lock, TriangleAlert, User } from "lucide-react";
import PersonalInformationForm from "./_components/personal-information-form";
import ChangePasswordForm from "./_components/change-password-form";
import DangerZoneForm from "./_components/danger-zone-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Settings",
};

export default async function UserSettingsPage() {
  const session = await getCurrentSession();

  if (!session) redirect("/");

  return (
    <main className="container mx-auto mt-6">
      <div className="flex w-full items-start gap-6">
        <div className="self-start">
          <UserDetailsCard user={session.user} />
        </div>
        <div className="w-full space-y-6">
          <SettingsCardTemplate
            icon={User}
            heading="Personal Information"
            description="Manage your name and email"
          >
            <PersonalInformationForm user={session.user} />
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
      </div>
    </main>
  );
}
