"use client";
import { ReactNode } from "react";

import { BtnWhatsapp } from "@/components/Shared/BtnWhatsapp";
import { Footer } from "@/components/Shared/Footer";
import { Navbar } from "@/components/Shared/Navbar";
import BtnFlotante from "@/components/Shared/BtnFlotante/BtnFlotante";

export default function routesLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <div>
      <Navbar />
      {children}
      <BtnFlotante />
      <BtnWhatsapp />
      <Footer />
    </div>
  );
}
