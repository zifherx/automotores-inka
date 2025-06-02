"use client";

import { useState } from "react";

import { HeroSection } from "./HeroSection";
import { FiltrosSection } from "./FiltrosSection";
import { GridTalleresSection } from "./GridTalleresSection";

import { TalleresData } from "@/data";

export function TalleresView() {
  const [ciudadSeleccionada, setCiudadSeleccionada] = useState("Todas");
  const [marcaSeleccionada, setMarcaSeleccionada] = useState("Todas");

  const talleresFiltrados = TalleresData.filter((taller) => {
    const cumpleCiudad =
      ciudadSeleccionada === "Todas" || taller.ciudad === ciudadSeleccionada;
    const cumpleMarca =
      marcaSeleccionada === "Todas" ||
      taller.marcas.some((marca) =>
        marca.title
          .toLocaleLowerCase()
          .includes(marcaSeleccionada.toLocaleLowerCase())
      );
    return cumpleCiudad && cumpleMarca;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <HeroSection />
      <FiltrosSection
        ciudadSeleccionada={ciudadSeleccionada}
        setCiudadSeleccionada={setCiudadSeleccionada}
        marcaSeleccionada={marcaSeleccionada}
        setMarcaSeleccionada={setMarcaSeleccionada}
      />
      <GridTalleresSection talleres={talleresFiltrados} />
    </div>
  );
}
