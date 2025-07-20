"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { User } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { SectionHeader } from "@/components/Shared/SectionHeader";
import { CustomFormField } from "@/components/Shared/CustomFormField";

import { ConsumerSectionProp } from "@/types";
import { listDepartamentos } from "@/data";
import { tDepartamento } from "@/interfaces";
import { getDocumentMaxLength } from "@/lib";
import { watch } from "fs";

export function ConsumerSection({
  errors,
  numeroDocumentoDisabled,
  register,
  setValue,
  watch,
}: ConsumerSectionProp) {
  const [departamentoSeleccionado, setDepartamentoSeleccionado] =
    useState<tDepartamento | null>(null);

  const tipoDocumentoWatch = watch("tipoDocumento");

  return (
    <motion.section
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
        <SectionHeader
          icon={User}
          title="1. Identificación del Consumidor Reclamante"
          BgColor="bg-gradient-to-r from-blue-100 to-indigo-100"
          iconBgColor="bg-blue-100"
          iconColor="text-blueInka"
        />
        <CardContent className="p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <CustomFormField
              label="Tipo de Documento"
              required
              error={errors.tipoDocumento?.message}
            >
              <Select
                onValueChange={(value) => setValue("tipoDocumento", value)}
              >
                <SelectTrigger className="h-12 border-gray-200 focus:border-blueInka">
                  <SelectValue placeholder="Selecciona un tipo de documento" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="dni">
                    DNI - Documento Nacional de Identidad
                  </SelectItem>
                  <SelectItem value="ce">CE - Carnet de Extranjería</SelectItem>
                  <SelectItem value="pasaporte">Pasaporte</SelectItem>
                  <SelectItem value="ruc">
                    RUC - Registro Único de Contribuyentes
                  </SelectItem>
                </SelectContent>
              </Select>
            </CustomFormField>

            <CustomFormField
              label="Número de Documento"
              required
              error={errors.numeroDocumento?.message}
            >
              <Input
                {...register("numeroDocumento")}
                disabled={numeroDocumentoDisabled}
                placeholder="Ingresa tu número de documento"
                maxLength={getDocumentMaxLength(tipoDocumentoWatch)}
                className={`h-12 ${
                  numeroDocumentoDisabled
                    ? "bg-gray-50 text-gray-400"
                    : "border-gray-200 focus:border-blueInka"
                }`}
              />
            </CustomFormField>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <CustomFormField
              label="Nombres"
              required
              error={errors.nombres?.message}
            >
              <Input
                {...register("nombres")}
                placeholder="Ingresa tus nombres completos"
                className="h-12 border-gray-200 focus:border-blueInka"
              />
            </CustomFormField>

            <CustomFormField
              label="Apellidos"
              required
              error={errors.apellidos?.message}
            >
              <Input
                {...register("apellidos")}
                placeholder="Ingresa tus apellidos completos"
                className="h-12 border-gray-200 focus:border-blueInka"
              />
            </CustomFormField>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <CustomFormField
              label="Correo Electrónico"
              optional
              error={errors.email?.message}
            >
              <Input
                {...register("email")}
                type="email"
                placeholder="ejemplo@dominio.com"
                className="h-12 border-gray-200 focus:border-blueInka"
              />
            </CustomFormField>

            <CustomFormField
              label="Celular"
              optional
              error={errors.celular?.message}
            >
              <Input
                {...register("celular")}
                placeholder="999 666 000"
                maxLength={9}
                className="h-12 border-gray-200 focus:border-blueInka"
              />
            </CustomFormField>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <CustomFormField label="Departamento">
              <Select
                onValueChange={(value) => {
                  setValue("departamento", value);
                  const d = listDepartamentos.find(
                    (departamento) => departamento.value === value
                  );
                  setDepartamentoSeleccionado(d || null);
                }}
              >
                <SelectTrigger className="h-12 border-gray-200 focus:border-blueInka">
                  <SelectValue placeholder="Selecciona un departamento" />
                </SelectTrigger>
                <SelectContent>
                  {listDepartamentos.map(({ id, name, value }) => (
                    <SelectItem key={id} value={value}>
                      {name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </CustomFormField>

            <CustomFormField label="Provincia">
              <Select
                onValueChange={(value) => setValue("provincia", value)}
                disabled={departamentoSeleccionado === null}
              >
                <SelectTrigger className="h-12 border-gray-200 focus:border-blueInka">
                  <SelectValue placeholder="Selecciona una provincia" />
                </SelectTrigger>
                <SelectContent>
                  {departamentoSeleccionado?.provincias.map(
                    ({ id, name, value }) => (
                      <SelectItem key={id} value={value}>
                        {name}
                      </SelectItem>
                    )
                  )}
                </SelectContent>
              </Select>
            </CustomFormField>

            <CustomFormField label="Distrito">
              <Input
                {...register("distrito")}
                placeholder="Escribe tu distrito"
                className="h-12 border-gray-200 focus:border-blueInka"
              />
            </CustomFormField>
          </div>

          <CustomFormField
            label="Dirección Completa"
            required
            error={errors.direccion?.message}
          >
            <Textarea
              {...register("direccion")}
              placeholder="Av./Jr./Calle, N°, Urb., Referencia"
              className="h-12 border-gray-200 focus:border-blueInka"
            />
          </CustomFormField>
        </CardContent>
      </Card>
    </motion.section>
  );
}
