/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import { ReactNode } from "react";
import type { Metadata } from "next";

import NextTopLoader from "nextjs-toploader";

import { Toaster } from "@/components/ui/toaster";
import { ScrollToTop } from "@/components/Shared/ScrollToTop/ScrollToTop";
import { Analytics } from "@vercel/analytics/react";
import { esMX } from "@clerk/localizations";

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
import Script from "next/script";
import { ClerkProvider } from "@clerk/nextjs";

export const metadata: Metadata = {
  title: {
    template:
      "%s | Automotores Inka | Concesionario 🇵🇪 | Venta de vehículos nuevos",
    default: "Portal Automotores Inka",
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

const Fb_Pixel_Id = process.env.FACEBOOK_PIXEL_ID as string;
const Google_Tag_Id = process.env.GOOGLE_TAG_ID as string;

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <ClerkProvider localization={esMX}>
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

          <ScrollToTop />
          <Toaster />
          <Analytics />
          <Script id="facebook-pixel">
            {`
                !function(f,b,e,v,n,t,s)
                {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                n.queue=[];t=b.createElement(e);t.async=!0;
                t.src=v;s=b.getElementsByTagName(e)[0];
                s.parentNode.insertBefore(t,s)}(window, document,'script',
                'https://connect.facebook.net/en_US/fbevents.js');
                fbq('init', ${Fb_Pixel_Id});
                fbq('track', 'PageView');`}
          </Script>
          <noscript>
            <img
              height="1"
              width="1"
              src="https://www.facebook.com/tr?id=882802410454407&ev=PageView&noscript=1"
            />
          </noscript>
          <Script id="google-tag-manager">
            {`
                (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                })(window,document,'script','dataLayer','${Google_Tag_Id}');`}
          </Script>
        </body>
      </html>
    </ClerkProvider>
  );
}
