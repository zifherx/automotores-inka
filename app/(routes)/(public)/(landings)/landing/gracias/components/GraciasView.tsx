"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";

import { GraciasCard } from "./Gracias-Card";

export function GraciasView() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const cliente = searchParams.get("cliente");
  const documento = searchParams.get("documento");

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-2xl"
      >
        <GraciasCard
          cliente={cliente ? cliente : ""}
          documento={documento ? documento : ""}
          volverInicio={() => router.push("/")}
        />
      </motion.div>
    </div>
  );
}
