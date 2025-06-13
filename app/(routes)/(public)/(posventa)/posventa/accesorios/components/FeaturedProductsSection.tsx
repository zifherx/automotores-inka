"use client";

import { motion } from "framer-motion";

import { FeatureProductsProps } from "@/types";
import { CardAccesorio } from "@/components/Shared/CardAccesorio";

export function FeaturedProductsSection({ products }: FeatureProductsProps) {
  const featuredProducts = products.filter((product) => product.featured);

  return (
    <section id="featured-products" className="py-16 bg-slate-50">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-1 bg-red-100 text-redInka rounded-full text-sm font-medium mb-3">
            LO MÁS VENDIDO
          </span>
          <h3 className="text-3xl font-bold text-slate-800">
            Productos Destacados
          </h3>
          <div className="w-24 h-1 bg-red-600 mx-auto mt-4"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {featuredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <CardAccesorio product={product} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
