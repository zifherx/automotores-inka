"use client"

import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import Link from "next/link";

export function MenuDesktop() {
  const linkBolsaTrabajo = ""

  return (
    <NavigationMenu className="z-50">
      <NavigationMenuList>
        <NavigationMenuItem>
          <Link href="/" legacyBehavior passHref>
          <NavigationMenuLink
            className={cn(navigationMenuTriggerStyle(), "bg-transparent font-headMedium text-black text-lg")}
          >
            Inicio
          </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem></NavigationMenuItem>
        <NavigationMenuItem></NavigationMenuItem>
        <NavigationMenuItem></NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
