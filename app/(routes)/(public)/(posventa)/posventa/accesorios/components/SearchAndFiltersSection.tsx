"use client";

import { Filter, Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { SearchFilterProps } from "@/types";
import { filter } from "lodash";

export function SearchAndFiltersSection({
  brands,
  categories,
  filters,
  modelsByBrand,
  onFiltersChange,
  onToggleFilters,
  showFilters,
}: SearchFilterProps) {
  const availableModels =
    filters.selectedBrand !== "all"
      ? modelsByBrand[filters.selectedBrand] || []
      : [];

  return (
    <section className="py-8 bg-white shadow-inner">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-4 items-center">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blueInka w-5 h-5" />
            <Input
              placeholder="Buscar accesorios..."
              value={filters.searchTerm}
              onChange={(e) => onFiltersChange({ searchTerm: e.target.value })}
              className="pl-10 h-12 text-lg"
            />
          </div>
          <Button
            variant="outline"
            onClick={onToggleFilters}
            className="md:hidden"
          >
            <Filter className="w-4 h-4 mr-2" />
            Filtros
          </Button>
          <div
            className={`flex flex-col md:flex-row gap-4 ${
              showFilters ? "block" : "hidden md:flex"
            }`}
          >
            <Select
              value={filters.selectedCategory}
              onValueChange={(value) =>
                onFiltersChange({ selectedCategory: value })
              }
            >
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Categoria" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas las categorias</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select
              value={filters.selectedBrand}
              onValueChange={(value) =>
                onFiltersChange({ selectedBrand: value, selectedModel: "all" })
              }
            >
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Marca" />
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
            <Select
              value={filters.selectedModel}
              onValueChange={(value) =>
                onFiltersChange({ selectedModel: value })
              }
              disabled={filters.selectedBrand === "all"}
            >
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Modelo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas los modelos</SelectItem>
                {availableModels.map((model) => (
                  <SelectItem key={model} value={model}>
                    {model}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </section>
  );
}
