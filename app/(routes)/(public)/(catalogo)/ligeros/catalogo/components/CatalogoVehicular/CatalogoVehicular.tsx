"use client";

import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import { Breadcrumbs } from "@/components/Shared/Breadcrumbs";

import { Filtros } from "../Filtros";
import { ListVehicles } from "../ListVehicles";

import { useBrands } from "@/context/brands/marcaContext";
import { useModelos } from "@/context/modelos/modeloContext";
import { iChasis, iModelo, SortOrder } from "@/types";

export function CatalogoVehicular() {
  const { brands } = useBrands();
  const { modelos } = useModelos();
  const router = useRouter();

  const searchParams = useSearchParams();
  const marcaFound = searchParams.get("marca");

  const [chasises, setChasises] = useState<iChasis[]>([]);
  const [vehiculosFiltrados, setVehiculosFiltrados] = useState<iModelo[]>([]);
  const [sortOrder, setSortOrder] = useState<SortOrder>("price_asc");
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

    const sorted = [...filtered];
    switch (sortOrder) {
      case "price_asc":
        sorted.sort((a, b) => (a.precioBase ?? 0) - (b.precioBase ?? 0));
        break;
      case "price_desc":
        sorted.sort((a, b) => (b.precioBase ?? 0) - (a.precioBase ?? 0));
        break;
      case "alpha_asc":
        sorted.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "alpha_desc":
        sorted.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "default":
        break;
    }

    setVehiculosFiltrados(sorted);
  }, [filtros, modelos, sortOrder]);

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
    setSortOrder("default");
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
          <ListVehicles
            models={vehiculosFiltrados}
            sortOrder={sortOrder}
            onSortChange={setSortOrder}
          />
        </div>
      </div>
    </div>
  );
}
