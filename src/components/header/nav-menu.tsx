import { type NavigationMenuProps } from "@radix-ui/react-navigation-menu";
import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { navigation } from "@/constants/navigation";

export const NavMenu = (props: NavigationMenuProps) => (
  <NavigationMenu {...props}>
    <NavigationMenuList className="space-x-0 data-[orientation=vertical]:flex-col data-[orientation=vertical]:items-start md:gap-4">
      {navigation.map((item) => (
        <NavigationMenuItem className="font-medium" key={item.label}>
          <NavigationMenuLink asChild>
            <Link
              className={buttonVariants({ variant: "link" })}
              href={item.href}
            >
              {item.label}
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
      ))}
    </NavigationMenuList>
  </NavigationMenu>
);
