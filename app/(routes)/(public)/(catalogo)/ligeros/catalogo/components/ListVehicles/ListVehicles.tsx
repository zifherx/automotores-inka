import { ArrowRight, ArrowUpDown } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { CardProductModel } from "@/components/Shared/CardProductModel";
import { CardSkeletonModel } from "@/components/Shared/CardSkeletonModel";

import { iListVehicle, iModelo, SortOrder } from "@/types";

export function ListVehicles({
  models,
  onSortChange,
  sortOrder,
}: iListVehicle) {
  const [counterVehicles, setCounterVehicles] = useState(9);
  const dataFilteredVehicles = models?.slice(0, counterVehicles);

  const loadMoreVehicles = () => {
    setCounterVehicles(counterVehicles + 3);
  };

  return (
    <section>
      <h2 className="text-xl font-bold uppercase mb-3 text-blueInka">
        Ofertas en Autos, SUVs y Pickups
      </h2>

      <p className="text-grisDarkInka text-justify mb-10 leading-snug">
        Encuentra tu auto entre las más de 14 marcas que tenemos disponibles
        para ti. Podrás evaluar tu financiamiento y simular tu crédito online.
        Comienza el sueño de tu nuevo auto con nosotros.
      </p>

      <div className="flex items-center justify-end gap-2 max-w-56 my-5 ml-auto">
        <ArrowUpDown className="w-4 h-4 text-grisInka shrink-0" />
        <Select
          value={sortOrder}
          onValueChange={(val) => onSortChange(val as SortOrder)}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Ordernar por ..." />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="default">Relevancia</SelectItem>
            <SelectItem value="price_asc">Precio: menor a mayor</SelectItem>
            <SelectItem value="price_desc">Precio: mayor a menor</SelectItem>
            <SelectItem value="alpha_asc">A - Z</SelectItem>
            <SelectItem value="alpha_desc">Z - A</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {models.length === 0 && (
        <div className="grid grid-cols-1 md:grid-cols-3 md:gap-5">
          {[...Array(3)].map((_, index) => (
            <CardSkeletonModel key={index} />
          ))}
        </div>
      )}

      <div className="grid gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {dataFilteredVehicles
          .filter((item) => item.isActive)
          .map((item: iModelo) => (
            <CardProductModel key={item._id} model={item} />
          ))}
      </div>
      <div className="text-center my-8">
        {counterVehicles < models.length && (
          <Button
            className="p-6 text-white font-bold bg-blueInka transition-all duration-150 cursor-pointer rounded-xl hover:scale-105 hover:bg-blueDarkInka"
            onClick={loadMoreVehicles}
          >
            Ver más modelos
            <ArrowRight className="w-5 h-5 mr-2" strokeWidth={2} />
          </Button>
        )}
      </div>
    </section>
  );
}
