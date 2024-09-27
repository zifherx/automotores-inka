import { redirect } from "next/navigation";

import { auth } from "@clerk/nextjs/server";

import { BtnAddModel } from "./components/BtnAddModel";
import { ListModels } from "./components/ListModels";

import { dbConnect, serializeDocument, isAdministrator } from "@/lib";
import Marca from "@/models/Marca";
import Carroceria from "@/models/Carroceria";
import Modelo from "@/models/Modelo";

async function loadModels() {
  await dbConnect();
  const query = await Modelo.find()
    .select("_id name slug imageUrl marca carroceria isActive precioBase")
    .populate({
      path: "marca",
      select: "_id name slug imageUrl",
    })
    .populate({
      path: "carroceria",
      select: "_id name slug",
    })
    .sort({ createdAt: 1 });
  return query.map(serializeDocument);
}

async function loadMarcas() {
  await dbConnect();
  const query = await Marca.find({ isActive: true }).sort({
    name: 1,
  });
  return query.map(serializeDocument);
}

async function loadChasis() {
  await dbConnect();
  const query = await Carroceria.find({ isActive: true });
  return query.map(serializeDocument);
}

export default async function ModelsPage() {
  const { userId } = auth();

  if (!userId || !isAdministrator(userId)) {
    return redirect("/");
  }

  const queryModelos = await loadModels();
  const queryMarcas = await loadMarcas();
  const queryChasis = await loadChasis();

  return (
    <>
      <div className="border border-slate-200 rounded-2xl p-4 sticky z-50 top-5 bg-white">
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
        <p>Filtros</p>
      </div>
      <ListModels models={queryModelos} />
    </>
  );
}
