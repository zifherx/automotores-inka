"use client";

import { motion } from "framer-motion";

import { BeneficiosLandingCorporativo } from "@/data";

export function BeneficiosSecion() {
  const fadeInUp = {
    initial: { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 },
  };

  return (
    <section className="py-20 px-6 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <motion.div {...fadeInUp} className="text-center mb-16">
          <h2 className="text-3xl md:texl-4xl font-bold text-grisDarkInka mb-4">
            ¿Por qué elegirnos como tu aliado corporativo?
          </h2>

          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Entendemos que tu empresa necesita más que vehículos, necesita un
            socio estratégco
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {BeneficiosLandingCorporativo.map(
            ({ id, color, description, icon: Icon, titulo }) => (
              <motion.div key={id}>
                <div className={`inline-flex p-4 rounded-xl ${color} mb-6`}>
                  <Icon className="w-8 h-8" />
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {titulo}
                </h3>

                <p className="text-gray-600 leading-relaxed">{description}</p>
              </motion.div>
            )
          )}
        </div>
      </div>
    </section>
  );
}
