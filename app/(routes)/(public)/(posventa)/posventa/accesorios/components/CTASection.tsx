"use client";

import { motion } from "framer-motion";
import { Calendar, FileText, MapPin, Phone } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ContactForm } from "./ContactForm";

export function CTASection() {
  const handleSubmit = async (values: any) => {
    console.log(values);
  };

  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="py-16 relative overflow-hidden"
    >
      {/* Background with gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-700 to-redInka z-0" />

      {/* Animated shapes */}
      <motion.div
        animate={{ rotate: 360, scale: [1, 1.1, 1] }}
        transition={{
          duration: 20,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        }}
        className="absolute top-20 right-20 w-64 h-64 rounded-full bg-redInka blur-3xl z-0"
      />

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left side - Contact Form */}
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl p-8 shadow-xl"
          >
            <ContactForm />
          </motion.div>

          {/* Right side - Contact Info */}
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="text-white"
          >
            <h3 className="text-3xl font-bold mb-6">Contacto Directo</h3>
            <p className="text-xl mb-8 max-w-md">
              También puedes contactarnos directamente a través de estos
              canales:
            </p>

            <div className="space-y-6">
              <motion.div
                whileHover={{ x: 5 }}
                className="flex items-start space-x-4"
              >
                <div className="bg-white/10 p-3 rounded-lg">
                  <Phone className="w-6 h-6 text-red-400" />
                </div>
                <div>
                  <h4 className="font-semibold text-lg">WhatsApp</h4>
                  <p className="text-slate-300 mb-2">Respuesta inmediata</p>
                  <Button
                    variant="ghost"
                    className="border border-white/30 text-white hover:bg-white/20"
                  >
                    +51 999 999 999
                  </Button>
                </div>
              </motion.div>

              <motion.div
                whileHover={{ x: 5 }}
                className="flex items-start space-x-4"
              >
                <div className="bg-white/10 p-3 rounded-lg">
                  <Calendar className="w-6 h-6 text-red-400" />
                </div>
                <div>
                  <h4 className="font-semibold text-lg">Horario de Atención</h4>
                  <p className="text-slate-300">Lunes a Viernes: 9am - 6pm</p>
                  <p className="text-slate-300">Sábados: 9am - 1pm</p>
                </div>
              </motion.div>

              <motion.div
                whileHover={{ x: 5 }}
                className="flex items-start space-x-4"
              >
                <div className="bg-white/10 p-3 rounded-lg">
                  <MapPin className="w-6 h-6 text-red-400" />
                </div>
                <div>
                  <h4 className="font-semibold text-lg">Ubicación</h4>
                  <p className="text-slate-300">Av. Principal 123, Lima</p>
                  <p className="text-slate-300">Perú</p>
                </div>
              </motion.div>

              <motion.div
                whileHover={{ x: 5 }}
                className="flex items-start space-x-4"
              >
                <div className="bg-white/10 p-3 rounded-lg">
                  <FileText className="w-6 h-6 text-red-400" />
                </div>
                <div>
                  <h4 className="font-semibold text-lg">Catálogo PDF</h4>
                  <p className="text-slate-300 mb-2">
                    Descarga nuestro catálogo completo
                  </p>
                  <Button className="bg-red-600 hover:bg-red-700">
                    Descargar Catálogo
                  </Button>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
