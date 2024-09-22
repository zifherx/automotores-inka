"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { Breadcrumbs } from "@/components/Shared/Breadcrumbs";

import { iCatalogoLigeros, iModelo } from "@/types";
import { Filtros } from "../Filtros";
import { ListVehicles } from "../ListVehicles";

export function CatalogoVehicular(props: iCatalogoLigeros) {
  const { brands, chasises, models } = props;

  const router = useRouter();
  const searchParams = useSearchParams();
  const marcaFound = searchParams.get("marca");

  const [vehiculosFiltrados, setVehiculosFiltrados] = useState<iModelo[]>();
  const [filtros, setFiltros] = useState({
    marca: marcaFound ? marcaFound : "",
    carroceria: "",
  });

  useEffect(() => {
    let filtered = models;

    if (filtros.marca) {
      filtered = filtered.filter((item) => {
        return item.marca?.slug
          .toLowerCase()
          .includes(filtros.marca.toLowerCase());
      });
    }

    if (filtros.carroceria) {
      filtered = filtered.filter((item) => {
        return item.carroceria?.slug
          .toLowerCase()
          .includes(filtros.carroceria.toLowerCase());
      });
    }

    setVehiculosFiltrados(filtered);
  }, [filtros, models]);

  const handleFilterChange = (filterName: string, filterValue: string) => {
    setFiltros((prevFilters) => ({
      ...prevFilters,
      [filterName]: filterValue,
    }));
  };

  const clearFilters = () => {
    setFiltros({
      marca: "",
      carroceria: "",
    });
    router.replace("/ligeros/catalogo");
    router.refresh();
  };

  return (
    <div className="bg-plomoInka">
      <div className="md:max-w-screen-2xl md:mx-auto p-8 md:p-4">
        <Breadcrumbs marca={filtros.marca} />
        <div className="flex flex-col lg:flex-row gap-5">
          <Filtros
            brands={brands}
            chasises={chasises}
            clearFilter={clearFilters}
            filters={filtros}
            setFilter={handleFilterChange}
          />
          <ListVehicles models={vehiculosFiltrados} />
        </div>
      </div>
    </div>
  );
}
