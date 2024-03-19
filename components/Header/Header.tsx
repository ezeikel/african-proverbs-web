"use client";

import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import {
  NavigationMenu,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Button } from "../ui/button";
import cn from "@/utils/cn";

const NAVIGATION_ITEMS = [
  {
    id: "1",
    title: "Proverbs",
    href: "/proverbs",
  },
  {
    id: "2",
    title: "Create Proverb",
    href: "/proverb/create",
  },
];

type HeaderProps = {
  className?: string;
};

const Header = ({ className }: HeaderProps) => {
  const { status } = useSession();

  const renderAuthLink = () => {
    if (status === "loading") {
      return <div>Loading...</div>;
    }

    if (status === "authenticated") {
      return <Button onClick={() => signOut()}>Sign out</Button>;
    }

    return <Button onClick={() => signIn("github")}>Sign in</Button>;
  };

  return (
    <header
      className={cn("flex justify-between p-4 shadow-lg", {
        [className as string]: !!className,
      })}
    >
      <Link className="text-2xl font-bold text-[#6b705c]" href="/">
        African Proverbs
      </Link>
      <div className="flex gap-x-4">
        <NavigationMenu>
          <NavigationMenuList>
            {NAVIGATION_ITEMS.map((item) => (
              <NavigationMenuLink
                key={item.id}
                className={navigationMenuTriggerStyle()}
              >
                <Link href={item.href} legacyBehavior passHref>
                  {item.title}
                </Link>
              </NavigationMenuLink>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
        <div className="flex items-center gap-x-4">{renderAuthLink()}</div>
      </div>
    </header>
  );
};

export default Header;
