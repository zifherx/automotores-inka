"use client";

import { useRouter } from "next/navigation";
import axios from "axios";
import { Trash, Upload } from "lucide-react";

import { Button } from "@/components/ui/button";
import { onToast } from "@/lib/toastMessage";
import { iCardChasis } from "@/types";

export function CardChasis(props: iCardChasis) {
  const { chasis } = props;

  const router = useRouter();

  const handlerActive = async (active: boolean) => {
    try {
      const query = await axios.patch(`/api/chasis/${chasis.id}`, {
        isActive: active,
      });

      if (active) {
        onToast("Chasis Activa ✌️");
      } else {
        onToast("Chasis Inactiva 😒");
      }

      router.refresh();
    } catch (err) {
      onToast("Algo salió mal 😭", "", true);
    }
  };

  return (
    <div className="relative pb-1 bg-white rounded-lg shadow-lg hover:shadow-xl">
      {chasis.isActive ? (
        <p className="absolute top-0 rigt-0 w-full p-1 text-center text-white bg-green-700 rounded-t-lg">
          Activo
        </p>
      ) : (
        <p className="absolute top-0 left-0 w-full p-1 text-center text-white bg-red-300 rounded-t-lg">
          Inactivo
        </p>
      )}

      <div className="relative p-5 mt-5">
        <div className="flex flex-col mb-8 gap-x-4">
          <p className="text-lg min-h-16 lg:min-h-fit font-bold">
            Alt: {chasis.name}
          </p>
          <p className="text-xs">Slug: {chasis.slug}</p>
        </div>

        <div className="flex items-center justify-between gap-4">
          <Button
            variant="outline"
            className="text-sm hover:bg-redInka hover:text-white"
          >
            Eliminar
            <Trash className="w-4 h-4 ml-2" />
          </Button>
          <p>Boton Editar</p>
        </div>

        {chasis.isActive ? (
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
