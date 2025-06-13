"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import {
  ArrowRight,
  Bell,
  Car,
  CheckCircle,
  Clock,
  Cog,
  Mail,
  Settings,
  Shield,
  Sparkles,
  Wrench,
  Zap,
} from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useBrands } from "@/context/brands/marcaContext";
import Image from "next/image";

const marcasDisponibles = [
  "GWM",
  "JAC",
  "Mazda",
  "Renault",
  "DFSK",
  "Subaru",
  "Hyundai",
  "Geely",
  "JMC",
  "Changan",
  "Suzuki",
  "Haval",
  "Mitsubishi",
  "Fuso",
  "Volkswagen",
];

const categoriasAccesorios = [
  {
    nombre: "Filtros",
    icono: Settings,
    descripcion: "Filtros de aire, aceite y combustible originales",
    cantidad: "150+ productos",
  },
  {
    nombre: "Frenos",
    icono: Shield,
    descripcion: "Pastillas, discos y sistemas de frenado",
    cantidad: "80+ productos",
  },
  {
    nombre: "Motor",
    icono: Cog,
    descripcion: "Repuestos y accesorios para motor",
    cantidad: "200+ productos",
  },
  {
    nombre: "Eléctricos",
    icono: Zap,
    descripcion: "Componentes eléctricos y electrónicos",
    cantidad: "120+ productos",
  },
];

export function EnMantenimientoView() {
  const { brands } = useBrands();
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 75) return 75;
        return prev + 1;
      });
    }, 100);

    return () => clearInterval(timer);
  }, []);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setEmail("");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative bg-gradient-to-r from-orange-600 via-blue-700 to-slate-900 text-white py-20 overflow-hidden"
      >
        <div className="absolute inset-0 bg-black/20"></div>

        {/* Elementos decorativos animados */}
        <motion.div
          animate={{
            rotate: 360,
            scale: [1, 1.1, 1],
          }}
          transition={{
            rotate: {
              duration: 20,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            },
            scale: {
              duration: 4,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            },
          }}
          className="absolute top-10 right-10 opacity-10"
        >
          <Settings className="w-32 h-32" />
        </motion.div>

        <motion.div
          animate={{
            rotate: -360,
            y: [0, -20, 0],
          }}
          transition={{
            rotate: {
              duration: 25,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            },
            y: {
              duration: 3,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            },
          }}
          className="absolute bottom-10 left-10 opacity-10"
        >
          <Cog className="w-24 h-24" />
        </motion.div>

        <div className="relative container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8, type: "spring" }}
              className="mb-8"
            >
              <div className="relative">
                <Wrench className="w-20 h-20 mx-auto mb-4 text-orange-300" />
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                  className="absolute -top-2 -right-2"
                >
                  <Sparkles className="w-8 h-8 text-yellow-300" />
                </motion.div>
              </div>
            </motion.div>

            <motion.h1
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-4xl md:text-6xl font-bold mb-6"
            >
              Accesorios Originales
            </motion.h1>

            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="mb-8"
            >
              <Badge className="bg-orange-500/90 text-white text-lg px-6 py-2 mb-4">
                🚧 Página en Construcción
              </Badge>
              <p className="text-xl md:text-2xl text-blue-100">
                Estamos preparando el catálogo más completo de repuestos y
                accesorios originales
              </p>
            </motion.div>

            {/* Barra de progreso */}
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="max-w-md mx-auto mb-8"
            >
              <div className="flex justify-between text-sm mb-2">
                <span>Progreso del desarrollo</span>
                <span>{progress}%</span>
              </div>
              <Progress value={progress} className="h-3 bg-white/20" />
            </motion.div>

            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="flex flex-wrap justify-center gap-4 text-sm md:text-base"
            >
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm">
                <CheckCircle className="w-5 h-5 text-green-300" />
                <span>Catálogo Digital</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm">
                <Clock className="w-5 h-5 text-yellow-300" />
                <span>Sistema de Precios</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm">
                <Settings className="w-5 h-5 text-blue-300" />
                <span>Filtros Avanzados</span>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Marcas Disponibles */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="py-16 bg-white"
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <motion.h2
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="text-3xl md:text-4xl font-bold text-gray-800 mb-4"
            >
              Marcas Disponibles
            </motion.h2>
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.6 }}
              className="text-lg text-gray-600"
            >
              Accesorios originales para las principales marcas automotrices
            </motion.p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-4 md:grid-cols-8 gap-6 mb-8">
            {brands.map(({ _id, name, imageUrl }, index) => (
              <motion.div
                key={_id}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05, duration: 0.4 }}
                whileHover={{ scale: 1.15, y: -2 }}
                viewport={{ once: true }}
              >
                <Image
                  src={imageUrl}
                  alt={name}
                  width={200}
                  height={120}
                  priority
                />
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Categorías de Accesorios */}
      <section className="py-16 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Categorías de Productos
            </h2>
            <p className="text-lg text-gray-600">
              Explora las categorías que estarán disponibles próximamente
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categoriasAccesorios.map((categoria, index) => (
              <motion.div
                key={categoria.nombre}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                viewport={{ once: true }}
              >
                <Card className="h-full hover:shadow-lg transition-all duration-300 border-0 shadow-md bg-white group">
                  <CardHeader className="text-center pb-4">
                    <motion.div
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                      className="mx-auto mb-4 p-3 bg-gradient-to-br from-blueDarkInka to-blueInka rounded-full w-fit"
                    >
                      <categoria.icono className="w-8 h-8 text-white" />
                    </motion.div>
                    <CardTitle className="text-xl font-bold text-gray-800">
                      {categoria.nombre}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p className="text-gray-600 mb-4">
                      {categoria.descripcion}
                    </p>
                    <Badge
                      variant="secondary"
                      className="group-hover:bg-blueInka group-hover:text-white transition-colors"
                    >
                      {categoria.cantidad}
                    </Badge>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Subscription */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="py-16 bg-gradient-to-r from-blueDarkInka to-blueInka text-white"
      >
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="mb-8"
            >
              <Bell className="w-16 h-16 mx-auto mb-4 text-white" />
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                ¡Sé el primero en saberlo!
              </h2>
              <p className="text-xl text-blue-100">
                Regístrate para recibir notificaciones cuando lancemos nuestro
                catálogo completo
              </p>
            </motion.div>

            {!isSubscribed ? (
              <motion.form
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                onSubmit={handleSubscribe}
                className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
              >
                <Input
                  type="email"
                  placeholder="Tu correo electrónico"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="flex-1 bg-white/10 border-white/20 text-white placeholder:text-white/70 focus:bg-white/20"
                />
                <Button
                  type="submit"
                  className="bg-redDarkInka hover:bg-redInka text-white px-8 transition-all duration-300 transform hover:scale-105 font-medium"
                >
                  <Mail className="w-4 h-4 mr-2" />
                  Notificarme
                </Button>
              </motion.form>
            ) : (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="bg-green-500/20 border border-green-300/30 rounded-lg p-6 max-w-md mx-auto"
              >
                <CheckCircle className="w-12 h-12 mx-auto mb-4 text-green-300" />
                <h3 className="text-xl font-semibold mb-2">
                  ¡Gracias por suscribirte!
                </h3>
                <p className="text-green-100">
                  Te notificaremos cuando esté listo nuestro catálogo.
                </p>
              </motion.div>
            )}
          </div>
        </div>
      </motion.section>

      {/* Información de Contacto */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
              ¿Necesitas accesorios ahora?
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Mientras preparamos nuestro catálogo digital, puedes contactar
              directamente con nuestros talleres autorizados para consultar
              disponibilidad de accesorios específicos.
            </p>
            <Button
              className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-3 text-lg transition-all duration-300 transform hover:scale-105"
              onClick={() => (window.location.href = "/posventa/talleres")}
            >
              Ver Talleres Autorizados
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
