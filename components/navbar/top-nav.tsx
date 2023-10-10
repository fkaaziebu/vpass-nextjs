"use client";

import { UserButton } from "@clerk/clerk-react";
import { Separator } from "@radix-ui/react-separator";
import Image from "next/image";
import Link from "next/link";

export const TopNav = () => {
  return (
    <div className="flex justify-between p-2 border-b-2 mb-5">
      <div>
        <Link href={"/"}>
          <Image
            src={"/vpass-with-background.jpg"}
            alt="VPASS LOGO"
            width={170}
            height={100}
          />
        </Link>
      </div>
      <div>
        <UserButton
          afterSignOutUrl="/"
          appearance={{
            elements: {
              avatarBox: "h-[48px] w-[48px]",
            },
          }}
        />
      </div>
    </div>
  );
};
