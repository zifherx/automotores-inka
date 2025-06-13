"use client";

import { useState } from "react";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronRight, Gauge, PenTool, Search, Shield } from "lucide-react";

export function HeroSection() {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Scroll to products section
    const productsSection = document.getElementById("products-section");
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative overflow-hidden">
      {/* Background with gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-800/90 to-red-900/90 z-10" />

      {/* Background image */}
      <div className="absolute inset-0">
        {/* <div className="absolute inset-0 bg-[url('https://placehold.co/1920x1080')] bg-cover bg-center" /> */}
      </div>

      {/* Animated shapes */}
      <motion.div
        animate={{
          rotate: 360,
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 20,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        }}
        className="absolute top-20 right-20 w-64 h-64 rounded-full bg-red-600/20 blur-3xl z-0"
      />

      <motion.div
        animate={{
          rotate: -360,
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 15,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        }}
        className="absolute bottom-20 left-20 w-80 h-80 rounded-full bg-blue-600/10 blur-3xl z-0"
      />

      <div className="max-w-7xl mx-auto px-4 py-24 md:py-32 relative z-20">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-block mb-4"
            >
              <span className="bg-redInka text-white px-4 py-1 rounded-full text-sm font-medium">
                ACCESORIOS PREMIUM
              </span>
            </motion.div>

            <motion.h1
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-4xl md:text-6xl font-bold mb-6 text-white leading-tight"
            >
              Potencia y Estilo para <br />
              <span className="text-redDarkInka">Tu Vehículo</span>
            </motion.h1>

            <motion.p
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="text-xl text-slate-200 mb-10 max-w-2xl mx-auto"
            >
              Descubre nuestra colección de accesorios y repuestos automotrices
              de alta calidad. Encuentra exactamente lo que necesitas con
              nuestros filtros especializados.
            </motion.p>
          </motion.div>

          {/* Search bar */}
          <motion.form
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="max-w-2xl mx-auto mb-12 relative"
            onSubmit={handleSearch}
          >
            <Input
              type="text"
              placeholder="Busca por nombre, marca o categoría..."
              className="h-14 pl-12 pr-32 rounded-full text-lg shadow-lg bg-white"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
            <Button
              type="submit"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 rounded-full h-10 bg-red-600 hover:bg-red-700"
            >
              Buscar
            </Button>
          </motion.form>

          {/* Feature boxes */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1, duration: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {[
              {
                icon: <Gauge className="w-8 h-8 text-red-500" />,
                title: "Rendimiento Superior",
                description:
                  "Accesorios diseñados para optimizar el rendimiento de tu vehículo",
              },
              {
                icon: <Shield className="w-8 h-8 text-red-500" />,
                title: "Calidad Garantizada",
                description:
                  "Todos nuestros productos cuentan con garantía de calidad",
              },
              {
                icon: <PenTool className="w-8 h-8 text-red-500" />,
                title: "Instalación Profesional",
                description:
                  "Servicio de instalación por técnicos certificados",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20"
              >
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-slate-300 text-sm">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.6 }}
            className="text-center mt-12"
          >
            <Button
              size="lg"
              className="bg-red-600 hover:bg-red-700 text-lg px-8 py-6 rounded-full group"
              onClick={() =>
                document
                  .getElementById("featured-products")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              Ver Productos Destacados
              <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
