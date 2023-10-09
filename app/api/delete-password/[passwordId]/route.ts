import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params }: { params: { passwordId: string } }
) {
  try {
    const profile = await currentProfile();

    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!params.passwordId) {
      return new NextResponse("Password ID Missing", { status: 400 });
    }

    let password = await db.password.findUnique({
      where: {
        id: params.passwordId,
        profileId: profile.id,
      },
    });

    if (password) {
      await db.password.delete({
        where: {
          id: params.passwordId,
          profileId: profile.id,
        },
      });
    }

    if (!password) {
      return new NextResponse("Password does not exist", { status: 400 });
    }

    return NextResponse.json({ msg: "Password deleted successfully" });
  } catch (error) {
    console.log("[CREATE_PASSWORD_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
