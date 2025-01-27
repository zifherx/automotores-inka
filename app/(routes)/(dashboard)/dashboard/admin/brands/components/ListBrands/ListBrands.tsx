import { CardBrand } from "../CardBrand";
import { iListBrand } from "@/types";

export function ListBrands({ brands }: iListBrand) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 p-2">
      {brands.length === 0 ? (
        <p className="text-center text-2xl font-textRegular col-span-4">
          No existen marcas registradas
        </p>
      ) : (
        brands.map((item) => <CardBrand key={item._id} brand={item} />)
      )}
    </div>
  );
}
