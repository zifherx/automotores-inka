"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import axios from "axios";

import { SideForm } from "../SideForm";
import { SelectedModel } from "../SelectedModel";

import { getRouteForModel } from "@/lib";
import { iListModels, iModelo } from "@/types";
import { AutoLoadingSpinner } from "@/components/Shared/Auto-Loading-Spinner";
import { Error404 } from "@/components/Shared/Error404";

export function Cotizacion() {
  const searchParams = useSearchParams();
  const modelParam = searchParams.get("modelo");
  const [model, setModel] = useState<iModelo>();
  const [isLoading, setIsLoading] = useState(true);

  const getModelByName = async (slug: string) => {
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
    if (modelParam) {
      getModelByName(modelParam);
    }
  }, [modelParam]);

  if (isLoading) {
    return <AutoLoadingSpinner />;
  }

  // const filteredModel = models.find(
  //   (modelo) => getRouteForModel(modelo.name.toLowerCase()) === modelParam
  // );

  return (
    <div className="max-w-7xl mx-auto">
      {model ? (
        <div className="p-5 md:p-10 flex flex-col-reverse md:grid md:grid-cols-2 lg:grid-cols-[40%,1fr] gap-10 md:gap-0">
          <SideForm model={model!} />
          <SelectedModel model={model!} />
        </div>
      ) : (
        <Error404 />
      )}
    </div>
  );
}
