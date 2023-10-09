"use client";

import { UserButton } from "@clerk/clerk-react";
import { Separator } from "@radix-ui/react-separator";

export const TopNav = () => {
  return (
    <div className="flex justify-between p-2">
      <div>
        <h1 className="text-3xl">VPASS LOGO</h1>
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
