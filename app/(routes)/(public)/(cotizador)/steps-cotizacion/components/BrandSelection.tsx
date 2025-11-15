"use client";

import Image from "next/image";
import { motion } from "framer-motion";

import { Card, CardContent } from "@/components/ui/card";
import { useBrands } from "@/context/brands/marcaContext";

import { BrandSelectionProp } from "@/types";

export function BrandSelection({ onSelect }: BrandSelectionProp) {
  const { brands } = useBrands();
  const marcasActivas = brands.filter((marca) => marca.isActive);

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
    >
      <div className="text-center mb-6">
        <h2 className="font-headBold text-4xl mb-2">Elige tu Marca Favorita</h2>
        <p className="font-headLight">
          Selecciona la marca de tu preferencia para ver los modelos disponibles
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {marcasActivas.map((brand, index) => (
          <motion.div
            key={brand._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Card
              className="cursor-pointer hover:shadow-lg transition-all duration-300 border-2 hover:border-blueInka p-0"
              onClick={() => onSelect(brand)}
            >
              <CardContent className="pb-1">
                <div className="flex justify-center">
                  <Image
                    src={brand.imageUrl}
                    alt={brand.name}
                    width={120}
                    height={80}
                    className="object-contain"
                  />
                </div>
                <h3 className="text-sm text-center font-semibold text-gray-900">
                  {brand.name}
                </h3>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
