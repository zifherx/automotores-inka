import { cn } from "@/lib";
import { tBrandGrid } from "@/types";
import Image from "next/image";

export function BrandGrid(props: tBrandGrid) {
  const { brands, onSelect, selectedBrand } = props;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
      {brands
        .filter((item) => item.isActive)
        .map((brand) => (
          <button
            key={brand._id}
            className={cn(
              "p-2 rounded-lg transition-all duration-200 ease-in-out",
              selectedBrand?.slug === brand.slug
                ? "ring-2 ring-blueInka"
                : "hover:bg-muted"
            )}
            onClick={() => onSelect(brand)}
          >
            <Image
              src={brand.imageUrl}
              alt={brand.name}
              width={80}
              height={40}
              className="w-full h-auto object-contain"
            />
            <p className="text-xs text-center mt-0">{brand.name}</p>
          </button>
        ))}
    </div>
  );
}
