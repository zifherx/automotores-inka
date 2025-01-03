"use client";

import { iModelo } from "@/types";
import axios from "axios";
import { VehicleFilterPage } from "./components/VehicleFilterPage";
import { useEffect, useState } from "react";

export default function PruebasPage() {
  const [models, setModels] = useState<iModelo[]>([]);

  const getModels = async () => {
    const query = await axios.get("/api/modelo");
    if (query.status === 200) {
      setModels(query.data.obj);
    }
  };

  useEffect(() => {
    getModels();
  }, []);

  return (
    <>
      <VehicleFilterPage models={models} />
    </>
  );
}
