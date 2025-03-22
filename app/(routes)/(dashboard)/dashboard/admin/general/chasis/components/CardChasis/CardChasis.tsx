"use client";

import { useRouter } from "next/navigation";
import axios from "axios";

import { BtnEditChasis } from "../BtnEditChasis";
import { BtnDeleteChasis } from "../BtnDeleteChasis";

import { iCardChasis } from "@/types";
import { onToast } from "@/lib";

export function CardChasis({ chasis }: iCardChasis) {
  const router = useRouter();

  const deleteChasis = async () => {
    try {
      const query = await axios.delete(`/api/chasis/${chasis._id}`);
      if (query.status === 200) {
        onToast(query.data.message);
      }
    } catch (err) {
      console.log(err);
      onToast("Algo salió mal 😭", "", true);
    } finally {
      router.refresh();
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
        <div className="flex flex-col mb-5 gap-x-4">
          <p className="text-lg min-h-16 lg:min-h-fit font-bold">
            {chasis.name}
          </p>
          <p className="text-xs">Slug: {chasis.slug}</p>
        </div>

        <div className="flex items-center justify-between gap-4">
          <BtnDeleteChasis deleteItem={deleteChasis} />
          <BtnEditChasis chasis={chasis} />
        </div>
      </div>
    </div>
  );
}
