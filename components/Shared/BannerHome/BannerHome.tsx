import { iBannerHome } from "@/types";
import React from "react";

export default function BannerHome(props: iBannerHome) {
  const { imageAlt, imageSource } = props;
  return (
    <div className="w-full py-16">
      <img
        src={`/images/actions/${imageSource}`}
        alt={imageAlt}
        className="object-cover mx-auto w-full"
      />
    </div>
  );
}
