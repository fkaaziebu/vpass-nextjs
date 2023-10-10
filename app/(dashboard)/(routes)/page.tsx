import { getUserProfile } from "@/lib/initial-profile";
import { Navbar } from "@/components/navbar/navbar";
import { Separator } from "@/components/ui/separator";
import { db } from "@/lib/db";
import { PasswordListing } from "@/components/password-listing";
import { checkMasterPassword } from "@/lib/check-master-password";
import { checkMasterVerified } from "@/lib/check-master-verified";
import { checkMasterValidity } from "@/lib/check-master-validity";

const DashboardPage = async () => {
  await checkMasterValidity();
  const profile = await getUserProfile();
  const isMasterPassword = await checkMasterPassword();
  const isMasterVerified = await checkMasterVerified();


  let passwords = await db.password.findMany({
    where: {
      profileId: profile.id,
    },
  });

  if (passwords.length === 0) {
    // @ts-ignore
    passwords = await db.password.create({
      data: {
        profileId: profile.id,
        description: "Amazon",
        password: "Test Password",
      },
    });
    // @ts-ignore
    passwords = [passwords];
  }

  return (
    <div className="md:container">
      <Navbar
        isMasterVerified={isMasterVerified}
        isMasterPassword={isMasterPassword}
      />
      <Separator />
      <PasswordListing
        passwords={passwords}
        isMasterVerified={isMasterVerified}
        isMasterPassword={isMasterPassword}
      />
    </div>
  );
};

export default DashboardPage;
