"use client";

import { ReactNode } from "react";

import { Footer } from "@/components/Shared/Footer";
import { Navbar } from "@/components/Shared/Navbar";
import { BarraFlotante } from "@/components/Shared/BarraFlotante";
import BlankComponent from "@/components/Shared/BlankComponent";

export default function routesLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    // <div>
    //   <Navbar />
    //   {children}
    //   <BarraFlotante />
    //   <Footer />
    // </div>
    <BlankComponent />
  );
}
