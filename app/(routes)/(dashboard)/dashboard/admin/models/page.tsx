import { redirect } from "next/navigation";

import { auth } from "@clerk/nextjs/server";

import { BtnAddModel } from "./components/BtnAddModel";
import { ListModels } from "./components/ListModels";

import { dbConnect, serializeDocument, isAdministrator } from "@/lib";
import Modelo from "@/models/Modelo";
import Marca from "@/models/Marca";
import Carroceria from "@/models/Carroceria";
import { iModelo } from "@/types";

export async function loadMarcas() {
  await dbConnect();
  const query = await Marca.find({ isActive: true });
  return query.map(serializeDocument);
}

export async function loadChasis() {
  await dbConnect();
  const query = await Carroceria.find({ isActive: true });
  return query.map(serializeDocument);
}

export async function loadModelos() {
  await dbConnect();
  const query = await Modelo.find()
    .select(
      "_id name slug precioBase marca carroceria isActive imageUrl createdAt"
    )
    // .populate("marca carroceria")
    .populate([
      {
        path: "marca",
        select: "name slug imageUrl",
      },
      {
        path: "carroceria",
        select: "name slug",
      },
    ]);

  return query.map(serializeDocument) as iModelo[];
}

export default async function ModelsPage() {
  const { userId } = auth();

  if (!userId || !isAdministrator(userId)) {
    return redirect("/");
  }

  const queryModelos = await loadModelos();
  const queryMarcas = await loadMarcas();
  const queryChasis = await loadChasis();

  return (
    <>
      <div className="flex justify-between mb-5">
        <h2 className="flex items-center gap-1 text-xl md:text-3xl font-headMedium">
          Gestión de Modelos -{" "}
          {queryModelos.length === 0 ? (
            <p> nulo 😭</p>
          ) : (
            <p>{queryModelos.length} 😍</p>
          )}
        </h2>
        <BtnAddModel brands={queryMarcas} chasises={queryChasis} />
      </div>
      <ListModels models={queryModelos} />
    </>
  );
}
