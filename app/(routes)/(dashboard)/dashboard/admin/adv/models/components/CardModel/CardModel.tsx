/* eslint-disable @next/next/no-img-element */
"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import axios from "axios";

import { onToast } from "@/lib/toastMessage";
import { iCardModel } from "@/types";
import { formatUSDPrice } from "@/lib";

import { BtnDeleteModel } from "../BtnDeleteModel";
import { BtnEditModel } from "../BtnEditModel";

export function CardModel({ model }: iCardModel) {
  const router = useRouter();

  const deleteItem = async () => {
    try {
      const query = await axios.delete(`/api/modelo/${model._id}`);
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
        src={model.imageUrl}
        alt={model.name}
        width={500}
        height={280}
        priority
        className="object-contain h-[180px] mt-10"
      />
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
          <BtnDeleteModel deleteItem={deleteItem} />
          <BtnEditModel model={model} />
        </div>
      </div>
    </div>
  );
}
