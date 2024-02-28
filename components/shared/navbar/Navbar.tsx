import Link from "next/link";
import React from "react";
import Image from "next/image";
import { UserButton } from "@clerk/nextjs";

import { GlobalSearch } from "../search/GlobalSearch";
import { Theme } from "./Theme";
import { MobileNav } from "./MobileNav";

export const Navbar = () => {
  return (
    <nav className="flex-between background-light900_dark200 fixed z-50 w-full gap-5 p-6 shadow-light-300 dark:shadow-none sm:px-12">
      <Link href="/" className="flex items-center gap-1">
        <Image
          src={"/assets/images/site-logo.svg"}
          alt={"BaryshevOverflow"}
          width={23}
          height={23}
        />
        <p className="h2-bold font-spaceGrotesk text-dark-100 dark:text-light-900 max-sm:hidden">
          Baryshev
          <span className="text-primary-500">Overflow</span>
        </p>
      </Link>
      <GlobalSearch />
      <div className="flex-between gap-5">
        <Theme />
        {/* <SignIn /> */}
        <UserButton
          afterSignOutUrl="/"
          appearance={{
            elements: {
              avatarBox: "w-10 h-10",
            },
            variables: {
              colorPrimary: "#FF7000",
            },
          }}
        />
        <MobileNav />
      </div>
    </nav>
  );
};
