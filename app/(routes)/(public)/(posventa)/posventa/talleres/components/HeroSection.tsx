"use client";

import { motion } from "framer-motion";
import { Wrench } from "lucide-react";

import { IconText } from "@/components/Shared/IconText";

import { IconTextTalleresData } from "@/data";

export function HeroSection() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="relative bg-gradient-to-r from-blueInka via-blueDarkInka to-blueInka text-white py-20"
    >
      <div className="absolute inset-0 bg-black/20"></div>
      <div className="relative max-w-7xl mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mb-6"
          >
            <Wrench className="w-16 h-16 mx-auto mb-4 text-white" />
          </motion.div>
          <motion.h1
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-4xl md:text-6xl font-bold mb-6"
          >
            Talleres Autorizados
          </motion.h1>
          <motion.p
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-xl md:text-2xl text-blue-100 mb-8"
          >
            Servicio técnico especializado para tu vehículo
          </motion.p>
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="flex flex-wrap justify-center gap-4 text-sm md:text-base"
          >
            {IconTextTalleresData.map(({ icon, id, text }) => (
              <IconText key={id} icon={icon} id={id} text={text} />
            ))}
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
