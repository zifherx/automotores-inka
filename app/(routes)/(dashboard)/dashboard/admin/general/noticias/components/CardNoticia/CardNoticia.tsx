"use client";

import Image from "next/image";

import { BtneditNoticia } from "../BtnEditNoticia";
import { BtnDeleteNoticia } from "../BtnDeleteNoticia";

import { useNews } from "@/context/news/noticeContext";
import { iCardNoticia } from "@/types";

export function CardNoticia({ noticia }: iCardNoticia) {
  const { deleteNew } = useNews();

  return (
    <div className="relative pb-1 bg-white rounded-lg shadow-lg hover:shadow-xl">
      <Image
        src={noticia.imagePortada}
        alt={noticia.slug}
        width={250}
        height={250}
        className="object-cover mx-auto rounded-t-lg w-full h-[250px]"
      />
      {noticia.isActive ? (
        <p className="absolute top-0 left-0 w-full p-2 text-center text-white bg-green-700 rounded-t-lg">
          Activo
        </p>
      ) : (
        <p className="absolute top-0 left-0 w-full p-2 text-center text-white bg-red-300 rounded-t-lg">
          Inactivo
        </p>
      )}

      <div className="relative p-3">
        <div className="flex flex-col mb-2">
          <p className="text-sm min-h-fit font-bold mb-2">{noticia.title}</p>
          <p className="text-xs font-light">{noticia.excerpt}</p>
        </div>

        <div className="flex items-center justify-between gap-4">
          <BtnDeleteNoticia deleteItem={() => deleteNew(noticia._id)} />
          <BtneditNoticia noticia={noticia} />
        </div>
      </div>
    </div>
  );
}
