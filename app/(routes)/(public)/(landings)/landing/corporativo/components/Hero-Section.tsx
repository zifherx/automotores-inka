"use client";

import { motion } from "framer-motion";
import { Briefcase, CheckCircle, Phone } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative bg-gradient-to-br from-blue-400 via-blueInka to-blue-900 text-white overflow-hidden">
      <div>absolute</div>

      <div className="max-w-7xl mx-auto px-6 py-20 md:py-32 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6 border border-white/20"
          >
            <Briefcase className="w-4 h-4" />
            <span className="text-sm font-semibold">
              Soluciones Corporativas
            </span>
          </motion.div>

          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Impulsa la movilidad de tu empresa
          </h1>

          <p className="text-xl md:text-2xl text-blue-100 mb-8 leading-relaxed">
            Soluciones automotrices diseñadas para optimizar la operación de tu
            negocio con flotas, financiamiento preferencial y atención
            especializada.
          </p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex flex-wrap gap-4 items-center"
          >
            <motion.a
              href="#formulario"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-lg font-semibold text-lg shadow-xl shadow-red-600/30 transition-all"
            >
              Solicitar Asesoría
              <CheckCircle className="w-5 h-5" />
            </motion.a>

            <div className="flex items-center gap-2 text-blue-100">
              <Phone className="w-5 h-5" />
              <span className="text-sm">Respuesta en 24 horas</span>
            </div>
          </motion.div>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0">
        <svg
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
            fill="white"
          />
        </svg>
      </div>
    </section>
  );
}
