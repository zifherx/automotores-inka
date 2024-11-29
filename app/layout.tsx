/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import { ReactNode } from "react";
import type { Metadata } from "next";

import NextTopLoader from "nextjs-toploader";
import { ClerkProvider } from "@clerk/nextjs";

import { Toaster } from "@/components/ui/toaster";
import { ScrollToTop } from "@/components/Shared/ScrollToTop/ScrollToTop";
import { Analytics } from "@vercel/analytics/react";

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

const Fb_Pixel_Id = process.env.FACEBOOK_PIXEL_ID;
const Google_Tag_Id = process.env.GOOGLE_TAG_ID;

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
          <Script id="vwoCode" type="text/javascript">
            {`window._vwo_code || (function() {
            var account_id=998763,
            version=2.1,
            settings_tolerance=2000,
            hide_element='body',
            hide_element_style = 'opacity:0 !important;filter:alpha(opacity=0) !important;background:none !important;transition:none !important;',
            /* DO NOT EDIT BELOW THIS LINE */
            f=false,w=window,d=document,v=d.querySelector('#vwoCode'),cK='vwo'+account_id+'settings',cc={};try{var c=JSON.parse(localStorage.getItem('_vwo'+account_id+'config'));cc=c&&typeof c==='object'?c:{}}catch(e){}var stT=cc.stT==='session'?w.sessionStorage:w.localStorage;code={nonce:v&&v.nonce,use_existing_jquery:function(){return typeof use_existing_jquery!=='undefined'?use_existing_jquery:undefined},library_tolerance:function(){return typeof library_tolerance!=='undefined'?library_tolerance:undefined},settings_tolerance:function(){return cc.sT||settings_tolerance},hide_element_style:function(){return'{'+(cc.hES||hide_element_style)+'}'},hide_element:function(){if(performance.getEntriesByName('first-contentful-paint')[0]){return''}return typeof cc.hE==='string'?cc.hE:hide_element},getVersion:function(){return version},finish:function(e){if(!f){f=true;var t=d.getElementById('_vis_opt_path_hides');if(t)t.parentNode.removeChild(t);if(e)(new Image).src='https://dev.visualwebsiteoptimizer.com/ee.gif?a='+account_id+e}},finished:function(){return f},addScript:function(e){var t=d.createElement('script');t.type='text/javascript';if(e.src){t.src=e.src}else{t.text=e.text}v&&t.setAttribute('nonce',v.nonce);d.getElementsByTagName('head')[0].appendChild(t)},load:function(e,t){var n=this.getSettings(),i=d.createElement('script'),r=this;t=t||{};if(n){i.textContent=n;d.getElementsByTagName('head')[0].appendChild(i);if(!w.VWO||VWO.caE){stT.removeItem(cK);r.load(e)}}else{var o=new XMLHttpRequest;o.open('GET',e,true);o.withCredentials=!t.dSC;o.responseType=t.responseType||'text';o.onload=function(){if(t.onloadCb){return t.onloadCb(o,e)}if(o.status===200||o.status===304){w._vwo_code.addScript({text:o.responseText})}else{w._vwo_code.finish('&e=loading_failure:'+e)}};o.onerror=function(){if(t.onerrorCb){return t.onerrorCb(e)}w._vwo_code.finish('&e=loading_failure:'+e)};o.send()}},getSettings:function(){try{var e=stT.getItem(cK);if(!e){return}e=JSON.parse(e);if(Date.now()>e.e){stT.removeItem(cK);return}return e.s}catch(e){return}},init:function(){if(d.URL.indexOf('vwo_disable_')>-1)return;var e=this.settings_tolerance();w._vwo_settings_timer=setTimeout(function(){w._vwo_code.finish();stT.removeItem(cK)},e);var t;if(this.hide_element()!=='body'){t=d.createElement('style');var n=this.hide_element(),i=n?n+this.hide_element_style():'',r=d.getElementsByTagName('head')[0];t.setAttribute('id','_vis_opt_path_hides');v&&t.setAttribute('nonce',v.nonce);t.setAttribute('type','text/css');if(t.styleSheet)t.styleSheet.cssText=i;else t.appendChild(d.createTextNode(i));r.appendChild(t)}else{t=d.getElementsByTagName('head')[0];var i=d.createElement('div');i.style.cssText='z-index: 2147483647 !important;position: fixed !important;left: 0 !important;top: 0 !important;width: 100% !important;height: 100% !important;background: white !important;display: block !important;';i.setAttribute('id','_vis_opt_path_hides');i.classList.add('_vis_hide_layer');t.parentNode.insertBefore(i,t.nextSibling)}var o=window._vis_opt_url||d.URL,s='https://dev.visualwebsiteoptimizer.com/j.php?a='+account_id+'&u='+encodeURIComponent(o)+'&vn='+version;if(w.location.search.indexOf('_vwo_xhr')!==-1){this.addScript({src:s})}else{this.load(s+'&x=true')}}};w._vwo_code=code;code.init();})();(function(){var i=window;function t(){if(i._vwo_code){var e=t.hidingStyle=document.getElementById('_vis_opt_path_hides')||t.hidingStyle;if(!i._vwo_code.finished()&&!_vwo_code.libExecuted&&(!i.VWO||!VWO.dNR)){if(!document.getElementById('_vis_opt_path_hides')){document.getElementsByTagName('head')[0].appendChild(e)}requestAnimationFrame(t)}}}t()})();}`}
          </Script>
        </body>
      </html>
    </ClerkProvider>
  );
}
