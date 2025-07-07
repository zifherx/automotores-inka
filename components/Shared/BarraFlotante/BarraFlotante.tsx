"use client";

import { useState } from "react";
import { motion } from "framer-motion";

import { FaWhatsapp } from "react-icons/fa";
import { BadgeDollarSign } from "lucide-react";
import Link from "next/link";

export function BarraFlotante() {
  const [hoveredBtn, setHoveredBtn] = useState<string | null>(null);

  const urlWhatsapp = "https://wa.link/17o4p4";

  return (
    <div
      className="fixed top-1/2 right-0 transform -translate-y-1/2 flex flex-col items-end overflow-hidden"
      onMouseLeave={() => setHoveredBtn(null)}
    >
      <motion.div
        className="flex items-center mb-2"
        initial={{ x: "calc(100% - 64px)" }}
        animate={{ x: hoveredBtn === "steering" ? 0 : "calc(100% - 64px)" }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <motion.button
          className="bg-blueInka text-white p-4 rounded-l-full shadow-lg z-50 flex-shrink-0"
          onMouseEnter={() => setHoveredBtn("steering")}
        >
          <motion.div
            animate={{ rotate: hoveredBtn === "steering" ? -45 : 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
          >
            <BadgeDollarSign className="w-8 h-8" />
          </motion.div>
        </motion.button>
        <Link
          className="bg-blueInka text-white py-4 px-6 h-16 flex items-center shadow-lg cursor-pointer"
          href="/steps-cotizacion"
        >
          <span className="whitespace-nowrap text-lg font-semibold">
            ¡Cotiza tu unidad ya!
          </span>
        </Link>
      </motion.div>

      <motion.div
        className="flex items-center"
        initial={{ x: "calc(100% - 64px)" }}
        animate={{ x: hoveredBtn === "whatsapp" ? 0 : "calc(100% - 64px)" }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <motion.button
          className="bg-blueInka text-white p-4 rounded-l-full shadow-lg z-50 flex-shrink-0"
          onMouseEnter={() => setHoveredBtn("whatsapp")}
        >
          <motion.div
            animate={{ rotate: hoveredBtn === "whatsapp" ? -15 : 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
          >
            <FaWhatsapp className="w-8 h-8" />
          </motion.div>
        </motion.button>
        <Link
          className="bg-blueInka text-white py-4 px-6 h-16 flex items-center shadow-lg cursor-pointer"
          href={urlWhatsapp}
          target="_blank"
        >
          <span className="whitespace-nowrap text-lg font-semibold">
            ¡Compra tu unidad ya!
          </span>
        </Link>
      </motion.div>
    </div>
  );
}
