import { CardBrand } from "../CardBrand";
import { iListBrand } from "@/types";

export function ListBrands(props: iListBrand) {
  const { brands } = props;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 p-2 md:p-5">
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
