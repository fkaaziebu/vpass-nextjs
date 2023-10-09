import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { description, password } = await req.json();
    const profile = await currentProfile();

    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    await db.password.create({
      data: {
        profileId: profile.id,
        description: description,
        password: password,
      }
    });

    return NextResponse.json({});
  } catch (error) {
    console.log("[CREATE_PASSWORD_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
