import { currentProfile } from "@/lib/current-profile";

import { db } from "@/lib/db";

export const checkMasterValidity = async () => {
  const profile = await currentProfile();

  if (!profile) {
    return false;
  }

  const masterPassword = await db.master.findUnique({
    where: {
      profileId: profile.id,
    },
  });

  const masterPasswordDateCreated = new Date(masterPassword?.createdAt);

  const dateRightNow = new Date().getTime();

  const isExpired =
    12 <= (dateRightNow - masterPasswordDateCreated.getTime()) / 3600000;

  if (isExpired) {
    await db.master.delete({
      where: {
        profileId: profile.id,
      },
    });
  }
};