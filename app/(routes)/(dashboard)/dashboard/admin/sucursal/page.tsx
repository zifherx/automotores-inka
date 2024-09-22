import { redirect } from "next/navigation";

import { auth } from "@clerk/nextjs/server";

import { BtnAddSucursal } from "./components/BtnAddSucursal";
import { ListSucursal } from "./components/ListSucursal";

import { dbConnect, isAdministrator, serializeDocument } from "@/lib";
import Sucursal from "@/models/Sucursal";
import { iSede } from "@/types";

export async function loadSedes() {
  await dbConnect();
  const query = await Sucursal.find();
  return query.map(serializeDocument) as iSede[];
}

export default async function BrandsPage() {
  const { userId } = auth();

  if (!userId || !isAdministrator(userId)) {
    return redirect("/");
  }

  const querySedes = await loadSedes();

  return (
    <>
      <div className="flex justify-between mb-5">
        <h2 className="flex items-center gap-1 text-xl md:text-3xl font-headMedium">
          Gestión de Sedes -{" "}
          {querySedes.length === 0 ? (
            <p> nulo 😭</p>
          ) : (
            <p>{querySedes.length} 😍</p>
          )}
        </h2>
        <BtnAddSucursal />
      </div>
      <ListSucursal sedes={querySedes} />
    </>
  );
}
