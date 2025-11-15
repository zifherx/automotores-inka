"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import axios from "axios";

import { BtnEditSucursal } from "../BtnEditSucursal";

import { onToast } from "@/lib";
import { iCardSede } from "@/types";
import { BtnDeleteSucursal } from "../BtnDeleteSucursal";

export function CardSucursal({ sede }: iCardSede) {
  const router = useRouter();

  const deleteItem = async () => {
    try {
      const query = await axios.delete(`/api/sucursal/${sede._id}`);
      if (query.status === 200) {
        onToast(query.data.message);
      }
    } catch (err) {
      onToast("Algo salió mal 😭", "", true);
    } finally {
      router.refresh();
    }
  };

  return (
    <div className="relative pb-1 bg-white rounded-lg shadow-lg hover:shadow-xl">
      <Image
        src={sede.imageUrl}
        alt={sede.name}
        width={250}
        height={250}
        className="object-cover mx-auto rounded-t-lg w-full h-[250px]"
      />
      {sede.isActive ? (
        <p className="absolute top-0 rigt-0 w-full p-2 text-center text-white bg-green-700 rounded-t-lg">
          Activo
        </p>
      ) : (
        <p className="absolute top-0 left-0 w-full p-2 text-center text-white bg-red-300 rounded-t-lg">
          Inactivo
        </p>
      )}

      <div className="relative p-5">
        <div className="flex flex-col mb-2 gap-x-4">
          <p className="text-lg min-h-16 lg:min-h-fit font-bold">
            Alt: {sede.name}
          </p>
          <div className="flex justify-between">
            <p className="text-xs">Slug: {sede.slug}</p>
            <p className="text-xs font-bold mb-3">
              {" "}
              {sede.codexHR ? sede.codexHR.toUpperCase() : ""}
            </p>
          </div>
          <p className="text-xs">{sede.address}</p>
          <p className="text-xs font-semibold">Coordenadas:</p>
          <p className="text-xs ml-2">Latitud:{sede.coordenadasMapa.latitud}</p>
          <p className="text-xs ml-2">
            Longitud:{sede.coordenadasMapa.longitud}
          </p>
        </div>

        <div className="mb-4">
          <h5 className="font-semibold text-xs">Marcas Ventas:</h5>
          <div className="grid grid-cols-4">
            {sede.marcasDisponiblesVentas.map(({ _id, name, imageUrl }) => (
              <Image
                key={_id}
                src={imageUrl}
                alt={name}
                width={60}
                height={60}
              />
            ))}
          </div>
        </div>

        <div className="mb-4">
          <h5 className="font-semibold text-xs">Marcas Taller:</h5>
          <div className="grid grid-cols-4">
            {sede.marcasDisponiblesTaller.map(({ _id, name, imageUrl }) => (
              <Image
                key={_id}
                src={imageUrl}
                alt={name}
                width={60}
                height={60}
              />
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between gap-4">
          <BtnDeleteSucursal deleteItem={deleteItem} />
          <BtnEditSucursal sede={sede} />
        </div>
      </div>
    </div>
  );
}
