import { Metadata } from "next";

import { CatalogoVehicular } from "./components/CatalogoVehicular";

import { dbConnect, serializeDocument } from "@/lib";
import Modelo from "@/models/Modelo";
import Marca from "@/models/Marca";
import Carroceria from "@/models/Carroceria";

export const metadata: Metadata = {
  title: {
    template: "",
    default: "Catálogo",
  },
};

export async function loadModelos() {
  await dbConnect();
  const query = await Modelo.find({ isActive: true })
    .populate({
      path: "marca",
      select: "name slug",
    })
    .populate({
      path: "carroceria",
      select: "name slug",
    });
  return query.map(serializeDocument);
}

export async function loadBrands() {
  await dbConnect();
  const query = await Marca.find({ isActive: true });
  return query.map(serializeDocument);
}

export async function loadChasis() {
  await dbConnect();
  const query = await Carroceria.find({ isActive: true });
  return query.map(serializeDocument);
}

export default async function CatalogoPage() {
  const queryVehiculos = await loadModelos();
  const queryMarcas = await loadBrands();
  const queryChasis = await loadChasis();

  return (
    <>
      <CatalogoVehicular
        brands={queryMarcas}
        chasises={queryChasis}
        models={queryVehiculos}
      />
    </>
  );
}
