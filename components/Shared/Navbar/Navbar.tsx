"use client";

import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

import { Send, ShoppingCart } from "lucide-react";

import { MenuDesktop } from "./MenuDesktop";
import { MenuMobile } from "./MenuMobile";
import { cn } from "@/lib";
import { Button } from "@/components/ui/button";

export function Navbar() {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <nav className="bg-[#F8F8F8] w-full">
      <div className="h-20 flex items-center justify-between p-4 mx-auto sm:max-w-4xl md:max-w-7xl">
        <Image
          className="cursor-pointer"
          src="/images/logo-color.png"
          alt="Logo Automotores Inka"
          width={200}
          height={40}
          onClick={() => router.push("/")}
          priority
        />

        <div className="items-center justify-between hidden sm:flex">
          <MenuDesktop />
        </div>

        <div className="flex sm:hidden">
          <MenuMobile />
        </div>

        <div className="hidden sm:flex items-center justify-between gap-2 sm:gap-5">
          <Link
            // href="/new-cotizacion"
            href="/steps-cotizacion"
            className={cn(
              pathname === "/new-cotizacion"
                ? "hidden"
                : "flex items-center gap-3 rounded-md text-lg font-textMedium px-4 py-2 bg-blueInka text-white hover:bg-white hover:text-blueInka hover:border-2 hover:border-blueInka transition-all"
            )}
          >
            Financia aquí
            <Send className="w-5 h-5" strokeWidth={2} />
          </Link>
        </div>
      </div>
    </nav>
  );
}
