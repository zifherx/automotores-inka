"use client";

import { useSearchParams } from "next/navigation";

import { SideForm } from "../SideForm";
import { SelectedModel } from "../SelectedModel";

import { iCotizacionMarca } from "@/types";
import { getRouteForModel } from "@/lib";

export function Cotizacion(props: iCotizacionMarca) {
  const { models, listDepartamentos } = props;

  const searchParams = useSearchParams();
  const modelParam = searchParams.get("modelo");

  const filteredModel = models.find(
    (modelo) => getRouteForModel(modelo.name.toLowerCase()) === modelParam
  );

  return (
    <div className="max-w-6xl mx-auto">
      <div className="p-5 md:p-10 flex flex-col-reverse gap-10 md:grid md:grid-cols-2">
        <SideForm
          model={filteredModel!}
          listDepartamentos={listDepartamentos}
        />
        <SelectedModel model={filteredModel!} />
      </div>
    </div>
  );
}
