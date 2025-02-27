"use client";

import Image from "next/image";

import { BtnEditCover } from "../BtnEditCover";
import { BtnDeleteCover } from "../BtnDeleteCover";

import { useCovers } from "@/context/covers/coverContext";

import { iCardCover } from "@/types";

export function CardCover({ cover }: iCardCover) {
  const { deleteCover } = useCovers();

  return (
    <div className="relative pb-1 bg-white rounded-lg shadow-lg hover:shadow-xl">
      <Image
        src={cover.imageUrl}
        alt={cover.name}
        width={300}
        height={250}
        className="object-cover mx-auto mt-8"
      />
      {cover.isActive ? (
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
          <p className="text-lg min-h-16 lg:min-h-fit font-bold">
            Alt: {cover.name}
          </p>
          <p className="text-xs">Slug: {cover.slug}</p>
        </div>

        <div className="flex items-center justify-between gap-4">
          <BtnDeleteCover deleteItem={() => deleteCover(cover._id)} />
          <BtnEditCover cover={cover} />
        </div>
      </div>
    </div>
  );
}
