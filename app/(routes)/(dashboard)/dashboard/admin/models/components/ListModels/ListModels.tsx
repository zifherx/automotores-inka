"use client";

import { useEffect, useState } from "react";
import axios from "axios";

import { CardModel } from "../CardModel";
import { iListModels, iModelo } from "@/types";

export function ListModels(props: iListModels) {
  const { models } = props;
  // const [modelos, setModelos] = useState<iModelo[]>([]);

  // const getModelos = async () => {
  //   const query = await axios.get("/api/modelo");
  //   if (query.status === 200) {
  //     setModelos(query.data);
  //   }
  // };

  // useEffect(() => {
  //   getModelos();
  // }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 p-2 md:p-3">
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
