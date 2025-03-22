"use client";

import { useBrands } from "@/context/brands/marcaContext";
import { TableLoading } from "@/components/Shared/TableLoading";

import { CardBrand } from "../CardBrand";

export function ListBrands() {
  const { brands, isLoadingData } = useBrands();

  if (isLoadingData) {
    return <TableLoading />;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 p-2">
      {brands.length === 0 ? (
        <p className="text-center text-2xl font-textRegular col-span-4">
          No existen registros
        </p>
      ) : (
        brands.map((item) => <CardBrand key={item._id} brand={item} />)
      )}
    </div>
  );
}
