import { useRouter } from "next/navigation";
import Image from "next/image";

import { formatPENPrice, formatUSDPrice, getRouteForModel } from "@/lib";
import { iCardProductModel } from "@/types";

import { Car } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CardProductModel(props: iCardProductModel) {
  const { model } = props;
  const {
    name,
    slug,
    imageUrl,
    isEntrega48H,
    isGLP,
    carroceria,
    marca,
    precioBase,
    isLiquidacion,
    isNuevo,
  } = model;

  const tc = 3.8;
  const router = useRouter();

  return (
    <div className="relative p-1 rounded-xl shadow-md bg-white border border-grisInka/55 hover:border-black">
      <Image
        src={imageUrl}
        alt={name}
        width={400}
        height={600}
        className="object-contain h-[200px] mt-5"
        priority
      />
      {isLiquidacion && (
        <Image
          src={`/images/offers/tag-liquidacion.png`}
          alt="Unidad en liquidación"
          width={150}
          height={60}
          priority
          className="absolute -top-5 left-1 z-10"
        />
      )}
      <p className="text-xs text-grisDarkInka text-right mr-5">
        Imagen referencial
      </p>
      <div className="p-4">
        <div className="flex justify-between gap-5 ">
          <div className="text-grisDarkInka leading-tight">
            <p className="font-bold text-xl">{carroceria?.name}</p>
            <p className="font-medium text-xl">{marca?.name}</p>
            <p className="font-bold text-xl">{name}</p>
          </div>
          <div className="h-fit">
            {isGLP && (
              <Image
                src={`/images/offers/glp-gratis.png`}
                alt="GLP Gratis"
                width={100}
                height={50}
                priority
              />
            )}
            {isEntrega48H && (
              <Image
                src={`/images/offers/disponibilidad-48.png`}
                alt="Disponibilidad 48 horas"
                width={100}
                height={50}
                priority
              />
            )}
          </div>
        </div>

        <p className="mt-5 font-medium">Desde</p>
        <p className="text-center text-black text-2xl font-bold mt-3">
          {formatUSDPrice(precioBase)} &nbsp;&nbsp;&nbsp; | &nbsp;&nbsp;&nbsp;
          {formatPENPrice(precioBase * tc)}
        </p>

        <Button
          className="flex items-center justify-center mt-8 w-full h-6 py-4 uppercase text-[12px] rounded-2xl bg-redInka text-white hover:bg-redDarkInka"
          onClick={() =>
            router.push(`/ligeros/${getRouteForModel(marca.slug)}/${slug}`)
          }
        >
          Ver más detalles del auto
          <Car className="w-4 h-4 ml-2" strokeWidth={2} />
        </Button>
      </div>
    </div>
  );
}
