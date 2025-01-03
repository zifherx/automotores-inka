"use client";

import axios from "axios";

import { DashboardCard } from "@/components/Shared/DashboardCard";

import { BadgeDollarSign, Car, Scale, Wrench } from "lucide-react";
import { useEffect, useState } from "react";

export function DashboardIndicators() {
  const [isLoadingValue, setIsLoadingValue] = useState(true);
  const [totalCotizaciones, setTotalCotizaciones] = useState(0);
  const [totalCitas, setTotalCitas] = useState(0);
  const [totalReclamos, setTotalReclamos] = useState(0);
  const [totalVehiculos, setTotalVehiculos] = useState(0);

  const getCotizaciones = async () => {
    try {
      const query = await axios.get("/api/cotizacion");
      if (query.status === 200) {
        setTotalCotizaciones(query.data.total);
        setIsLoadingValue(false);
      }
    } catch (err) {
      console.log(err);
      setIsLoadingValue(false);
    }
  };

  const getVehiculos = async () => {
    try {
      const query = await axios.get("/api/modelo");
      if (query.status === 200) {
        setTotalVehiculos(query.data.total);
        setIsLoadingValue(false);
      }
    } catch (err) {
      console.log(err);
      setIsLoadingValue(false);
    }
  };

  const getCitas = async () => {
    try {
      const query = await axios.get("/api/citas");
      if (query.status === 200) {
        setTotalCitas(query.data.total);
        setIsLoadingValue(false);
      }
    } catch (err) {
      console.log(err);
      setIsLoadingValue(false);
    }
  };

  const getReclamos = async () => {
    try {
      const query = await axios.get("/api/reclamo");
      if (query.status === 200) {
        setTotalReclamos(query.data.total);
        setIsLoadingValue(false);
      }
    } catch (err) {
      console.log(err);
      setIsLoadingValue(false);
    }
  };

  useEffect(() => {
    getCotizaciones();
    getVehiculos();
    getCitas();
    getReclamos();
  }, []);

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <DashboardCard
        icon={BadgeDollarSign}
        mainValue={totalCotizaciones.toString()}
        title="Total Cotizaciones"
        subtitle=""
        isLoadingValue={isLoadingValue}
      />
      <DashboardCard
        icon={Wrench}
        mainValue={totalCitas.toString()}
        title="Citas"
        subtitle=""
        isLoadingValue={isLoadingValue}
      />
      <DashboardCard
        icon={Scale}
        mainValue={totalReclamos.toString()}
        title="Total Reclamos"
        subtitle=""
        isLoadingValue={isLoadingValue}
      />
      <DashboardCard
        icon={Car}
        mainValue={totalVehiculos.toString()}
        title="Total Vehículos"
        subtitle=""
        isLoadingValue={isLoadingValue}
      />
    </div>
  );
}
