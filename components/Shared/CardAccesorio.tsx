"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Eye, Phone, ShoppingBag, Star } from "lucide-react";

import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";

import { CardProduct } from "@/types";

export function CardAccesorio({
  product,
  featured = false,
  showDetailButton = true,
}: CardProduct) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      whileHover={{ y: -8, transition: { duration: 0.2 } }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="h-full"
    >
      <Card className="h-full overflow-hidden border-0 shadow-lg transition-all duration-300 hover:shadow-xl relative">
        <CardHeader className="p-0">
          <div className="relative overflow-hidden">
            <motion.div
              animate={{ scale: isHovered ? 1.05 : 1 }}
              transition={{ duration: 0.3 }}
              className="w-full h-48"
            >
              <Image
                src={product.imageSource}
                alt={product.name}
                width={300}
                height={200}
                className="w-full h-full object-cover"
              />
            </motion.div>

            {product.featured && (
              <Badge className="absolute top-2 right-2 bg-red-600">
                <Star className="w-3 h-3 mr-1" />
                Destacado
              </Badge>
            )}

            {/* Quick action buttons that appear on hover */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: isHovered ? 1 : 0 }}
              className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3 flex justify-center space-x-2"
            >
              <Button
                size="sm"
                variant="secondary"
                className="rounded-full w-10 h-10 p-0 flex items-center justify-center"
              >
                <Phone className="w-4 h-4" />
              </Button>
              <Link href={`/posventa/accesorios/${product.slug}`}>
                <Button
                  size="sm"
                  variant="secondary"
                  className="rounded-full w-10 h-10 p-0 flex items-center justify-center"
                >
                  <Eye className="w-4 h-4" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </CardHeader>

        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-2">
            <Badge variant="secondary" className="text-xs">
              {product.category}
            </Badge>
            <Badge variant="outline" className="text-xs">
              {product.brand}
            </Badge>
          </div>

          <h4 className="font-semibold text-lg mb-2 text-slate-800 line-clamp-1">
            {product.name}
          </h4>
          <p className="text-sm text-slate-600 mb-3 line-clamp-2">
            {product.description}
          </p>

          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs text-slate-500">desde</span>
              <span className="text-xl font-bold text-red-600 ml-1">
                S/ {product.price}
              </span>
            </div>
          </div>
        </CardContent>

        {showDetailButton && (
          <CardFooter className="p-4 pt-0">
            <Link
              href={`/posventa/accesorios/${product.slug}`}
              className="w-full"
            >
              <Button className="w-full bg-slate-800 hover:bg-slate-900 group relative overflow-hidden">
                <span className="relative z-10 flex items-center justify-center gap-2">
                  <ShoppingBag className="w-4 h-4" />
                  Ver Detalles
                </span>
                <motion.span
                  initial={{ x: "-100%" }}
                  animate={{ x: isHovered ? "0%" : "-100%" }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0 bg-red-600"
                />
              </Button>
            </Link>
          </CardFooter>
        )}
      </Card>
    </motion.div>
  );
}
