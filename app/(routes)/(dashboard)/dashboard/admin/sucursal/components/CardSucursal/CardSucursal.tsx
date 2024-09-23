"use client";

import { useRouter } from "next/navigation";
import axios from "axios";

import { Button } from "@/components/ui/button";

import { Trash, Upload } from "lucide-react";
import { onToast } from "@/lib/toastMessage";
import { iCardSede } from "@/types";
import { BtnEditSucursal } from "../BtnEditSucursal";

export function CardSucursal(props: iCardSede) {
  const { sede } = props;

  const router = useRouter();

  const deleteItem = async () => {
    try {
      const query = await axios.delete(`/api/sucursal/${sede._id}`);
      if (query.status === 200) {
        onToast("Sucursal eliminada ❌");
        router.refresh();
      }
    } catch (err) {
      onToast("Algo salió mal 😭", "", true);
    }
  };

  const handlerActive = async (active: boolean) => {
    try {
      const query = await axios.patch(`/api/sucursal/${sede._id}`, {
        isActive: active,
      });

      if (active) {
        onToast("Sede Activa ✌️");
      } else {
        onToast("Sede Inactiva 😒");
      }

      router.refresh();
    } catch (err) {
      onToast("Algo salió mal 😭", "", true);
    }
  };

  return (
    <div className="relative pb-1 bg-white rounded-lg shadow-lg hover:shadow-xl">
      <img
        src={sede.imageUrl}
        alt={sede.name}
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
        <div className="flex flex-col mb-8 gap-x-4">
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
        </div>

        <div className="flex items-center justify-between gap-4">
          <Button
            variant="outline"
            className="text-sm hover:bg-redInka hover:text-white"
            onClick={deleteItem}
          >
            Eliminar
            <Trash className="w-4 h-4 ml-2" />
          </Button>
          <BtnEditSucursal sede={sede} />
        </div>

        {sede.isActive ? (
          <Button
            className="w-full mt-3"
            variant="outline"
            onClick={() => handlerActive(false)}
          >
            Desactivar
            <Upload className="w-4 h-4 ml-2" />
          </Button>
        ) : (
          <Button className="w-full mt-3" onClick={() => handlerActive(true)}>
            Activar
            <Upload className="w-4 h-4 ml-2" />
          </Button>
        )}
      </div>
    </div>
  );
}
