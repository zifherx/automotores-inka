"use client";

import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Send } from "lucide-react";

import { Button } from "@/components/ui/button";
import { MenuDesktop } from "./MenuDesktop";
import { MenuMobile } from "./MenuMobile";

import { cn } from "@/lib";

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

        <div className="hidden sm:flex items-center">
          <Button
            asChild
            size="lg"
            className={cn(
              pathname === "/steps-cotizacion"
                ? "hidden"
                : "bg-blueInka font-headMedium text-lg transition-all hover:scale-110 hover:bg-blueDarkInka"
            )}
          >
            <Link href="/steps-cotizacion">
              Financia aquí
              <Send className="ml-2 w-6 h-6" strokeWidth={2} />
            </Link>
          </Button>
        </div>
      </div>
    </nav>
  );
}
