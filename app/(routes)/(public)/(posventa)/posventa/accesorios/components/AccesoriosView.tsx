"use client";

import { useMemo, useState } from "react";

import { HeroSection } from "./HeroSection";
import { FeaturedProductsSection } from "./FeaturedProductsSection";
import { SearchAndFiltersSection } from "./SearchAndFiltersSection";
import { ProducstsGridSection } from "./ProducstsGridSection";

import { FilterState } from "@/interfaces";
import {
  AccesoriosData,
  brandsAccesorios,
  categoriesAccesorios,
  modelsByBrandAccesorios,
} from "@/data";
import { CTASection } from "./CTASection";
import { filter } from "lodash";

export function AccesoriosView() {
  const [filters, setFilters] = useState<FilterState>({
    searchTerm: "",
    selectedCategory: "all",
    selectedBrand: "all",
    selectedModel: "all",
  });
  const [showFilters, setShowFilters] = useState(false);
  const handleFiltersChange = (newFilters: Partial<FilterState>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };

  const filteredProducts = useMemo(() => {
    return AccesoriosData.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
        product.description
          .toLowerCase()
          .includes(filters.searchTerm.toLowerCase());
      const matchesCategory =
        filters.selectedCategory === "all" ||
        product.category === filters.selectedCategory;
      const matchesBrand =
        filters.selectedBrand === "all" ||
        product.brand === filters.selectedBrand;
      const matchesModel =
        filters.selectedModel === "all" ||
        product.model.includes(filters.selectedModel);

      return matchesSearch && matchesCategory && matchesBrand && matchesModel;
    });
  }, [filters]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <HeroSection />
      <FeaturedProductsSection products={AccesoriosData} />
      <SearchAndFiltersSection
        brands={brandsAccesorios}
        categories={categoriesAccesorios}
        filters={filters}
        modelsByBrand={modelsByBrandAccesorios}
        onFiltersChange={handleFiltersChange}
        onToggleFilters={() => setShowFilters(!showFilters)}
        showFilters={showFilters}
      />
      <ProducstsGridSection products={filteredProducts} />
      <CTASection />
    </div>
  );
}
