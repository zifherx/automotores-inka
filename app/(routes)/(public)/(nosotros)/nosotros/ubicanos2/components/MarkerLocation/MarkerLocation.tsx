import { tMarkerLocation } from "@/types";
import { icon } from "leaflet";
import { MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Marker, Popup } from "react-leaflet";

export function MarkerLocation({ sede }: tMarkerLocation) {
  const {
    _id,
    coordenadasMapa,
    address,
    name,
    imageUrl,
    scheduleRegular,
    scheduleExtended,
    linkHowArrived,
  } = sede;

  const customIcon = icon({
    iconUrl: "/assets/marker.svg",
    iconSize: [40, 40],
  });

  return (
    <Marker
      key={_id}
      position={{
        lat: parseFloat(coordenadasMapa.latitud),
        lng: parseFloat(coordenadasMapa.longitud),
      }}
      icon={customIcon}
    >
      <Popup autoClose maxWidth={600}>
        <div className="flex p-0 gap-4 w-[500px]">
          <div className="flex-shrink-0 my-auto">
            <Image
              src={imageUrl}
              alt={name}
              width={200}
              height={250}
              className="rounded-md object-cover"
            />
          </div>
          <div className="relative space-y-1">
            <h2 className="font-bold text-lg text-blueInka drop-shadow-md">
              {name}
            </h2>
            <p className="font-light text-xs">{address}</p>
            <h3 className="font-bold text-grisDarkInka pt-2">
              Horario de atención
            </h3>
            <p className="text-sm font-textMedium">Lunes a Viernes</p>
            <p className="font-normal">{scheduleRegular}</p>
            <p className="text-sm font-textMedium">Sábados</p>
            <p className="font-normal">{scheduleExtended}</p>
            <Link
              href={linkHowArrived}
              target="_blank"
              className="flex items-center justify-start pt-2 text-blueInka text-sm font-semibold"
            >
              <MapPin className="mr-1 w-4 h-4" />
              Cómo llegar
            </Link>
          </div>
        </div>
      </Popup>
    </Marker>
  );
}
