"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";

import { Breadcrumbs } from "@/components/Shared/Breadcrumbs";

import { Filtros } from "../Filtros";
import { ListVehicles } from "../ListVehicles";

import { useBrands } from "@/context/brands/marcaContext";
import { iChasis, iModelo } from "@/types";
import { useModelos } from "@/context/modelos/modeloContext";

export function CatalogoVehicular() {
  const { brands } = useBrands();
  const { modelos } = useModelos();
  const router = useRouter();

  const searchParams = useSearchParams();
  const marcaFound = searchParams.get("marca");

  const [chasises, setChasises] = useState<iChasis[]>([]);
  const [vehiculosFiltrados, setVehiculosFiltrados] = useState<iModelo[]>([]);
  const [filtros, setFiltros] = useState({
    marca: marcaFound ? marcaFound : "",
    carroceria: "",
  });

  const getChasises = async () => {
    const query = await axios.get("/api/chasis");
    if (query.status === 200) {
      setChasises(query.data.obj);
    }
  };

  useEffect(() => {
    getChasises();
  }, []);

  useEffect(() => {
    let filtered = modelos;

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
  }, [filtros, modelos]);

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
      <div className="md:max-w-screen-2xl md:mx-auto p-6 md:p-4">
        <Breadcrumbs marca={filtros.marca} />
        <div className="flex flex-col lg:flex-row gap-8">
          <Filtros
            brands={brands.filter((brand) => brand.isActive)}
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
