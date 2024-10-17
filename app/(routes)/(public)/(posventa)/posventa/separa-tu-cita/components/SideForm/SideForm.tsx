"use client";

import { useEffect, useState } from "react";
import axios from "axios";

import { Title } from "@/components/Shared/Title";
import { FormMantenimiento } from "../FormMantenimiento";

import { iBrand } from "@/types";
import { MasonryBrands } from "../MasonryBrands";

export function SideForm() {
  const [brandList, setBrandList] = useState<iBrand[]>([]);
  const getBrands = async () => {
    const query = await axios.get("/api/marca");
    if (query.status === 200) {
      setBrandList(query.data.obj);
    }
  };

  useEffect(() => {
    getBrands();
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-2 md:p-10">
      <div className="flex flex-col md:grid md:grid-cols-[60%_1fr] gap-3">
        <div className="p-2 flex flex-col gap-2">
          <Title
            title="Registra tu servicio"
            className="font-headMedium uppercase text-3xl text-center"
          />
          <FormMantenimiento />
        </div>
        <div className="p-2 flex items-center mx-auto">
          <MasonryBrands brands={brandList} />
        </div>
      </div>
    </div>
  );
}
