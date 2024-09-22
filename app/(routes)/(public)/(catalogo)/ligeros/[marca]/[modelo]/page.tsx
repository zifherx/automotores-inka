import { Metadata } from "next";
import { PageVehicle } from "./components/pageVehicle";
import { iModelo } from "@/types";
import { dbConnect, serializeDocument } from "@/lib";
import Modelo from "@/models/Modelo";

export const metadata: Metadata = {
  title: {
    template: "",
    default: "Modelo",
  },
};

async function loadModelos() {
  dbConnect();
  const query = await Modelo.find({})
    .select("name imageUrl slug marca carroceria features colores galeria")
    .populate({
      path: "marca",
      select: "name slug imageUrl",
    })
    .populate({
      path: "carroceria",
      select: "name slug",
    });
  return query.map(serializeDocument) as iModelo[];
}

export default async function InternalPageModelo() {
  const queryModelos = await loadModelos();
  return (
    <>
      <PageVehicle models={queryModelos} />
    </>
  );
}
