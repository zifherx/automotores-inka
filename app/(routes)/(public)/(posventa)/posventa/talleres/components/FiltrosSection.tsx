"use client";

import { motion } from "framer-motion";
import { Filter } from "lucide-react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

import { FilterTalleresProp } from "@/types";
import { CiudadesTalleresData } from "@/data";

export function FiltrosSection({
  ciudadSeleccionada,
  marcaSeleccionada,
  setCiudadSeleccionada,
  setMarcaSeleccionada,
}: FilterTalleresProp) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6, duration: 0.6 }}
      className="py-8 bg-white shadow-sm"
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-wrap gap-4 items-center justify-center">
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-blueInka" />
            <span className="font-semibold text-gray-700">Filtrar por:</span>
          </div>
          <Select
            value={ciudadSeleccionada}
            onValueChange={setCiudadSeleccionada}
          >
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Ciudad" />
            </SelectTrigger>
            <SelectContent>
              {CiudadesTalleresData.map((marca) => (
                <SelectItem key={marca} value={marca}>
                  {marca}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {(ciudadSeleccionada !== "Todas" ||
            marcaSeleccionada !== "Todas") && (
            <Button
              variant="outline"
              onClick={() => {
                setCiudadSeleccionada("Todas");
                setMarcaSeleccionada("Todas");
              }}
              className="bg-blueInka text-white text-sm font-medium transit hover:border-2 hover:border-blueInka hover:text-blueInka"
            >
              Limpiar filtros
            </Button>
          )}
        </div>
      </div>
    </motion.section>
  );
}
