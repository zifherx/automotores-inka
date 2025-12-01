"use client";

import { motion } from "framer-motion";

import { EstadisticaLandingCorporativo } from "@/data";

export function EstadisticasSection() {
  const fadeInUp = {
    initial: { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 },
  };

  return (
    <section className="py-20 px-6 bg-plomoInka">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8 text-center">
          {EstadisticaLandingCorporativo.map(({ id, description, value }) => (
            <motion.div key={id} {...fadeInUp}>
              <div className="text-5xl font-bold text-blueInka mb-2">
                {value}
              </div>
              <div className="text-grisDarkInka font-medium">{description}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
