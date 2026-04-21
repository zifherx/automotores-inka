"use client";

import { motion } from "framer-motion";
import { ShoppingCart } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

import { CustomFormField } from "@/components/Shared/CustomFormField";
import { SectionHeader } from "@/components/Shared/SectionHeader";

import { useSucursales } from "@/context/sucursal/sucursalContext";

import { ProductSectionProp } from "@/types";
import { useMemo } from "react";
import { CharacterCounter } from "./CharacterCounter";

export function ProductSection({
  errors,
  register,
  setValue,
  watch,
  setSedeSelected,
}: ProductSectionProp) {
  const { sucursales } = useSucursales();
  const descripcionBienWatch = watch("descripcionBien") || "";

  const activeSucursales = sucursales.filter((s) => s.isActive);

  const grouped = useMemo(
    () =>
      activeSucursales.reduce<Record<string, typeof sucursales>>(
        (acc, sucursal) => {
          const ciudad = sucursal.ciudad;
          if (!acc[ciudad]) acc[ciudad] = [];
          acc[ciudad].push(sucursal);
          return acc;
        },
        {},
      ),
    [activeSucursales],
  );

  return (
    <motion.section
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
    >
      <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
        <SectionHeader
          icon={ShoppingCart}
          title="2. Identificación del Bien Contratado"
          BgColor="bg-gradient-to-r from-green-100 to-emerald-100"
          iconBgColor="bg-green-100"
          iconColor="text-green-600"
        />

        <CardContent className="p-8 space-y-6">
          <div className="space-y-4">
            <Label className="text-sm font-semibold text-gray-700">
              Tipo de Bien
            </Label>
            <RadioGroup
              onValueChange={(value) => setValue("tipoBien", value)}
              className="flex gap-8"
            >
              <div className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <RadioGroupItem value="producto" id="producto" />
                <Label
                  htmlFor="producto"
                  className="font-medium cursor-pointer"
                >
                  Producto
                </Label>
              </div>
              <div className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <RadioGroupItem value="servicio" id="servicio" />
                <Label
                  htmlFor="servicio"
                  className="font-medium cursor-pointer"
                >
                  Servicio
                </Label>
              </div>
            </RadioGroup>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <CustomFormField label="VIN">
              <Input
                {...register("vin")}
                placeholder="N° VIN del vehículo"
                className="h-12 border-gray-200 focus:border-blueInka"
              />
            </CustomFormField>

            <CustomFormField label="Placa">
              <Input
                {...register("placa")}
                placeholder="ABC-123"
                className="h-12 border-gray-200 focus:border-blueInka"
              />
            </CustomFormField>

            <CustomFormField label="Sede de Compra">
              <Select
                onValueChange={(value) => {
                  setValue("sedeCompra", value);
                  if (value)
                    setSedeSelected(
                      sucursales.find((sede) => sede.codexHR === value),
                    );
                }}
              >
                <SelectTrigger className="h-12 border-gray-200 focus:border-blueInka">
                  <SelectValue placeholder="Selecciona una sede" />
                </SelectTrigger>
                <SelectContent>
                  {sucursales.length > 0 &&
                    Object.entries(grouped).map(([ciudad, items]) => (
                      <SelectGroup key={ciudad}>
                        <SelectLabel className="font-bold font-headMedium text-blueDarkInka">
                          {ciudad}
                        </SelectLabel>
                        {items.map((sede) => (
                          <SelectItem key={sede._id} value={sede.codexHR}>
                            <div className="flex flex-col items-start">
                              <span className="text-sm font-headLight font-semibold">
                                {sede.name}
                              </span>
                              <span className="text-xs font-textRegular">
                                {sede.address}
                              </span>
                            </div>
                          </SelectItem>
                        ))}
                        <SelectSeparator />
                      </SelectGroup>
                    ))}
                </SelectContent>
              </Select>
            </CustomFormField>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <CustomFormField label="Moneda">
              <Select onValueChange={(value) => setValue("moneda", value)}>
                <SelectTrigger className="h-12 border-gray-200 focus:border-blueInka">
                  <SelectValue placeholder="Selecciona una moneda" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pen">🇵🇪 Soles Peruanos (PEN)</SelectItem>
                  <SelectItem value="usd">
                    🇺🇸 Dólares Americanos (USD)
                  </SelectItem>
                </SelectContent>
              </Select>
            </CustomFormField>

            <CustomFormField label="Monto Reclamado">
              <Input
                type="number"
                {...register("importeBien", { valueAsNumber: true })}
                placeholder="0.00"
                className="h-12 border-gray-200 focus:border-blueInka"
              />
            </CustomFormField>
          </div>

          <div className="space-y-2">
            <CustomFormField label="Descripción del Producto o Servicio">
              <Textarea
                {...register("descripcionBien")}
                placeholder="Describe detalladamente el producto o servicio adquirido..."
                className="min-h-[100px] border-gray-200 focus:border-blueInka resize-none"
                maxLength={220}
              />
              <CharacterCounter
                current={descripcionBienWatch.length}
                max={220}
              />
            </CustomFormField>
          </div>
        </CardContent>
      </Card>
    </motion.section>
  );
}
