import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { iFilterBar } from "@/interfaces/iAdmin";

export function FilterBar({
  carroceriaType,
  marcas,
  priceRange,
  selectedCarroceria,
  selectedMarca,
  setPriceRange,
  setSelectedCarroceria,
  setSelectedMarca,
}: iFilterBar) {
  const handlePriceChange = (value: number[]) => {
    setPriceRange(value as [number, number]);
  };

  const handleChasisChange = (chasis: string) => {
    setSelectedCarroceria((prev) =>
      prev.includes(chasis)
        ? prev.filter((b) => b !== chasis)
        : [...prev, chasis]
    );
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow ">
      <div className="flex flex-row justify-start gap-5">
        <div className="w-[200px]">
          <h3 className="text-md font-bold mb-2">Marcas</h3>
          <Select value={selectedMarca} onValueChange={setSelectedMarca}>
            <SelectTrigger>
              <SelectValue placeholder="Selecciona una marca" />
            </SelectTrigger>
            <SelectContent className="w-full">
              <SelectItem value="all">Todas las marcas</SelectItem>
              {marcas.map((item) => (
                <SelectItem key={item} value={item}>
                  {item}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <h3 className="text-md font-bold mb-4">Carrocerías</h3>
          <div className="flex flex-row gap-3">
            {carroceriaType.map((item) => (
              <div key={item} className="flex items-center mb-2">
                <Checkbox
                  id={item}
                  checked={selectedCarroceria.includes(item)}
                  onCheckedChange={() => handleChasisChange(item)}
                />
                <label htmlFor={item} className="ml-2 text-sm">
                  {item}
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
