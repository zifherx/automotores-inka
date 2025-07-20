"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Scale, Shield } from "lucide-react";
import axios from "axios";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

import { FormHeaderProp } from "@/types";
import { InputTextData } from "@/data";
import { createNumeroDeReclamo } from "@/lib";

export function FormHeader({
  razonSocial,
  fecha,
  hora,
  codigoReclamo,
  setCodigoReclamo,
  codexReclamo,
}: FormHeaderProp) {
  const [numeroReclamo, setNumeroReclamo] = useState(0);

  const getNumeroReclamo = async () => {
    const query = await axios.get(`/api/reclamo/last`);
    if (query.status === 200) {
      const ultimoReclamo = query.data[0].numeroReclamo.split("-")[2];
      const numReclamo = Number(ultimoReclamo);
      setNumeroReclamo(numReclamo);
    }
  };

  useEffect(() => {
    getNumeroReclamo();
    setCodigoReclamo(
      createNumeroDeReclamo(
        razonSocial.ruta,
        fecha,
        numeroReclamo,
        codexReclamo
      )
    );
  }, [razonSocial, numeroReclamo, setCodigoReclamo, fecha, codexReclamo]);

  const newValues = [fecha, hora, codigoReclamo];
  const newArrayHeader = InputTextData.map((item, index) => {
    return { ...item, value: newValues[index] as string };
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="mb-8"
    >
      <Card className="border-0 shadow-lg bg-gradient-to-r from-blueDarkInka to-blueInka text-white overflow-hidden">
        <CardContent className="p-8">
          <div className="flex flex-col md:flex-row items-center justify-between mb-6 gap-4 md:gap-0">
            <div className="flex items-center space-x-4">
              <div className="bg-white/20 p-3 rounded-full">
                <Scale className="w-8 h-8" strokeWidth={2} />
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-headBold tracking-tight">
                  Libro de Reclamaciones Digital
                </h1>
                <p className="text-white text-sm md:text-lg font-medium">
                  {razonSocial.name}
                </p>
              </div>
            </div>
            <Badge
              variant="secondary"
              className="w-full md:w-fit justify-center bg-white/20 text-white border-white/30 px-4 py-2 hover:bg-white/20"
            >
              <Shield className="h-5 w-5 mr-2" strokeWidth={2} />
              Protegido por INDECOPI
            </Badge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-8 gap-6">
            {newArrayHeader.map(({ id, icon: Icon, label, value }) => (
              <div
                key={id}
                className={`flex items-center space-x-3 bg-white/10 rounded-lg p-4 
                  ${id === 1 ? "col-span-2" : ""}
                  ${id === 2 ? "col-span-2" : ""}
                  ${id === 3 ? "col-span-4" : ""}`}
              >
                <Icon className="h-5 w-5 text-white" strokeWidth={2} />
                <div>
                  <p className="text-blue-200 text-sm font-headBold">{label}</p>
                  <p className="text-white font-semibold uppercase">{value}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 p-4 bg-white/10 rounded-lg">
            <p className="text-white text-sm leading-relaxed">
              Conforme a lo establecido en el Código de Protección y Defensa del
              Consumidor (Ley N° 29571), esta institución cuenta con un libro de
              reclamaciones a su dispocisión para garantizar sus derechos como
              consumidor.
            </p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
