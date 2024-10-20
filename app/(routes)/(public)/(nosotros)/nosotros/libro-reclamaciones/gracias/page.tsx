"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, ArrowRight } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function ReclamoRegistrado() {
  const [showConfetti, setShowConfetti] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setShowConfetti(true);
    const timer = setTimeout(() => setShowConfetti(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-white shadow-xl">
        <CardHeader className="text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
          >
            <CheckCircle2 className="w-24 h-24 text-green-500 mx-auto mb-4" />
          </motion.div>
          <CardTitle className="text-2xl font-bold text-gray-800">
            ¡Registro Exitoso!
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center text-gray-600 mb-6">
            Tu reclamo ha sido registrado correctamente. Estaremos en contacto
            contigo a la brevedad posible luego de revisar tu caso.
          </p>
          <div className="relative">
            <div className="border-t border-gray-200 my-4"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="bg-white px-2 text-sm text-gray-500">
                Próximos pasos
              </span>
            </div>
          </div>
          <ul className="space-y-2 text-sm text-gray-600">
            <li className="flex items-center">
              <ArrowRight className="w-4 h-4 mr-2 text-blue-500" />
              Revisaremos detalladamente tu reclamo.
            </li>
            <li className="flex items-center">
              <ArrowRight className="w-4 h-4 mr-2 text-blue-500" />
              Te contactaremos por correo electrónico.
            </li>
            <li className="flex items-center">
              <ArrowRight className="w-4 h-4 mr-2 text-blue-500" />
              La copia de tu reclamo llegará a tu correo electrónico.
            </li>
            <li className="flex items-center">
              <ArrowRight className="w-4 h-4 mr-2 text-blue-500" />
              Resolveremos tu caso lo antes posible.
            </li>
          </ul>
        </CardContent>
        <CardFooter className="items-center justify-center">
          <Button onClick={() => router.push("/")}>Ir al Home</Button>
        </CardFooter>
      </Card>
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none">
          {[...Array(50)].map((_, index) => (
            <motion.div
              key={index}
              className="absolute w-2 h-2 bg-blue-500 rounded-full"
              initial={{
                x: Math.random() * window.innerWidth,
                y: -10,
                opacity: 1,
              }}
              animate={{
                y: window.innerHeight + 10,
                opacity: 0,
              }}
              transition={{
                duration: Math.random() * 2 + 1,
                repeat: Infinity,
                repeatType: "loop",
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
