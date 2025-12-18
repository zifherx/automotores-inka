"use client";

import { motion } from "framer-motion";

export function TrustSection() {
  const fadeInUp = {
    initial: { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 },
  };

  return (
    <section className="py-16 px-6 bg-blueInka text-white">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div {...fadeInUp}>
          <h3 className="text-2xl md:text-3xl font-bold mb-4">
            Más de 14 años impulsando la movilidad empresarial en el Perú
          </h3>
          <p className="text-blue-100 text-lg">
            Confía en la experiencia de Automotores Inka para llevar tu empresa
            al siguiente nivel
          </p>
        </motion.div>
      </div>
    </section>
  );
}
