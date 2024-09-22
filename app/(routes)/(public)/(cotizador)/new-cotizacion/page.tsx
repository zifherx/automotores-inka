import { Metadata } from "next";

import { CondicionesFormularios } from "@/components/Shared/CondicionesFormularios";

import { Cotizador } from "./components/Cotizador";
import { dbConnect, serializeDocument } from "@/lib";
import Marca from "@/models/Marca";
import { iBrand } from "@/types";

export const metadata: Metadata = {
  title: {
    template: "",
    default: "Cotiza tu auto",
  },
};

export async function loadBrands() {
  await dbConnect();
  const query = await Marca.find({ isActive: true }).sort({ name: 1 });
  return query.map(serializeDocument) as iBrand[];
}

export default async function NewCotizacionPage() {
  const queryBrands = await loadBrands();

  return (
    <>
      <Cotizador brands={queryBrands} />
      <CondicionesFormularios />
    </>
  );
}
