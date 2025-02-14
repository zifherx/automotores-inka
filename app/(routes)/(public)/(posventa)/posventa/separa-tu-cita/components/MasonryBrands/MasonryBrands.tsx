import Image from "next/image";
import { iListBrand } from "@/types";

export function MasonryBrands({ brands }: iListBrand) {
  return (
    <div className="grid grid-cols-4 md:grid-cols-3 gap-4 md:gap-5">
      {brands.map(({ _id, imageUrl, name }) => (
        <Image
          key={_id}
          src={imageUrl}
          alt={name}
          width={150}
          height={60}
          priority
          className="border border-grisInka/30 rounded-md"
        />
      ))}
    </div>
  );
}
