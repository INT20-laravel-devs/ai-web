import { type NavigationMenuProps } from "@radix-ui/react-navigation-menu";
import NextLink from "next/link"; // Import correct Link component
import { type FC } from "react";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { footerNavigation } from "@/constants/navigation";

import { buttonVariants } from "../ui/button";

const NavFooter: FC<NavigationMenuProps> = (props) => {
  return (
    <NavigationMenu {...props} className="mt-6">
      <NavigationMenuList className="flex flex-wrap items-center gap-4">
        {footerNavigation.map((item) => (
          <NavigationMenuItem className="font-medium" key={item.label}>
            <NavigationMenuLink asChild>
              <NextLink
                className={buttonVariants({ variant: "link" })}
                href={item.href}
              >
                {item.label}
              </NextLink>
            </NavigationMenuLink>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default NavFooter;
