"use client";
import Image from "next/image";

import { iCardServicios } from "@/types";

export function CardServicios(props: iCardServicios) {
  const { imageUrl, title } = props;

  return (
    <div className="bg-white rounded-2xl w-fit h-[200px] md:w-[220px] md:h-[200px] p-6 ">
      <div className="flex flex-col">
        <Image
          src={`/images/servicios/${imageUrl}`}
          alt={title}
          width={400}
          height={350}
          className="w-24 mx-auto drop-shadow-lg"
        />
        <h3 className="text-grisDarkInka font-bold text-center mt-5">
          {title}
        </h3>
      </div>
    </div>
  );
}
