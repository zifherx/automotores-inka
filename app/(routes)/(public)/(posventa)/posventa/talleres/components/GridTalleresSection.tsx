"use client";

import { CardTaller } from "@/components/Shared/CardTaller";
import { TalleresProp } from "@/types";
import { motion } from "framer-motion";
import { Car } from "lucide-react";

export function GridTalleresSection({ talleres }: TalleresProp) {
  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {talleres.map((taller, index) => (
            <motion.div
              key={taller.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 + index * 0.1, duration: 0.6 }}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="group"
            >
              <CardTaller taller={taller} />
            </motion.div>
          ))}
        </motion.div>

        {talleres.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <Car className="w-16 h-16 mx-auto mb-4 text-blueInka" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              No se encontraron talleres
            </h3>
            <p className="text-gray-500">
              Intenta ajustar los filtros para encontrar talleres disponibles
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
}
