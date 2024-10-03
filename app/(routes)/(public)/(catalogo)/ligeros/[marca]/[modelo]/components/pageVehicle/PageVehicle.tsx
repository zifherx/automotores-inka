/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";

import { Error404 } from "@/components/Shared/Error404";
import { AutoLoadingSpinner } from "@/components/Shared/Auto-Loading-Spinner";

import { Vehicle } from "../Vehicle";
import { Migajas } from "../Migajas";

import { iModelo } from "@/types";

export function PageVehicle() {
  const params = useParams();

  const [model, setModel] = useState<iModelo>();
  const [isLoading, setIsLoading] = useState(true);

  const getModelBySlug = async (slug: string) => {
    try {
      const query = await axios.get(`/api/modelo/${slug}`);
      if (query.status === 200) {
        setModel(query.data);
        setIsLoading(false);
      }
    } catch (err) {
      setModel(undefined);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getModelBySlug(`${params.modelo}`);
  }, [params.modelo]);

  if (isLoading) {
    return <AutoLoadingSpinner />;
  }

  return (
    <div className="max-w-7xl mx-auto p-4 lg:p-10">
      {model && (
        <Migajas marca={`${model?.marca.slug}`} modelo={`${model?.name}`} />
      )}
      {model ? <Vehicle model={model} /> : <Error404 />}
    </div>
  );
}
