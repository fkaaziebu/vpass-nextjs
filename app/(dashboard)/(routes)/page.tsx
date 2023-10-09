import { getUserProfile } from "@/lib/initial-profile";
import { Navbar } from "@/components/navbar/navbar";
import { Separator } from "@/components/ui/separator";
import { db } from "@/lib/db";
import { PasswordListing } from "@/components/password-listing";
import { checkMasterPassword } from "@/lib/check-master-password";

const DashboardPage = async () => {
  const profile = await getUserProfile();
  const isMasterPassword = await checkMasterPassword();

  let passwords = await db.password.findMany({
    where: {
      profileId: profile.id,
    },

  });

  if (passwords.length === 0) {
    passwords = await db.password.create({
      data: {
        profileId: profile.id,
        description: "Amazon",
        password: "Test Password",
      },
    });

    passwords = [passwords];
  }

  return (
    <div className="md:container">
      <Navbar isMasterPassword={isMasterPassword} />
      <Separator />
      <PasswordListing
        passwords={passwords}
        isMasterPassword={isMasterPassword}
      />
    </div>
  );
};

export default DashboardPage;
