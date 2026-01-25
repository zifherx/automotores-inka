"use client";

import { ReactNode } from "react";
import { usePathname } from "next/navigation";

import { Footer } from "@/components/Shared/Footer";
import { Navbar } from "@/components/Shared/Navbar";
import { BarraFlotante } from "@/components/Shared/BarraFlotante";

export default function RoutesLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const pathName = usePathname();

  const landingCorporativo = pathName === "/soluciones-corporativas";

  return (
    <div>
      {landingCorporativo ? (
        <>{children}</>
      ) : (
        <>
          <Navbar />
          {children}
          <BarraFlotante />
          <Footer />
        </>
      )}
    </div>
  );
}
