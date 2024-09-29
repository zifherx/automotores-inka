"use client";

import { useRouter } from "next/navigation";
import axios from "axios";
import { Trash, Upload } from "lucide-react";

import { Button } from "@/components/ui/button";
import { onToast } from "@/lib/toastMessage";
import { iCardBrand } from "@/types";
import Image from "next/image";
import { cn } from "@/lib";

export function CardBrand(props: iCardBrand) {
  const { brand } = props;
  const { name, isActive, imageUrl, slug } = brand;

  const router = useRouter();

  const handlerActive = async (active: boolean) => {
    try {
      const query = await axios.patch(`/api/marca/${brand._id}`, {
        isActive: active,
      });

      if (active) {
        onToast("Marca Activa ✌️");
      } else {
        onToast("Marca Inactiva 😒");
      }

      router.refresh();
    } catch (err) {
      onToast("Algo salió mal 😭", "", true);
    }
  };

  return (
    <div className="relative pb-1 bg-white rounded-lg shadow-lg hover:shadow-xl">
      <Image
        src={imageUrl}
        alt={name}
        width={300}
        height={150}
        priority
        className={cn("object-cover h-[150px] mx-auto mt-10")}
      />
      {/* <img
        src={brand.imageUrl}
        alt={brand.name}
        className="object-cover mx-auto"
      /> */}
      {isActive ? (
        <p className="absolute top-0 rigt-0 w-full p-1 text-center text-white bg-green-700 rounded-t-lg">
          Activo
        </p>
      ) : (
        <p className="absolute top-0 left-0 w-full p-1 text-center text-white bg-red-300 rounded-t-lg">
          Inactivo
        </p>
      )}

      <div className="relative p-5">
        <div className="flex flex-col mb-8 gap-x-4">
          <p className="text-lg min-h-16 lg:min-h-fit font-bold">Alt: {name}</p>
          <p className="text-xs">Slug: {slug}</p>
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

        {brand.isActive ? (
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
