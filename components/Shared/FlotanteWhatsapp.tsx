import Link from "next/link";
import { motion } from "framer-motion";

import { FaWhatsapp } from "react-icons/fa";
import { FlotanteProp } from "@/types";

export function FlotanteWhatsapp({hovered, setHovered}: FlotanteProp) {
    const urlWhatsapp = "https://wa.link/17o4p4";
  return (
    <motion.div
        className="flex items-center"
        initial={{ x: "calc(100% - 64px)" }}
        animate={{ x: hovered === "whatsapp" ? 0 : "calc(100% - 64px)" }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <motion.button
          className="bg-blueInka text-white p-4 rounded-l-full shadow-lg z-50 flex-shrink-0"
          onMouseEnter={() => setHovered("whatsapp")}
        >
          <motion.div
            animate={{ rotate: hovered === "whatsapp" ? -15 : 0 }}
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
  )
}
