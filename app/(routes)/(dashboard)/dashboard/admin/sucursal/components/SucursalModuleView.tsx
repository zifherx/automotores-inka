"use client";

import { useSucursales } from "@/context/sucursal/sucursalContext";

import { BtnAddSucursal } from "./BtnAddSucursal";
import { ListSucursal } from "./ListSucursal";

export function SucursalModuleView() {
  const { sucursales } = useSucursales();

  return (
    <>
      <div className="flex justify-between mb-5">
        <h2 className="flex items-center gap-1 text-xl md:text-3xl font-headMedium">
          Gestión de Sedes -{" "}
          {sucursales.length === 0 ? (
            <p> nulo 😭</p>
          ) : (
            <p>{sucursales.length} 😍</p>
          )}
        </h2>
        <BtnAddSucursal />
      </div>
      <ListSucursal sedes={sucursales} />
    </>
  );
}
