import { Dispatch, SetStateAction } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Props {
  priceRange: [number, number];
  setPriceRange: Dispatch<SetStateAction<[number, number]>>;
  brands: string[];
  selectedBrand: string;
  setSelectedBrand: Dispatch<SetStateAction<string>>;
  chasisTypes: string[];
  selectedChasis: string[];
  setSelectedChasis: Dispatch<SetStateAction<string[]>>;
}

export function FilterSidebar({
  brands,
  priceRange,
  selectedBrand,
  setPriceRange,
  setSelectedBrand,
  chasisTypes,
  selectedChasis,
  setSelectedChasis,
}: Props) {
  const handlePriceChange = (value: number[]) => {
    setPriceRange(value as [number, number]);
  };

  const handleChasisChange = (chasis: string) => {
    setSelectedChasis((prev) =>
      prev.includes(chasis)
        ? prev.filter((b) => b !== chasis)
        : [...prev, chasis]
    );
  };

  //   const handleBrandChange = (value: string) => {
  //     setSelectedChasis(value === "all" ? null : value);
  //   };

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h2 className="text-lg font-semibold">Filtros</h2>
      <div className="bg-blueInka h-px mb-5"></div>
      <div className="mb-6">
        <h3 className="text-md font-medium mb-2">Rango de Precio</h3>
        <Slider
          min={0}
          max={100000}
          step={1000}
          value={priceRange}
          onValueChange={handlePriceChange}
          className="mb-2"
        />
        <div className="flex justify-between text-sm text-gray-600">
          <span>${priceRange[0].toLocaleString()}</span>
          <span>${priceRange[1].toLocaleString()}</span>
        </div>
      </div>
      <div className="mb-6">
        <h3 className="text-md font-medium mb-2">Marcas</h3>
        <Select value={selectedBrand} onValueChange={setSelectedBrand}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Selecciona una marca" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas las marcas</SelectItem>
            {brands.map((brand) => (
              <SelectItem key={brand} value={brand}>
                {brand}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div>
        <h3 className="text-md font-medium mb-2">Carrocerías</h3>
        {chasisTypes.map((chasis) => (
          <div key={chasis} className="flex items-center mb-2">
            <Checkbox
              id={chasis}
              checked={selectedChasis.includes(chasis)}
              onCheckedChange={() => handleChasisChange(chasis)}
            />
            <label htmlFor={chasis} className="ml-2 text-sm">
              {chasis}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}
