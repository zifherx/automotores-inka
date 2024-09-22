import { ReactNode } from "react";
import type { Metadata } from "next";

import NextTopLoader from "nextjs-toploader";
import { ClerkProvider } from "@clerk/nextjs";

import { Toaster } from "@/components/ui/toaster";

import { cn } from "@/lib/utils";

import {
  hyundaiHeadbold,
  hyundaiHeadLight,
  hyundaiHeadMedium,
  hyundaiHeadRegular,
  hyundaiTextBold,
  hyundaiTextItalicBold,
  hyundaiTextItalicMedium,
  hyundaiTextItalicRegular,
  hyundaiTextMedium,
  hyundaiTextRegular,
} from "../fonts";

import "./globals.css";

export const metadata: Metadata = {
  title: {
    template:
      "%s | Automotores Inka | Concesionario 🇵🇪 | Venta de vehículos nuevos",
    default: "Automotores Inka",
  },
  description:
    "¡Cotiza AQUÍ! Concesionario peruano autorizado con presencia en Chiclayo, Trujillo, Chimbote y Lima. Venta de vehículos nuevos de las marcas Hyundai, Mazda, Subaru, Renault, Suzuki, Changan, JAC, HAVAL, DFSK, Great Wall, Chery, Geely, Mahindra, JMC y BAIC. Venta de vehículos pesados de las marcas JAC Camiones, Hyundai Camiones & Buses y JMC. Trabajamos con marcas líderes en el rubro automotriz desde hace más de 12 años.",
  creator: "Ziphonex Tech",
  generator: "Clean Native Code",
  applicationName: "AutomotoresInka Website",
  referrer: "origin-when-cross-origin",
  keywords: [
    "Vehículos nuevos",
    "Compra autos híbridos",
    "Autos híbridos",
    "Venta de autos Hyundai",
    "Vehículos Mazda en venta",
    "Autos Subaru nuevos",
    "Autos Renault",
    "Camionetas Susuki a la venta",
    "Autos Changan",
    "Camiones JAC en venta",
    "Venta de autos HAVAL",
    "Comprar autos DFSK",
    "Vehículos Great Wall",
    "Autos Chery híbridos",
    "Autos Geely nuevos",
    "Camiones Mahindra en venta",
    "JMC camiones",
    "Autos BAIC",
    "Hyundai Camiones & Buses",
    "Comprar auto nuevo",
    "Camionetas 4x4",
  ],
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
  },
  alternates: {
    canonical: "https://www.automotoresinka.pe",
    languages: {
      "es-PE": "/es-PE",
    },
  },
  verification: {
    google: "google",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="es-PE">
        <body
          className={cn(
            `${hyundaiTextRegular.className} antialiased`,
            `${hyundaiTextRegular.variable} ${hyundaiTextMedium.variable} ${hyundaiTextBold.variable}`,
            `${hyundaiTextItalicRegular.variable} ${hyundaiTextItalicMedium.variable} ${hyundaiTextItalicBold.variable}`,
            `${hyundaiHeadLight.variable} ${hyundaiHeadRegular.variable} ${hyundaiHeadMedium.variable} ${hyundaiHeadbold.variable}`
          )}
        >
          <NextTopLoader
            color="#1B5094"
            initialPosition={0.08}
            crawlSpeed={200}
            height={3}
            crawl={true}
            showSpinner={true}
            easing="ease"
            speed={200}
            shadow="0 0 10px #1B5094,0 0 5px #1B5094"
          />
          {children}
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  );
}
