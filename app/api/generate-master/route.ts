import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { sendMail } from "@/lib/send-mail";
import { generateString } from "@/lib/utils";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const profile = await currentProfile();

    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const options = {
      numeric: true,
      lowercase: true,
      uppercase: true,
      symbols: false,
    };

    let master = await db.master.findUnique({
      where: {
        profileId: profile.id,
      },
    });

    if (!master) {
      master = await db.master.create({
        data: {
          profileId: profile.id,
          password: generateString(8, options),
        },
      });
    } else {
      master = await db.master.update({
        where: {
          profileId: profile.id,
        },
        data: {
          password: generateString(5, options),
        },
      });
    }

    const subject =
      "This is your master password for accessing your passwords, please don't share";

    await sendMail(subject, profile.email, master.password);

    return NextResponse.json(master);
  } catch (error) {
    console.log("[CREATE_PASSWORD_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
