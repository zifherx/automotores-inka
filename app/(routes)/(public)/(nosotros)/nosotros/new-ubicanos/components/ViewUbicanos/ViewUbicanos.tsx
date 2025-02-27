"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import dynamic from "next/dynamic";
import axios from "axios";

import { MigajasView } from "../Migajas";
import { FilterSearchView } from "../FilterSearch";
import { SidebarUbicanos } from "../Sidebar";

import { iSede } from "@/types";

const LocationMap = dynamic(
  () => import("../Mapa").then((module) => module.Mapa),
  { ssr: false }
);

export function ViewUbicanos() {
  const [search, setSearch] = useState("");
  const [dealers, setDealers] = useState<iSede[]>([]);
  const [selectedDealer, setSelectedDealer] = useState<iSede | null>(null);
  const [openPopupId, setOpenPopupId] = useState<string | null>(null);
  const markersRef = useRef<{ [key: string]: L.Marker }>({});

  const getSedes = async () => {
    const query = await axios.get(`/api/sucursal`);
    if (query.status === 200) {
      setDealers(query.data.obj);
    }
  };

  useEffect(() => {
    getSedes();
  }, []);

  const filteredDealers = useMemo(
    () =>
      dealers.filter(
        (dealer) =>
          (search === "" ||
            dealer.ciudad.toLowerCase().includes(search.toLowerCase())) &&
          dealer.isActive
      ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [dealers, search]
  );

  const mapCenter = useMemo(() => {
    if (selectedDealer) {
      return [
        parseFloat(selectedDealer.coordenadasMapa.latitud),
        parseFloat(selectedDealer.coordenadasMapa.longitud),
      ] as [number, number];
    }

    if (filteredDealers.length > 0) {
      return [
        parseFloat(filteredDealers[0].coordenadasMapa.latitud),
        parseFloat(filteredDealers[0].coordenadasMapa.longitud),
      ] as [number, number];
    }

    return [-12.11249985070803, -77.01393015682699] as [number, number]; //Default dealer of Lima (Surquillo)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedDealer, filteredDealers]);

  const handleSelectDealer = useCallback((dealer: iSede) => {
    setSelectedDealer(dealer);
    setOpenPopupId(dealer._id);
  }, []);

  return (
    <div className="container mx-auto py-4 md:py-8">
      <MigajasView />
      <FilterSearchView value={search} onChange={setSearch} />
      <div className="flex flex-col md:grid md:grid-cols-3 gap-8">
        <SidebarUbicanos
          sedes={filteredDealers}
          onSelectDealer={handleSelectDealer}
        />
        <LocationMap
          sedes={filteredDealers}
          mapCenter={mapCenter}
          openPopupId={openPopupId}
          markersRef={markersRef}
        />
      </div>
    </div>
  );
}
