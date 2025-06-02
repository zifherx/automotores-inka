"use client";

import Link from "next/link";
import { motion } from "framer-motion";

import { Car, Clock, MapPin, Wrench } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

import { CardTallerProp } from "@/types";
import { createWhatsAppLinkForTallerContact } from "@/lib";

export function CardTaller({ taller }: CardTallerProp) {
  const { nombre, direccion, ciudad, horarios, marcas, telefono, imageSource } =
    taller;

  return (
    <Card className="h-full shadow-lg hover:shadow-2xl bg-white transition-all duration-500 border-0 overflow-hidden">
      {/* Imagen del taller */}
      <div className="relative h-48 overflow-hidden">
        <motion.img
          src={imageSource}
          alt={`Taller automotriz - ${nombre}`}
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.6 }}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileHover={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="absolute bottom-4 left-4 right-4"
        >
          <Badge className="bg-blueDarkInka text-white border-0 blur-sm">
            {ciudad}
          </Badge>
        </motion.div>
      </div>

      {/* Header con nombre */}
      <CardHeader className="bg-gradient-to-r from-blueInka/85 to-blueInka text-white">
        <CardTitle className="flex items-center gap-3 text-xl">
          <Wrench className="w-6 h-6" />
          Taller {nombre}
        </CardTitle>
      </CardHeader>

      <CardContent className="p-6 space-y-6">
        {/* Ubicación */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="space-y-2"
        >
          <div className="flex items-center gap-2 text-blueInka font-semibold">
            <MapPin className="w-5 h-5" />
            <span>Ubicación</span>
          </div>
          <p className="text-gray-700 ml-7 leading-relaxed">{direccion}</p>
        </motion.div>

        {/* Horarios */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="space-y-2"
        >
          <div className="flex items-center gap-2 text-blueInka font-semibold">
            <Clock className="w-5 h-5" />
            <span>Horarios de Atención</span>
          </div>
          <div className="ml-7 space-y-1 text-gray-700">
            <p className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              {horarios.semana}
            </p>
            <p className="flex items-center gap-2">
              <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
              {horarios.sabado}
            </p>
          </div>
        </motion.div>

        {/* Marcas */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="space-y-3"
        >
          <div className="flex items-center gap-2 text-blueInka font-semibold">
            <Car className="w-5 h-5" />
            <span>Marcas Autorizadas</span>
          </div>
          {/* <div className="ml-7 flex flex-wrap gap-2"> */}
          <div className="ml-7 grid grid-cols-6 gap-2">
            {marcas.map(({ id, imageSource, title }) => (
              <Avatar key={id}>
                <AvatarImage src={imageSource} />
                <AvatarFallback>{title}</AvatarFallback>
              </Avatar>
            ))}
          </div>
        </motion.div>

        {/* Contacto */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="pt-4 border-t"
        >
          <Button
            className="w-full bg-gradient-to-r from-blueInka/65 to-blueDarkInka/65 hover:from-blueInka hover:to-blueInka text-md font-semibold transition-all duration-300"
            asChild
          >
            <Link
              href={createWhatsAppLinkForTallerContact(taller)}
              target="_blank"
            >
              <FaWhatsapp className="h-6 w-6" strokeWidth={2} />
              Contacta al taller {nombre}
            </Link>
          </Button>
        </motion.div>
      </CardContent>
    </Card>
  );
}
