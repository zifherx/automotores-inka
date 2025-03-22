"use client";

import { useState } from "react";

import { CardModel } from "../CardModel";

import { iListModels } from "@/types";
import { CardSkeletonModel } from "@/components/Shared/CardSkeletonModel";

export function ListModels({ models }: iListModels) {
  const [isLoading, setIsLoading] = useState(false);

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
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 p-1 md:p-2">
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
