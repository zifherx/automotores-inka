"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";

import { Breadcrumbs } from "@/components/Shared/Breadcrumbs";

import { iBrand, iChasis, iModelo } from "@/types";
import { Filtros } from "../Filtros";
import { ListVehicles } from "../ListVehicles";

export function CatalogoVehicular() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const marcaFound = searchParams.get("marca");

  const [marcas, setMarcas] = useState<iBrand[]>([]);
  const [chasises, setChasises] = useState<iChasis[]>([]);
  const [models, setModels] = useState<iModelo[]>([]);
  const [vehiculosFiltrados, setVehiculosFiltrados] = useState<iModelo[]>([]);
  const [filtros, setFiltros] = useState({
    marca: marcaFound ? marcaFound : "",
    carroceria: "",
  });

  const getBrands = async () => {
    const query = await axios.get("/api/marca");
    if (query.status === 200) {
      const brandsActive: iBrand[] = query.data.obj.filter(
        (a: iBrand) => a.isActive
      );
      setMarcas(brandsActive);
    }
  };

  const getChasises = async () => {
    const query = await axios.get("/api/chasis");
    if (query.status === 200) {
      setChasises(query.data.obj);
    }
  };

  const getModels = async () => {
    const query = await axios.get("/api/modelo");
    if (query.status === 200) {
      setModels(query.data.obj);
    }
  };

  useEffect(() => {
    getBrands();
    getChasises();
    getModels();
  }, []);

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
      <div className="md:max-w-screen-2xl md:mx-auto p-6 md:p-4">
        <Breadcrumbs marca={filtros.marca} />
        <div className="flex flex-col lg:flex-row gap-8">
          <Filtros
            brands={marcas}
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
