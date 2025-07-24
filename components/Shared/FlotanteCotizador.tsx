import { motion } from "framer-motion";
import Link from "next/link";

import { BadgeDollarSign } from "lucide-react";
import { FlotanteProp } from "@/types";

export function FlotanteCotizador({hovered, setHovered}: FlotanteProp) {

  return (
    <motion.div
        className="flex items-center mb-2"
        initial={{ x: "calc(100% - 64px)" }}
        animate={{ x: hovered === "steering" ? 0 : "calc(100% - 64px)" }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <motion.button
          className="bg-blueInka text-white p-4 rounded-l-full shadow-lg z-50 flex-shrink-0"
          onMouseEnter={() => setHovered("steering")}
        >
          <motion.div
            animate={{ rotate: hovered === "steering" ? -45 : 0 }}
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
  )
}
