import { Search } from "lucide-react";

import { Input } from "@/components/ui/input";
import { tFilterUbicanos } from "@/types";

export function FilterSearchView({ value, onChange }: tFilterUbicanos) {
  return (
    <div className="relative mb-8">
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
      <Input
        type="text"
        placeholder="Ingresa tu distrito o ciudad"
        className="pl-10 w-full max-w-md"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-label="Buscar concesionarios por ciudad"
      />
    </div>
  );
}
