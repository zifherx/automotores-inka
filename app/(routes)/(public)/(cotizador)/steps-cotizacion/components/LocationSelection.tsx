"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowLeft, Clock, MapPin, Phone } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BtnAtrasForm } from "@/components/Shared/BtnAtrasForm";

import { useSucursales } from "@/context/sucursal/sucursalContext";

import { iSede, LocationSelectionProp } from "@/types";
import { CiudadesVentasData } from "@/data";

export function LocationSelection({
  onBack,
  onSelect,
  selectedBrand,
}: LocationSelectionProp) {
  const { sucursales } = useSucursales();

  const [selectedCity, setSelectedCity] = useState("");

  const filteredSedes: iSede[] = sucursales.filter((sucursal) => {
    const hasCity = selectedCity ? sucursal.ciudad === selectedCity : true;
    const hasBrand = selectedBrand
      ? sucursal.marcasDisponiblesVentas.some(
          (marca) => marca._id === selectedBrand._id
        )
      : true;
    return hasCity && hasBrand;
  });

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center mb-6">
        <BtnAtrasForm icon={ArrowLeft} onBack={onBack} />
      </div>

      <div className="text-center mb-8">
        <h2 className="text-4xl font-headBold text-gray-900 mb-2">
          Encuentra tu Concesionario
        </h2>
        <p className="text-gray-600">
          Selecciona la ciudad y el concesionario más cercano a ti
        </p>
      </div>

      <div className="mb-6">
        <Label className="block text-sm font-medium text-gray-700 mb-2">
          Selecciona tu ciudad
        </Label>
        <Select value={selectedCity} onValueChange={setSelectedCity}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Elige una ciudad" />
          </SelectTrigger>
          <SelectContent>
            {CiudadesVentasData.map((ciudad) => (
              <SelectItem key={ciudad} value={ciudad}>
                {ciudad}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredSedes.map((sucursal, index) => (
          <motion.div
            key={sucursal._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
          >
            <Card className="cursor-pointer hover:shadow-xl transition-all duration-300 border-2 hover:border-blueInka">
              <div className="relative">
                <Image
                  src={sucursal.imageUrl}
                  alt={sucursal.name}
                  width={200}
                  height={150}
                  className="w-full h-40 object-cover rounded-t-lg bg-gray-50"
                />
              </div>

              <div className="p-6">
                <h3 className="tex-xl font-headBold text-gray-900 mb-2">
                  {sucursal.name}
                </h3>

                <div className="space-y-2 text-sm text-gray-600 mb-4">
                  <div className="flex items-start">
                    <MapPin className="w-4 h-4 mr-2 mt-0.5 shrink-0" />
                    <span>{sucursal.address}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-2 mt-0.5 shrink-0" />
                    <span>{sucursal.scheduleRegular}</span>
                  </div>
                  <div
                    className={`${
                      sucursal.celularCitas === ""
                        ? "hidden"
                        : "flex items-center"
                    }`}
                  >
                    <Phone className="w-4 h-4 mr-2 mt-0.5 shrink-0" />
                    <span>{sucursal.celularCitas}</span>
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-xs text-gray-500 mb-1">
                    Marcas disponibles
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {sucursal.marcasDisponiblesVentas.map((marca) => (
                      <span
                        key={marca._id}
                        className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded"
                      >
                        {marca.name}
                      </span>
                    ))}
                  </div>
                </div>

                <Button
                  onClick={() => onSelect(sucursal)}
                  className="w-full bg-blueInka hover:bg-blueDarkInka"
                >
                  Seleccionar Concesionario
                </Button>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {filteredSedes.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">
            No hay concesionarios disponibles para los filtros
          </p>
        </div>
      )}
    </motion.div>
  );
}
