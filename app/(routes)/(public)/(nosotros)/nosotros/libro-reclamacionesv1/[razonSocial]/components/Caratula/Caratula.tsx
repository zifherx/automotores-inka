import Image from "next/image";

import { switchRS } from "@/lib";

import { iCaratulaReclamo } from "@/types";
import { useEffect, useState } from "react";

export function Caratula(props: iCaratulaReclamo) {
  const { slugType } = props;

  const [nameRS, setNameRS] = useState("")

  useEffect(() => {
    setNameRS(switchRS(slugType))
  },[slugType])

  return (
    <div className="bg-plomoInka p-4 md:p-6">
      <div className="flex flex-col md:flex-row items-center gap-3 md:gap-14 text-black">
        <Image
          src="/images/logo-color.png"
          alt="Logo Automotors Inka"
          width={200}
          height={40}
        />
        <h2 className="font-bold text-center md:text-left text-lg sm:text-xl md:text-2xl">
          Libro de Reclamaciones Digital -{" "}<span className="underline">{nameRS}</span>
        </h2>
      </div>
      <p className="text-xs md:text-sm text-justify md:text-left text-gray-500 px-5 mt-5">
        Conforme a lo establecido en el Código de Protección y Defensa del
        Consumidor, esta institución cuenta con un libro de reclamaciones a su
        disposición.
      </p>
    </div>
  );
}
