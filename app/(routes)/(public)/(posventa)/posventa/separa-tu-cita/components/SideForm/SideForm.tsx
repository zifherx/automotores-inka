"use client";

import { Title } from "@/components/Shared/Title";
import { FormMantenimiento } from "../FormMantenimiento";
import { MasonryBrands } from "../MasonryBrands";

import { useBrands } from "@/context/brands/marcaContext";

export function SideForm() {
  const { brands } = useBrands();

  return (
    <div className="max-w-6xl mx-auto p-2 md:p-10">
      <div className="flex flex-col md:grid md:grid-cols-[60%_1fr] gap-3">
        <div className="p-2 flex flex-col gap-2">
          <Title
            title="Registra tu servicio"
            className="font-headMedium uppercase text-3xl text-center"
          />
          <FormMantenimiento />
        </div>
        <div className="p-2 flex items-center mx-auto">
          <MasonryBrands brands={brands} />
        </div>
      </div>
    </div>
  );
}
