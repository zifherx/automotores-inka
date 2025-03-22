"use client";

import { BrandsProvider } from "@/context/brands/marcaContext";

import { BtnAddBrand } from "./components/BtnAddBrand";
import { ListBrands } from "./components/ListBrands";
import { BtnRefresh } from "./components/BtnRefresh";

export default function AdminBrandsPage() {
  return (
    <BrandsProvider>
      <div className="flex flex-col gap-4">
        <div className="flex justify-between">
          <h2 className="flex items-center gap-1 text-xl md:text-3xl font-headMedium">
            Gestión de Marcas
          </h2>
          <div className="flex justify-between gap-1">
            <BtnAddBrand />
            <BtnRefresh />
          </div>
        </div>
        <ListBrands />
      </div>
    </BrandsProvider>
  );
}
