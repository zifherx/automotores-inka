"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";

import { CheckCircle, Wrench, ArrowLeft, User } from "lucide-react";

export function MainGracias() {
  const router = useRouter();
  const params = useParams();
  const [user, setUser] = useState("");

  useEffect(() => {
    if (params.customer) {
      setUser(params.customer.toString().replace(/-/g, " "));
    }
  }, [params]);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="w-20 h-20 mx-auto mb-6"
        >
          <CheckCircle className="w-full h-full text-green-500" />
        </motion.div>

        <h1 className="text-3xl font-bold text-center mb-4">¡Gracias!</h1>
        <p className="text-gray-600 text-center mb-6">
          Tu cita de servicio ha sido registrada con éxito.
        </p>

        <div className="flex items-center justify-center space-x-4 mb-6">
          <User className="w-6 h-6 text-blue-500" />
          <span className="text-lg font-semibold capitalize">{user}</span>
        </div>

        <div className="bg-gray-100 rounded-lg p-4 mb-6">
          <div className="flex items-center space-x-3 mb-2">
            <Wrench className="w-5 h-5 text-gray-500" />
            <span className="font-medium">Posibles servicios programados:</span>
          </div>
          <ul className="list-disc list-inside text-gray-600 pl-5">
            <li>Cambio de aceite</li>
            <li>Revisión de frenos</li>
            <li>Alineación y balanceo</li>
          </ul>
        </div>

        <motion.div
          className="w-full h-1 bg-gradient-to-r from-blue-500 to-green-500 rounded-full"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        />

        <p className="text-sm text-gray-500 text-center my-6">
          Te enviaremos un recordatorio 24 horas antes de tu cita.
        </p>

        <motion.div
          className="flex justify-center"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button
            variant="outline"
            className="group relative overflow-hidden"
            onClick={() => router.push("/")}
          >
            <span className="relative z-10 flex items-center transition-transform duration-300 group-hover:translate-x-1">
              <ArrowLeft className="w-4 h-4 mr-2 transition-transform duration-300 group-hover:-translate-x-1" />
              Volver al inicio
            </span>
            <span className="absolute inset-0 z-0 bg-gradient-to-r from-blue-500 to-green-500 opacity-0 transition-opacity duration-300 group-hover:opacity-20" />
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
}
