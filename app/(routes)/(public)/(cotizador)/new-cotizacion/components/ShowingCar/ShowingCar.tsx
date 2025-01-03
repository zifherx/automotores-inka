import Image from "next/image";

import { formatPENPrice, formatUSDPrice } from "@/lib";
import { iShowingCar } from "@/types";

export function ShowingCar(props: iShowingCar) {
  const { vehicle } = props;

  return (
    <div className="flex flex-col md: py-24 md:sticky md:top-10 md:z-50">
      <div className="sticky top-0 z-20 text-center">
        <Image
          src={vehicle.imageUrl}
          alt={vehicle.name}
          width={800}
          height={500}
          className="w-full object-cover hover:drop-shadow-lg"
        />
        <div className="flex flex-col gap-3 mb-5">
          <p className="text-xl uppercase font-semibold">
            {vehicle.marca.name}
          </p>
          <p className="text-lg uppercase font-medium">
            {vehicle.carroceria.name}
          </p>
          <h2 className="text-5xl font-bold text-grisDarkInka">
            {vehicle.name}
          </h2>
        </div>
        <div className="flex items-center justify-center ">
          <p className="text-2xl font-headBold">
            {formatUSDPrice(vehicle.precioBase)}
          </p>
          <p className="mx-2 text-3xl font-headLight">|</p>
          <p className="text-2xl font-headBold">
            {formatPENPrice(vehicle.precioBase * 3.8)}
          </p>
        </div>
      </div>
    </div>
  );
}
