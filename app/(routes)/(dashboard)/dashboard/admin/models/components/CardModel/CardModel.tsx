/* eslint-disable @next/next/no-img-element */
"use client";

import { useRouter } from "next/navigation";
import axios from "axios";
import { Trash, Upload } from "lucide-react";

import { Button } from "@/components/ui/button";
import { onToast } from "@/lib/toastMessage";
import { iCardModel } from "@/types";
import { formatUSDPrice } from "@/lib";
import Image from "next/image";

export function CardModel(props: iCardModel) {
  const { model } = props;

  const router = useRouter();

  const deleteItem = async () => {
    try {
      const query = await axios.delete(`/api/modelo/${model._id}`);
      if (query.status === 200) {
        onToast("Modelo eliminado ❌");
        router.refresh();
      }
    } catch (err) {
      onToast("Algo salió mal 😭", "", true);
    }
  };

  const handlerActive = async (active: boolean) => {
    try {
      const query = await axios.patch(`/api/modelo/${model._id}`, {
        isActive: active,
      });

      if (active) {
        onToast("Modelo Activa ✌️");
      } else {
        onToast("Modelo Inactiva 😒");
      }

      router.refresh();
    } catch (err) {
      onToast("Algo salió mal 😭", "", true);
    }
  };

  return (
    <div className="relative pb-1 bg-white rounded-lg shadow-lg hover:shadow-xl">
      <Image
        src={model.imageUrl}
        alt={model.name}
        width={600}
        height={300}
        priority
        className="object-contain h-[200px] mt-10"
      />
      {/* <img
        src={model.imageUrl}
        alt={model.name}
        className="object-cover mx-auto mt-8"
      /> */}
      {model.isActive ? (
        <p className="absolute top-0 rigt-0 w-full p-1 text-center text-white bg-green-700 rounded-t-lg">
          Activo
        </p>
      ) : (
        <p className="absolute top-0 left-0 w-full p-1 text-center text-white bg-red-300 rounded-t-lg">
          Inactivo
        </p>
      )}

      <div className="relative p-3 mt-2">
        <div className="flex flex-col mb-8 gap-0">
          <p className="text-2xl text-center font-bold">{model.name}</p>
          <div className="flex justify-between items-center">
            <img
              src={model.marca.imageUrl}
              alt={model.marca.name}
              className="h-14"
            />
            <p className="text-lg font-semibold">{model.carroceria.name}</p>
          </div>
          <p className="text-4xl text-center">
            {formatUSDPrice(model.precioBase)}
          </p>
          <p className="text-left text-xs">Slug: {model.slug}</p>
        </div>

        <div className="flex items-center justify-between gap-4">
          <Button
            variant="outline"
            className="text-xs uppercase hover:bg-redInka hover:text-white"
            onClick={deleteItem}
          >
            Eliminar
            <Trash className="w-4 h-4 ml-2" />
          </Button>
          {/* <p>Boton Editar</p> */}
        </div>

        {model.isActive ? (
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
