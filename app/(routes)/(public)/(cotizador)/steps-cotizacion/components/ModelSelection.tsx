"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowLeft, Clock, Fuel, Gauge, Loader2, Zap } from "lucide-react";
import axios from "axios";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BtnAtrasForm } from "@/components/Shared/BtnAtrasForm";

import { formatUSDPrice } from "@/lib";
import { iModelo, ModelSelectionProp } from "@/types";
import { LoadingIcon } from "@/components/Shared/LoadingIcon";

export function ModelSelection({
  onBack,
  onSelect,
  selectedBrand,
}: ModelSelectionProp) {
  // const { modelos } = useModelos();
  const [modelos, setModelos] = useState<iModelo[]>([]);
  const [loadingData, setLoadingData] = useState(false);

  const getModelos = async () => {
    setLoadingData(true);
    try {
      const query = await axios.get("/api/modelo");
      if (query.status === 200) {
        const modelosActivos = await query.data.obj.filter(
          (modelo: iModelo) => modelo.isActive
        );
        setModelos(modelosActivos);
      }
    } catch (err: any) {
      console.log("Error: ", err.message);
    } finally {
      setLoadingData(false);
    }
  };

  useEffect(() => {
    getModelos();
  }, []);

  const filteredModels: iModelo[] = modelos.filter(
    (modelo) => modelo.isActive && modelo.marca.slug === selectedBrand?.slug
  );

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
        <h2 className="font-headBold text-4xl mb-2">
          Modelos {selectedBrand?.name}
        </h2>
        <p className="font-headLight">
          Descubre los modelos disponibles y encuentra el perfecto para ti
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredModels.map((modelo, index) => (
          <motion.div
            key={modelo._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
          >
            <Card className="cursor-pointer hover:shadow-xl transition-all duration-300 border-2 hover:border-blueInka">
              <CardContent className="p-0">
                <div className="relative bg-gray-50">
                  <Image
                    src={modelo.imageUrl}
                    alt={modelo.name}
                    width={300}
                    height={200}
                    className="w-full h-48 object-contain rounded-t-lg"
                  />
                  <div className="absolute top-4 right-4 flex flex-col gap-2">
                    {modelo.isNuevo && (
                      <Badge className="bg-green-500 hover:bg-green-600">
                        Nuevo
                      </Badge>
                    )}
                    {modelo.isEntrega48H && (
                      <Badge
                        variant="secondary"
                        className="bg-blueInka hover:bg-blueDarkInka text-white"
                      >
                        <Clock className="w-3 h-3 mr-1" />
                        48H
                      </Badge>
                    )}
                    {modelo.isLiquidacion && (
                      <Badge variant="destructive">Liquidación</Badge>
                    )}
                    {modelo.isGLP && (
                      <Badge
                        variant="outline"
                        className="bg-yellow-100 text-yellow-800"
                      >
                        <Fuel className="w-3 h-3 mr-1" />
                        GLP
                      </Badge>
                    )}
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-headBold text-gray-900 mb-1">
                        {modelo.name}
                      </h3>
                      <p className="text-sm font-textRegular text-gray-600 mb-2">
                        {modelo.features.feature2[3].superTitle}{" "}
                        {modelo.features.feature2[3].mainTitle} o{" "}
                        {modelo.features.feature2[3].subTitle}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-sm text-gray-600 mb-4">
                    <div className="flex items-center">
                      <Zap className="w-5 h-5 mr-1" strokeWidth={2} />
                      {modelo.features.feature1[0].mainTitle}
                    </div>
                    <div className="flex items-center">
                      <Gauge className="w-5 h-5 mr-1" strokeWidth={2} />
                      {modelo.features.feature1[2].mainTitle}
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-2xl font-bold text-blueInka">
                        {formatUSDPrice(modelo.precioBase)}
                      </p>
                      <p className="text-sm text-gray-500">Precio base</p>
                    </div>
                    <Button
                      onClick={() => onSelect(modelo)}
                      className="bg-blueInka font-bold text-md text-white hover:bg-blueDarkInka"
                    >
                      Seleccionar
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {filteredModels.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg font-headBold">
            {loadingData ? (
              <>
                Cargando modelos de la marca {selectedBrand?.name}
                <Loader2
                  className="text-redInka mx-auto w-16 h-16 animate-spin"
                  strokeWidth={2}
                />
              </>
            ) : (
              "No hay modelos disponibles para esta marca"
            )}
          </p>
        </div>
      )}
    </motion.div>
  );
}
