import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { generateString } from "@/lib/utils";
import { NextResponse } from "next/server";

export async function DELETE(req: Request) {
  try {
    const profile = await currentProfile();

    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    let master = await db.master.findUnique({
      where: {
        profileId: profile.id,
      },
    });

    if (master) {
      await db.master.delete({
        where: {
          profileId: profile.id,
        },
      });
    }

    return NextResponse.json({ msg: "Master Password Deleted Successfully" });
  } catch (error) {
    console.log("[CREATE_PASSWORD_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
