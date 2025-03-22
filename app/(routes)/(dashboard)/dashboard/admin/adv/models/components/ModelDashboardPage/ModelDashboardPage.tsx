"use client";

import { useEffect, useState } from "react";
import axios from "axios";

import { iModelo } from "@/types";
import { ModelFilterList } from "../ModelFilterList";

export function ModelDashboardPage() {
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
    <div>
      <ModelFilterList models={models} />
    </div>
  );
}
