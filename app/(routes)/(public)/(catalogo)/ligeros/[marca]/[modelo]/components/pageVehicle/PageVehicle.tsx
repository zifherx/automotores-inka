"use client";

import { useParams } from "next/navigation";

import { Error404 } from "@/components/Shared/Error404";

import { getRouteForModel } from "@/lib";
import { iListModels } from "@/types";
import { Vehicle } from "../Vehicle";
import { Migajas } from "./Migajas";

export function PageVehicle(props: iListModels) {
  const { models } = props;

  const params = useParams();
  const modelSlug = params.modelo;

  const filterModel = models.find(
    (modelo) => getRouteForModel(modelo.slug) === modelSlug
  );

  return (
    <div className="max-w-7xl mx-auto p-4 lg:p-10">
      <Migajas
        marca={`${filterModel?.marca.name}`}
        modelo={`${filterModel?.name}`}
      />
      {filterModel ? <Vehicle model={filterModel} /> : <Error404 />}
    </div>
  );
}
