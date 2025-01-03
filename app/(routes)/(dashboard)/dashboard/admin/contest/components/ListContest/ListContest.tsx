"use client"

import { useState } from "react";

import { CardSkeletonModel } from "@/components/Shared/CardSkeletonModel";
import { CardContest } from "../CardContest";

import { iListContest } from "@/types";

export function ListContest(props: iListContest) {
    const {contests} = props
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
      {contests.length === 0 ? (
        <p className="text-center text-2xl font-textRegular col-span-4">
          No existen concursos registrados
        </p>
      ) : (
        contests.length > 0 &&
        contests.map((item) => <CardContest key={item._id} contest={item} />)
      )}
    </div>
  )
}
