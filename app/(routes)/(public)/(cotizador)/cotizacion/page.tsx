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
    .select("name imageUrl precioBase marca carroceria")
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

async function loadSedes() {
  await dbConnect();
  const query = await Sucursal.aggregate([
    {
      $group: {
        _id: "$ciudad",
        sedes: { $push: { name: "$name", address: "$address", slug: "$slug" } },
      },
    },
    {
      $group: {
        _id: null,
        departamentos: { $push: { k: "$_id", v: "$sedes" } },
      },
    },
    {
      $replaceRoot: {
        newRoot: {
          $arrayToObject: "$departamentos",
        },
      },
    },
  ]).exec();
  // console.log(query);
  // return query.map(serializeDocument) as iSedeDealer[];
  return query as iSedeDealer[];
}

export default async function CotizacionPage() {
  const queryModels = await loadModels();
  const querySedes = await loadSedes();

  return (
    <>
      <Cotizacion models={queryModels} listDepartamentos={querySedes} />
      <CondicionesFormularios />
    </>
  );
}
