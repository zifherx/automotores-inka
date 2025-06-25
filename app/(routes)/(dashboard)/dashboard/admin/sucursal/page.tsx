import { redirect } from "next/navigation";

import { auth } from "@clerk/nextjs/server";

import { BtnAddSucursal } from "./components/BtnAddSucursal";
import { ListSucursal } from "./components/ListSucursal";

import { dbConnect, isAdministrator, serializeDocument } from "@/lib";
import Sucursal from "@/models/Sucursal";
import { iSede } from "@/types";

async function loadSedes() {
  await dbConnect();
  const query = await Sucursal.find({}).populate([
    {
      path: "marcasDisponiblesVentas",
      select: "_id name imageUrl",
    },
    {
      path: "marcasDisponiblesTaller",
      select: "_id name imageUrl",
    },
  ]);
  return query.map(serializeDocument) as iSede[];
}

export default async function BrandsPage() {
  const { userId } = await auth();

  if (!userId || !isAdministrator(userId)) {
    return redirect("/");
  }

  const listaSedes = await loadSedes();

  return (
    <>
      <div className="flex justify-between mb-5">
        <h2 className="flex items-center gap-1 text-xl md:text-3xl font-headMedium">
          Gestión de Sedes -{" "}
          {listaSedes.length === 0 ? (
            <p> nulo 😭</p>
          ) : (
            <p>{listaSedes.length} 😍</p>
          )}
        </h2>
        <BtnAddSucursal />
      </div>
      <ListSucursal sedes={listaSedes} />
    </>
  );
}
