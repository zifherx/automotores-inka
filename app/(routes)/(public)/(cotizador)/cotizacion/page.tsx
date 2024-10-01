import type { Metadata } from "next";

import { Cotizacion } from "./components/Cotizacion";
import { CondicionesFormularios } from "@/components/Shared/CondicionesFormularios";

import { dbConnect, serializeDocument } from "@/lib";
import Modelo from "@/models/Modelo";
import { iModelo, iSedeDealer } from "@/types";
import Sucursal from "@/models/Sucursal";

export const metadata: Metadata = {
  title: {
    template: "",
    default: "Cotización",
  },
};

async function loadModels() {
  await dbConnect();
  const query = await Modelo.find({ isActive: true })
    .select("name slug imageUrl precioBase marca carroceria")
    .populate({
      path: "marca",
      select: "name slug imageUrl",
    })
    .populate({
      path: "carroceria",
      select: "name slug",
    });
  // return query as iModelo[];
  return query.map(serializeDocument) as iModelo[];
}

export default async function CotizacionPage() {
  const queryModels = await loadModels();

  return (
    <>
      <Cotizacion models={queryModels} />
      <CondicionesFormularios />
    </>
  );
}
