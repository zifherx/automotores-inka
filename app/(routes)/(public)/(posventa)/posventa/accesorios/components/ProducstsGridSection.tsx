"use client";

import { AnimatePresence, motion } from "framer-motion";

import { FeatureProductsProps } from "@/types";
import { CardAccesorio } from "@/components/Shared/CardAccesorio";

export function ProducstsGridSection({ products }: FeatureProductsProps) {
  return (
    <section id="products-section" className="py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="inline-block px-4 py-1 bg-slate-100 text-slate-600 rounded-full text-sm font-medium mb-2">
              CATÁLOGO COMPLETO
            </span>
            <h3 className="text-2xl font-bold text-slate-800">
              Nuestros productos ({products.length})
            </h3>
          </motion.div>
        </div>

        <AnimatePresence>
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
          >
            {products.map((product, index) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ delay: index * 0.05 }}
              >
                <CardAccesorio product={product} />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {products.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-semibold text-slate-600 mb-2">
              No se encontraron productos
            </h3>
            <p className="text-slate-500">
              Intenta ajustar tus filtros de búsqueda
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
}
