import Link from "next/link";
import Image from "next/image";
import { MapPin } from "lucide-react";
import { iCardUbicanos } from "@/types";

export function CardUbicanos(props: iCardUbicanos) {
  const { params } = props;
  const {
    name,
    address,
    imageUrl,
    linkHowArrived,
    scheduleExtended,
    scheduleRegular,
  } = params;

  return (
    <div className="relative pb-1 bg-white rounded-lg shadow-xl hover:shadow-2xl hover:border-black border border-grisInka/40">
      {/* <img
        src={imageUrl}
        alt={name}
        className="rounded-t-xl aspect-[3/2] mx-auto"
      /> */}

      <Image src={imageUrl} alt={name} width={500} height={300} priority />

      <div className="relative p-4">
        <h2 className="font-bold text-lg text-blueInka drop-shadow-md">
          {name}
        </h2>
        <p className="font-light font-base text-xs">{address}</p>
        <h2 className="font-bold text-grisDarkInka mt-4">
          Horario de atención
        </h2>
        <p className="mt-2 text-sm">Lunes a Viernes</p>
        <p className="font-base">{scheduleRegular}</p>
        <p className="mt-2 text-sm">Sábados</p>
        <p className="font-base">{scheduleExtended}</p>

        <Link
          href={linkHowArrived}
          target="_blank"
          className="flex items-center justify-start mt-6 text-blueInka text-sm font-semibold"
        >
          <MapPin className="mr-1 w-5 h-5" />
          Cómo llegar
        </Link>
      </div>
    </div>
  );
}
