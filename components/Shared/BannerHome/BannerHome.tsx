import React from "react";
import Image from "next/image";

import { iBannerHome } from "@/types";
import Link from "next/link";

export default function BannerHome(props: iBannerHome) {
  const { imageAlt, imageSource, href } = props;
  return (
    <div className="w-full py-16">
      <Link href={href!}>
        <Image
          src={`/images/actions/${imageSource}`}
          alt={imageAlt}
          className="object-cover mx-auto w-full"
          height={300}
          width={1000}
        />
      </Link>
    </div>
  );
}
