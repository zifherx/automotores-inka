import { Metadata } from "next";

import { CondicionesFormularios } from "@/components/Shared/CondicionesFormularios";

import { Cotizador } from "./components/Cotizador";
import { dbConnect, serializeDocument } from "@/lib";

import Marca from "@/models/Marca";
import Sucursal from "@/models/Sucursal";

import { iBrand, iSedeDealer } from "@/types";

export const metadata: Metadata = {
  title: {
    template: "",
    default: "Cotiza tu auto",
  },
};

async function loadBrands() {
  await dbConnect();
  const query = await Marca.find({ isActive: true }).sort({ name: 1 });
  return query.map(serializeDocument) as iBrand[];
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
  return query as iSedeDealer[];
}

export default async function NewCotizacionPage() {
  const queryBrands = await loadBrands();
  const querySedes = await loadSedes();

  return (
    <>
      <Cotizador brands={queryBrands} listDepartamentos={querySedes} />
      <CondicionesFormularios />
    </>
  );
}
