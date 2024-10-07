"use client";

import { useEffect, useState } from "react";
import axios from "axios";

import { CardModel } from "../CardModel";

import { iModelo } from "@/types";
import { CardSkeletonModel } from "@/components/Shared/CardSkeletonModel";

export function ListModels() {
  const [models, setModels] = useState<iModelo[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const getModels = async () => {
    try {
      const query = await axios.get("/api/modelo");

      if (query.status === 200) {
        setModels(query.data.obj);
        setIsLoading(false);
      }
    } catch (err) {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getModels();
  }, []);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-4 md:gap-5">
        {[...Array(4)].map((_, index) => (
          <CardSkeletonModel key={index} />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 p-2 md:p-3">
      {models.length === 0 ? (
        <p className="text-center text-2xl font-textRegular col-span-4">
          No existen modelos registrados
        </p>
      ) : (
        models.length > 0 &&
        models.map((item) => <CardModel key={item._id} model={item} />)
      )}
    </div>
  );
}
