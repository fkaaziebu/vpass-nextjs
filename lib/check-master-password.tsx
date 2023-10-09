import { currentProfile } from "@/lib/current-profile";

import { db } from "@/lib/db";

export const checkMasterPassword = async () => {
  const profile = await currentProfile();

  if (!profile) {
    return false;
  }

  const masterPassword = await db.master.findUnique({
    where: {
      profileId: profile.id,
    },
  });

  return masterPassword ? true : false;
};
