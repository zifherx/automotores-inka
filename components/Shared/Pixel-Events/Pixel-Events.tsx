"use client";

import { FC, useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { Router } from "next/router";

const Fb_Pixel_Id = process.env.FACEBOOK_PIXEL_ID;

export const FacebookPixelEvents: FC = () => {
  const pathName = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    import("react-facebook-pixel")
      .then((x) => x.default)
      .then((ReactPixel) => {
        ReactPixel.init(Fb_Pixel_Id!, null!, {
          autoConfig: true,
          debug: true,
        });
        ReactPixel.pageView();
        ReactPixel.track("ViewContent");

        Router.events.on("routeChangeComplete", () => {
          ReactPixel.pageView();
        });
      });
  }, [pathName, searchParams]);
  return null;
};
