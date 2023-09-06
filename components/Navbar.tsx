import Image from "next/image";
import Link from "next/link";
import React from "react";
import AuthProviders from "./AuthProviders";

const Navbar = () => {
  

  return (
    <nav className="flexBetween navbar">
      {/* Company Logo */}
      <div className="flex-1 flexStart gap-10">
        <Link href="/">
          <Image
            src="/vpass-favicon.png"
            width={55}
            height={13}
            alt="Versified Password Manager"
          />
        </Link>
      </div>

      {/* Sign In | Sign Out Button */}
      <AuthProviders />
    </nav>
  );
};

export default Navbar;
