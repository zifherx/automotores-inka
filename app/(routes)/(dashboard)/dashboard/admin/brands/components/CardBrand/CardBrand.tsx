"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import axios from "axios";

import { iCardBrand } from "@/types";
import { cn, onToast } from "@/lib";

import { BtnDeleteBrand } from "../BtnDeleteBrand";
import { BtnEditBrand } from "../BtnEditBrand";

export function CardBrand({ brand }: iCardBrand) {
  const router = useRouter();

  const deleteBrand = async () => {
    try {
      const query = await axios.delete(`/api/marca/${brand._id}`);
      if (query.status === 200) {
        onToast(query.data.message);
      }
    } catch (err) {
      console.log(err);
      onToast(`Algo salió mal 😭`, "", true);
    } finally {
      router.refresh();
    }
  };

  return (
    <div className="relative pb-1 bg-white rounded-lg shadow-lg hover:shadow-xl">
      <Image
        src={brand.imageUrl}
        alt={brand.name}
        width={150}
        height={100}
        priority
        className={cn("object-cover h-[80px] mx-auto mt-10")}
      />
      {brand.isActive ? (
        <p className="absolute top-0 rigt-0 w-full p-1 text-center text-white bg-green-700 rounded-t-lg">
          Activo
        </p>
      ) : (
        <p className="absolute top-0 left-0 w-full p-1 text-center text-white bg-red-300 rounded-t-lg">
          Inactivo
        </p>
      )}

      <div className="relative p-4">
        <div className="flex flex-col mb-3">
          <p className="font-bold">Alt: {brand.name}</p>
          <p className="text-xs">Slug: {brand.slug}</p>
        </div>

        <div className="flex items-center justify-between gap-4">
          <BtnDeleteBrand deleteItem={deleteBrand} />
          <BtnEditBrand brand={brand} />
        </div>
      </div>
    </div>
  );
}
