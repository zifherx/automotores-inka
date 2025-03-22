"use client";

import { Search } from "lucide-react";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { meses, tTabsProps } from "../PresupuestosTabs";

export function FiltrosSection({
  inputFiltroProp,
  setInputFiltroProp,
  anioSeleccionado,
  mesSeleccionado,
  setAnioSeleccionado,
  setMesSeleccionado,
}: tTabsProps) {
  return (
    <div className="p-1 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
      <div className="flex flex-1 gap-2 max-w-md">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar presupuestos..."
            className="pl-8"
            value={inputFiltroProp}
            onChange={(e) => setInputFiltroProp(e.target.value)}
          />
        </div>
        <Select
          value={mesSeleccionado?.toString() || "all"}
          onValueChange={(v) =>
            setMesSeleccionado(v === "all" ? null : Number.parseInt(v))
          }
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Todos los meses" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos los meses</SelectItem>
            {meses.map((mes, index) => (
              <SelectItem key={index} value={(index + 1).toString()}>
                {mes}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Select
        value={anioSeleccionado.toString()}
        onValueChange={(v) => setAnioSeleccionado(Number.parseInt(v))}
      >
        <SelectTrigger className="w-[120px]">
          <SelectValue placeholder="Año" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="2025">2025</SelectItem>
          <SelectItem value="2026">2026</SelectItem>
          <SelectItem value="2027">2027</SelectItem>
          <SelectItem value="2028">2028</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
