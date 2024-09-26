/* eslint-disable @next/next/no-img-element */
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

import { TitleFilter } from "./TitleFilter";

import { Trash } from "lucide-react";

import { iFiltros } from "@/types";

export function Filtros(props: iFiltros) {
  const { brands, chasises, clearFilter, filters, setFilter } = props;

  const handleFilter = (filter: string, value: string) => {
    setFilter(filter, value);
  };

  return (
    <div className="bg-white border border-grisInka/35 rounded-lg w-full lg:w-[300px] p-4 h-fit">
      <TitleFilter />
      <div className="mt-8 flex flex-col lg:justify-start gap-8 lg:gap-y-5">
        <div>
          <h4 className="text-lg font-headMedium mb-2 text-blueInka">Marca</h4>
          <Select
            onValueChange={(value) => handleFilter("marca", value)}
            value={filters.marca}
          >
            <SelectTrigger>
              <SelectValue placeholder="Seleccione una marca" />
            </SelectTrigger>
            <SelectContent>
              {brands.map(({ _id, slug, name, imageUrl }) => (
                <SelectItem
                  key={_id}
                  value={slug}
                  className="capitalize font-textMedium font-bold"
                >
                  <div className="flex flex-row items-center justify-start gap-3">
                    <img
                      src={imageUrl}
                      alt={name}
                      className="h-14 w-14 object-contain"
                    />
                    {name}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <h4 className="text-lg font-headMedium mb-0 text-blueInka">
            Carrocería
          </h4>
          <Select
            onValueChange={(value) => handleFilter("carroceria", value)}
            value={filters.carroceria}
          >
            <SelectTrigger>
              <SelectValue placeholder="Seleccione una carrocería" />
            </SelectTrigger>
            <SelectContent>
              {chasises.map(({ _id, name, slug }) => (
                <SelectItem
                  key={_id}
                  value={slug}
                  className="capitalize font-textMedium"
                >
                  {name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <div>
        <Button
          className="bg-blueInka font-semibold uppercase mt-5 w-full hover:bg-blueDarkInka"
          onClick={clearFilter}
        >
          Borrar Filtros
          <Trash className="ml-2 w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
