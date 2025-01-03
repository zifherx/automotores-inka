import { useMemo, useState } from "react";

import { iListModels } from "@/types";
import { FilterSidebar } from "../FilterSidebar";
import { VehicleList } from "../VehicleList";

export function VehicleFilterPage({ models }: iListModels) {
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100000]);
  const [selectedBrand, setSelectedBrand] = useState<string>("all");
  const [selectedChasis, setSelectedChasis] = useState<string[]>([]);

  const filteredAndSortedVehicles = useMemo(() => {
    return models
      .filter(
        (modelo) =>
          modelo.precioBase >= priceRange[0] &&
          modelo.precioBase <= priceRange[1] &&
          (selectedBrand === "all" || modelo.marca.name === selectedBrand) &&
          (selectedChasis.length === 0 ||
            selectedChasis.includes(modelo.carroceria.name))
      )
      .sort((a, b) => {
        if (a.marca.name !== b.marca.name) {
          return a.marca.name.localeCompare(b.marca.name);
        }
        return a.precioBase - b.precioBase;
      });
  }, [models, priceRange, selectedBrand, selectedChasis]);

  const brands = useMemo(
    () => [...new Set(models.map((item) => item.marca.name))],
    [models]
  );

  const chasisTypes = useMemo(
    () => [...new Set(models.map((item) => item.carroceria.name))],
    [models]
  );

  return (
    <div className="container mx-auto px-4 py-8 border-2 border-blueInka">
      <div className="flex flex-col md:flex-row gap-5">
        <div className="w-full md:w-1/3 border-2 border-orange-500">
          <FilterSidebar
            priceRange={priceRange}
            setPriceRange={setPriceRange}
            brands={brands}
            selectedBrand={selectedBrand}
            setSelectedBrand={setSelectedBrand}
            chasisTypes={chasisTypes}
            selectedChasis={selectedChasis}
            setSelectedChasis={setSelectedChasis}
          />
        </div>
        <div className="w-full md:w-2/3 border-2 border-purple-500">
          <VehicleList
            models={filteredAndSortedVehicles}
            showChasis={selectedChasis.length > 0}
          />
        </div>
      </div>
    </div>
  );
}
