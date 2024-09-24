import { useRouter } from "next/router";
import Script from "next/script";
import { useEffect } from "react";

const handleRouteChange = () => {
  pageview();
};

const Fb_Pixel_Id = process.env.FACEBOOK_PIXEL_ID;

const pageview = () => {
  // window.fbq('track','PageView')
};

export function FacebookPixel() {
  const router = useRouter();

  useEffect(() => {
    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  return (
    <Script id="facebook-pixel">
      {`!function(f,b,e,v,n,t,s)
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
  );
}
