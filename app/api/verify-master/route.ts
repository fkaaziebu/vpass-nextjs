import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { sendMail } from "@/lib/send-mail";
import { generateString } from "@/lib/utils";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const profile = await currentProfile();
    const { password } = await req.json();

    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const options = {
      numeric: true,
      lowercase: false,
      uppercase: false,
      symbols: false,
    };

    let master = await db.master.findUnique({
      where: {
        profileId: profile.id,
      },
    });

    if (!master) {
      return new NextResponse("No Master Password found", { status: 400 });
    }

    if (password !== master.password) {
      return new NextResponse("Password provided does not match", {
        status: 400,
      });
    }

    await db.master.update({
      where: {
        profileId: profile.id,
      },
      data: {
        isVerified: true,
      },
    });

    return NextResponse.json({ msg: "Password verified successfully" });
  } catch (error) {
    console.log("[CREATE_PASSWORD_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
