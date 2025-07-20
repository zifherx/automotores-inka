"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  AlertCircle,
  CheckCircle,
  CheckCircle2,
  CheckCircleIcon,
  FileText,
  Loader2,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";

import { SectionHeader } from "@/components/Shared/SectionHeader";
import { CustomFormField } from "@/components/Shared/CustomFormField";
import { CharacterCounter } from "./CharacterCounter";

import { ComplaintSectionProp } from "@/types";
import { Button } from "@/components/ui/button";

export function ComplaintSection({
  errors,
  register,
  setValue,
  watch,
  isLoading,
}: ComplaintSectionProp) {
  const detalleSolicitud = watch("detalleSolicitud") || "";
  const pedidoSolicitud = watch("pedidoSolicitud") || "";

  return (
    <motion.section
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.6 }}
    >
      <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
        <SectionHeader
          icon={FileText}
          title="3. Detalle de la Reclamación y/o Pedido del Consumidor"
          BgColor="bg-gradient-to-r from-orange-100 to-red-100"
          iconBgColor="bg-orange-100"
          iconColor="text-orange-600"
        />

        <CardContent className="p-8 space-y-6">
          <div className="space-y-4">
            <Label className="text-sm font-semibold text-gray-700">
              Tipo de Solicitud
            </Label>
            <RadioGroup
              onValueChange={(value) => setValue("tipoSolicitud", value)}
              className="space-y-4"
            >
              <div className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-start space-x-3">
                  <RadioGroupItem
                    value="reclamo"
                    id="reclamo"
                    className="mt-1"
                  />
                  <div className="flex-1">
                    <Label
                      htmlFor="reclamo"
                      className="font-semibold text-gray-800 cursor-pointer"
                    >
                      Reclamo
                    </Label>
                    <p className="text-sm text-gray-600 mt-1">
                      Disconformidad relacionada a la calidad de los productos
                      y/o servicios adquiridos.
                    </p>
                  </div>
                </div>
              </div>
              <div className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-start space-x-3">
                  <RadioGroupItem value="queja" id="queja" className="mt-1" />
                  <div className="flex-1">
                    <Label
                      htmlFor="queja"
                      className="font-semibold text-gray-800 cursor-pointer"
                    >
                      Queja
                    </Label>
                    <p className="text-sm text-gray-600 mt-1">
                      Maaestar o descontento respecto a la atención recibida por
                      parte del personal.
                    </p>
                  </div>
                </div>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <CustomFormField
              label="Detalle de la Solicitud"
              error={errors.detalleSolicitud?.message}
            >
              <Textarea
                {...register("detalleSolicitud")}
                placeholder="Descibe detalladamente tu reclamo o queja, incluyendo fechas, circunstancias y cualquier información relevante..."
                className="min-h-[120px] border-gray-200 focus:border-blueInka resize-none"
              />
              <CharacterCounter current={detalleSolicitud.length} max={500} />
            </CustomFormField>
          </div>

          <div className="space-y-2">
            <CustomFormField
              label="Pedido del Consumidor"
              error={errors.pedidoSolicitud?.message}
            >
              <Textarea
                {...register("pedidoSolicitud")}
                placeholder="Especifica que solicitas como solución a tu reclamo o quej (reembolso, cambio, reparación, disculpas, etc)..."
                className="min-h-[120px] border-gray-200 focus:border-blueInka resize-none"
              />
              <CharacterCounter current={pedidoSolicitud.length} max={500} />
            </CustomFormField>
          </div>

          <Separator className="my-6" />

          <div className="space-y-4">
            <div
              className={`flex items-start space-x-3 p-4 rounded-lg border ${
                errors.isConforme
                  ? "bg-red-50 border-red-200"
                  : "bg-blue-50 border-blue-200"
              }`}
            >
              <Checkbox
                id="isConforme"
                onCheckedChange={(checked) => setValue("isConforme", !!checked)}
                className="mt-1"
              />
              <div className="flex-1">
                <Label
                  htmlFor="isConforme"
                  className="text-sm font-medium text-gray-800 cursor-pointer"
                >
                  Acepto los términos y condiciones del presente reclamo
                </Label>
                <p className="text-xs text-gray-600 mt-1">
                  Al marcar esta casilla, confirmo que la información
                  proporcionada es veraz y acepto los{" "}
                  <Link
                    href="/legal/terminos-condiciones"
                    target="_blank"
                    className="text-redInka hover:underline cursor-pointer"
                  >
                    Términos de Servicio
                  </Link>{" "}
                  y{" "}
                  <Link
                    href="/legal/copyright"
                    target="_blank"
                    className="text-redInka hover:underline cursor-pointer"
                  >
                    Política de Privacidad
                  </Link>
                </p>
              </div>
            </div>
            {errors.isConforme && (
              <p className="text-redInka text-sm flex items-center mt-2">
                <AlertCircle className="h-5 w-5 mr-1" />
                {errors.isConforme.message}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-2 mt-8">
            <p className="text-sm text-gray-400 leading-tight">
              * La formulación del reclamo no impide acudir a otras vías de
              solución de controversias, ni es requisito para interponer una
              denuncia ante el INDECOPI.
            </p>
            <p className="text-sm text-gray-400 leading-tight">
              * El proveedor deberá dar respuesta al reclamo en un plazo no
              mayor a quince (15) días hábiles improrrogables.
            </p>
            <p className="text-sm text-gray-400 leading-tight">
              * En caso de que el consumidor no consigne como mínimo su nombre,
              DNI, domicilio o correo electrónico, fecha de reclamo o queja y el
              detalle de los mismo, estos se considerarán como no presentados.
            </p>
          </div>

          <Button
            type="submit"
            className="w-full h-14 bg-gradient-to-r from-blueDarkInka to-blueInka hover:from-redInka hover:to-redDarkInka text-white font-headBold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="h-12 w-12 animate-spin" strokeWidth={2} />
                Cargando...
              </>
            ) : (
              <>
                <CheckCircleIcon className="h-12 w-12 mr-2" strokeWidth={2} />
                Generar Reclamo
              </>
            )}
          </Button>
        </CardContent>
      </Card>
    </motion.section>
  );
}
