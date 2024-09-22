import { formatPENPrice, formatUSDPrice } from "@/lib";

import { iCardModel } from "@/types";
import { Car } from "lucide-react";

export function SelectedModel(props: iCardModel) {
  const { model } = props;
  const { name, imageUrl, marca, precioBase, carroceria } = model;

  const tc = 3.8;

  return (
    <div className="flex flex-col md:pt-24">
      <div className="sticky top-0 z-20 text-center">
        <img
          className="object-cover w-full hover:drop-shadow-lg "
          src={imageUrl}
          alt={name}
        />
        <p className="uppercase font-headLight text-2xl">{marca.name}</p>
        <p className="flex items-center justify-center gap-3 text-xl uppercase">
          {/* <Car className="w-5 h-5 ml-3" /> */}
          {carroceria.name}
        </p>
        <p className="uppercase font-headRegular text-3xl">{name}</p>
        <div className="flex justify-center items-center mt-3 text-4xl">
          <p className="font-headMedium">{formatUSDPrice(precioBase)}</p>
          <p className="mx-2 text-3xl font-headLight">|</p>
          <p className="font-headMedium">{formatPENPrice(precioBase * tc)}</p>
        </div>
      </div>
    </div>
  );
}
