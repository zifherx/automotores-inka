import { useMemo, useState } from "react";
import { RefreshCw } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ListModels } from "../ListModels";
import { BtnAddModel } from "../BtnAddModel";
import { FilterBar } from "../FilterBar";

import { iListModels } from "@/types";

export function ModelFilterList({ models }: iListModels) {
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
    <div>
      <div className="border border-slate-200 rounded-2xl p-4 sticky z-50 top-5 bg-white">
        <div className="flex justify-between mb-3">
          <h2 className="flex items-center gap-1 text-xl md:text-3xl font-headMedium">
            Gestión de Modelos
          </h2>
          <div className="flex items-center justify-between gap-3">
            <BtnAddModel />

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline">
                    <RefreshCw className="w-5 h-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="bottom">
                  <p className="text-base">Actualizar</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
        <FilterBar
          priceRange={priceRange}
          setPriceRange={setPriceRange}
          marcas={brands}
          selectedMarca={selectedBrand}
          setSelectedMarca={setSelectedBrand}
          carroceriaType={chasisTypes}
          selectedCarroceria={selectedChasis}
          setSelectedCarroceria={setSelectedChasis}
        />
      </div>
      <ListModels models={filteredAndSortedVehicles} />
    </div>
  );
}
