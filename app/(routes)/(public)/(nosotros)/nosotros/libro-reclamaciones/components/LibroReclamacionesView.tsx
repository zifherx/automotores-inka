"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Car, Scale } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Title } from "@/components/Shared/Title";

import { listRSReclamos } from "@/data";

export function LibroReclamacionesView() {
  const getIcon = (id: number) => {
    return id === 1 ? (
      <Car className="w-12 h-12" />
    ) : (
      <Scale className="w-12 h-12" />
    );
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <Title
            title="Libro de Reclamaciones Digital"
            className="uppercase text-4xl font-headMedium mb-4"
          />
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Revisa tu comprobante de pago y selecciona la razón social para
            ingresar tu reclamo.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {listRSReclamos.map(({ id, name, ruta }) => (
            <motion.div
              key={id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: id * 0.2 }}
            >
              <Card className="h-full hover:shadow-xl transition-all duration-300 cursor-pointer group">
                <CardHeader className="text-center pb-4">
                  <div className="flex justify-center mb-4 text-blueInka group-hover:text-blueDarkInka transition-colors">
                    {getIcon(id)}
                  </div>
                  <CardTitle className="text-xl font-semibold text-gray-900 leading-tight">
                    {name}
                  </CardTitle>
                  <CardDescription className="text-gray-600">
                    Haz click para proceder con tu reclamo
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <Button
                    asChild
                    size="lg"
                    className="w-full bg-blueInka hover:bg-redInka text-white text-xl font-headMedium transition-colors"
                  >
                    <Link href={`/nosotros/libro-reclamaciones/${ruta}`}>
                      Seleccionar
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-12 text-center"
        >
          <p className="text-sm text-gray-500 max-w-3xl mx-auto">
            Conforme a lo establecido en el Código de Protección y Defensa del
            Consumidor, esta institución cuenta con un libro de reclamaciones a
            su dispocisión.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
