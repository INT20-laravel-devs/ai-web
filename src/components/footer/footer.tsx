import Link from "next/link";
import { type FC } from "react";

import { Separator } from "@/components/ui/separator";

import { Logo } from "../logo";
import NavFooter from "./nav-footer";

const footerData = {
  copyright: {
    text: "All rights reserved.",
    companyName: "Larabel Dev",
    companyLink: "/",
  },
};

const Footer: FC = () => {
  const { copyright } = footerData;
  const currentYear = new Date().getFullYear();

  return (
    <div className="flex flex-col">
      <footer>
        <div className="mx-auto max-w-screen-xl">
          <div className="flex flex-col items-center justify-start py-6">
            <Logo />
            <NavFooter />
          </div>
          <Separator />
          <div className="flex-text flex items-center justify-center gap-x-2 gap-y-5 px-3 py-8 sm:flex-row xl:px-0">
            {/* Copyright */}
            <span className="text-muted-foreground">
              &copy; {currentYear}{" "}
              <Link href={copyright.companyLink} target="_blank">
                {copyright.companyName}
              </Link>
              . {copyright.text}
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
