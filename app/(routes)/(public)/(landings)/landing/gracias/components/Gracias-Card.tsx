import { ArrowRight, Car, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { CustomGraciasCard } from "@/types";

export function GraciasCard({
  cliente,
  documento,
  volverInicio,
}: CustomGraciasCard) {
  return (
    <Card className="border-none shadow-2xl overflow-hidden bg-white/80 backdrop-blur-sm">
      <CardContent className="p-0">
        {/* Header */}
        <div className="relative h-64 bg-[url(/images/gracias-handshake.jpg)] bg-cover overflow-hidden">
          <motion.div
            initial={{ scale: 1.2, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.2 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <Car className="w-64 h-64 text-white" />
          </motion.div>

          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              delay: 0.3,
              duration: 0.5,
              type: "spring",
              stiffness: 200,
            }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <div className="bg-white rounded-full p-4 shadow-lg">
              <CheckCircle2 className="w-16 h-16 text-green-500" />
            </div>
          </motion.div>
        </div>

        {/* Content */}
        <div className="p-8 md:p-10">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4 text-center">
              ¡Solicitud Recibida!
            </h1>

            <div className="bg-blue-50 rounded-lg p-4 mb-6 border-l-4 border-redInka">
              <p className="text-sm text-slate-600 mb-1">Cliente</p>
              <p className="font-semibold text-slate-800">{cliente}</p>
              <p className="text-sm text-slate-600 mt-2">Documento</p>
              <p className="font-semibold text-slate-800">{documento}</p>
            </div>

            <p className="text-slate-600 leading-relaxed text-center mb-8">
              Gracias por considerar a{" "}
              <span className="font-semibold text-blueInka">
                Automotores Inka Soluciones Corporativas
              </span>{" "}
              como su aliado en movilidad. Hemos recibido correctamente su
              información y uno de nuestros ejecutivos corporativos se pondrá en
              contacto con usted en breve para brindarle una asesoría
              especializada, adaptada a las necesidades de su empresa.
            </p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="flex flex-col items-center gap-3"
            >
              <div className="flex items-center gap-2 text-sm text-slate-500">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="w-4 h-4 border-2 border-redInka border-t-transparent rounded-full"
                />
                <span>Procesando su solicitud...</span>
              </div>

              <p className="text-xs text-slate-400 text-center max-w-md">
                Nuestro equipo está revisando su información para ofrecerle la
                mejor solución de movilidad corporativa
              </p>
            </motion.div>

            <div className="flex justify-center mt-6">
              <Button
                className="bg-gray-800 hover:bg-gray-700 text-white"
                onClick={volverInicio}
              >
                Volver al inicio
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </div>

            <div className="mt-6 flex space-x-4 p-2 justify-center">
              <div className="w-16 h-1 bg-gray-300 rounded-full"></div>
              <div className="w-16 h-1 bg-gray-500 rounded-full"></div>
              <div className="w-16 h-1 bg-gray-700 rounded-full"></div>
            </div>
          </motion.div>
        </div>
      </CardContent>
    </Card>
  );
}
