"use client";

import { useCallback, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Loader } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { BtnAtrasForm } from "@/components/Shared/BtnAtrasForm";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { CotizadorPasosFormValues, cotizadorPasosSchema } from "@/forms";
import { ContactFormProp } from "@/types";
import { CotizadorPasosFormData } from "@/interfaces";
import {
  buildCotizacionData,
  createCotizacion,
  createWebhookFBLead,
  getDocumentMaxLength,
  handleCotizacionError,
  onToast,
  sendCotizacionFlashDealer,
} from "@/lib";
import { useRouter } from "next/navigation";
import { DataLayerEvent, sendDataLayer } from "@/utils/analytics";

export function ContactForm({
  onBack,
  selectedBrand,
  selectedLocation,
  selectedModel,
}: ContactFormProp) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<CotizadorPasosFormValues>({
    resolver: zodResolver(cotizadorPasosSchema),
  });

  const tipoDocumentoWatch = watch("tipoDocumento");

  const trackEvent = useCallback((eventData: DataLayerEvent) => {
    sendDataLayer(eventData);
  }, []);

  const [utmParams, setUtmParams] = useState<{ [key: string]: string }>({}); // Captura de parámetros

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const utms: { [key: string]: string } = {};

    params.forEach((value, key) => {
      utms[key] = value;
    });
    
    setUtmParams(utms);
    console.log("UTM:", utms);

  },[]);

  const onSubmit = async (values: CotizadorPasosFormData) => {
    setIsSubmitting(true);

    try {
      const cotizacionData = buildCotizacionData({
        nombres: values.nombreCompleto,
        tipoDocumento: values.tipoDocumento,
        numeroDocumento: values.numeroDocumento,
        email: values.email,
        celular: values.celular,
        marca: selectedBrand!.slug,
        modelo: selectedModel!.name,
        departamento: selectedLocation!.ciudad,
        concesionario: selectedLocation!.slug,
        intencionCompra: values.intencionCompra,
        checkDatosPersonales: values.aceptaPoliticas,
        checkPromociones: values.aceptaNewsletter ? "yes" : "no",
        //NUEVOS
        slugConcesionario: selectedLocation!.slug,
        carroceria: selectedModel!.carroceria.slug,
        slugModelo: selectedModel!.slug,
        imageUrl: selectedModel!.imageUrl,
        precioBase: selectedModel!.precioBase,
      });

      const flashdealerData = {
        numeroDocumento: values.numeroDocumento,
        correoElectronico: values.email,
        numeroCelular: values.celular,
        marcaVehiculo: cotizacionData.marca.toUpperCase(),
        codigoFlashDealer: selectedModel!.codigo_flashdealer,
        ciudadCotizacion: selectedLocation!.ciudad,
      } as const;

      const form_api = {
        "document": flashdealerData.numeroDocumento,
        "full_name": cotizacionData.nombres,
        "email": flashdealerData.correoElectronico,
        "phone_number": flashdealerData.numeroCelular,
        "mark": cotizacionData.marca,
        "model": cotizacionData.modelo,
        "city": cotizacionData.departamento,
        // "vehicle": flashdealerData.numeroDocumento,
        // "year": newObj.numeroDocumento,
        "platform": utmParams.utm_source || 'web',
        "form_name": "NUEVOS",
      }
      const URL_APIFB = process.env.NEXT_PUBLIC_URL_APIFB as string;
      const TOKEN_APIFB = process.env.NEXT_PUBLIC_TOKEN_APIFB as string;

      const [cotizacionResult, flashdealerResult] = await Promise.allSettled([
        createWebhookFBLead(form_api, URL_APIFB, TOKEN_APIFB),
        createCotizacion(cotizacionData, "/api/cotizacion"),
        sendCotizacionFlashDealer(flashdealerData, "/api/flashdealer/new-lead"),
      ]);

      // console.log("cotizacionResult", cotizacionResult);
      // console.log("flashdealerResult", flashdealerResult);

      if (cotizacionResult.status === "rejected") {
        throw new Error(`Error al crear solicitud`);
      }

      if (flashdealerResult.status === "rejected") {
        console.warn(`El envío a flashdealer falló pero se creo la cotización`);
        onToast(
          "Cotización creada. El envío a FD podría demorar unos minutos",
          "",
          false
        );
      } else {
        onToast(cotizacionResult.value.data.message);
      }

      const cotizacionNumber = cotizacionResult.value.data.obj._id;

      await trackEvent({
        event: "lead_form_submitted",
        lead_interna: cotizacionNumber,
      });

      console.log("window-dataLayer", window.dataLayer);

      router.push(
        `/gracias?nombre=${values.nombreCompleto}&celular=${values.celular}`
      );
    } catch (err: any) {
      handleCotizacionError(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      // className="border-2 border-black grid grid-cols-2 gap-3"
    >
      <div>
        <div className="flex items-center mb-6">
          <BtnAtrasForm icon={ArrowLeft} onBack={onBack} />
        </div>

        <div className="text-center mb-8">
          <h2 className="text-4xl font-headBold text-gray-900 mb-2">
            Completa tus Datos
          </h2>
          <p className="text-gray-600">
            Últimos detalles para contactarte y procesar tu solicitud
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Nombre Completo */}
            <div className="md:col-span-2">
              <Label htmlFor="nombreCompleto">Nombre Completo *</Label>
              <Input
                id="nombreCompleto"
                {...register("nombreCompleto")}
                placeholder="Ingresa tu nombre completo"
                className={errors.nombreCompleto ? "border-redInka" : ""}
              />
              {errors.nombreCompleto && (
                <p className="text-redInka text-sm mt-1">
                  {errors.nombreCompleto.message}
                </p>
              )}
            </div>

            {/* Tipo Documento */}
            <div>
              <Label>Tipo de Documento *</Label>
              <Select
                onValueChange={(value) => {
                  setValue("numeroDocumento", "");
                  setValue("tipoDocumento", value as any);
                }}
              >
                <SelectTrigger
                  className={errors.tipoDocumento ? "border-redInka" : ""}
                >
                  <SelectValue placeholder="Selecciona tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="dni">DNI</SelectItem>
                  <SelectItem value="ruc">RUC</SelectItem>
                  <SelectItem value="pasaporte">Pasaporte</SelectItem>
                  <SelectItem value="ce">Carné de Extranjería</SelectItem>
                </SelectContent>
              </Select>
              {errors.tipoDocumento && (
                <p className="text-redInka text-sm mt-1">
                  {errors.tipoDocumento.message}
                </p>
              )}
            </div>

            {/* Número de Documento */}
            <div>
              <Label htmlFor="numeroDocumento">Número de Documento *</Label>
              <Input
                id="numeroDocumento"
                {...register("numeroDocumento")}
                placeholder="Número de documento"
                disabled={!tipoDocumentoWatch}
                className={errors.numeroDocumento ? "border-redInka" : ""}
                maxLength={getDocumentMaxLength(tipoDocumentoWatch)}
              />
              {errors.numeroDocumento && (
                <p className="text-redInka text-sm mt-1">
                  {errors.numeroDocumento.message}
                </p>
              )}
            </div>

            {/* Celular */}
            <div>
              <Label htmlFor="celular">Celular *</Label>
              <Input
                id="celular"
                {...register("celular")}
                placeholder="987654321"
                maxLength={9}
                className={errors.celular ? "border-redInka" : ""}
              />
              {errors.celular && (
                <p className="text-redInka text-sm mt-1">
                  {errors.celular.message}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                {...register("email")}
                placeholder="tu@email.com"
                className={errors.email ? "border-redInka" : ""}
              />
              {errors.email && (
                <p className="text-redInka text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Intención de Compra */}
            <div className="md:col-span-2">
              <Label>Intención de Compra *</Label>
              <Select
                onValueChange={(value) =>
                  setValue("intencionCompra", value as any)
                }
              >
                <SelectTrigger
                  className={errors.intencionCompra ? "border-redInka" : ""}
                >
                  <SelectValue placeholder="¿Cuándo planeas comprar?" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="esta-semana">Esta semana</SelectItem>
                  <SelectItem value="este-mes">Este mes</SelectItem>
                  <SelectItem value="proximo-mes">Próximo mes</SelectItem>
                  <SelectItem value="mas-adelante">Más adelante</SelectItem>
                </SelectContent>
              </Select>
              {errors.intencionCompra && (
                <p className="text-redInka text-sm mt-1">
                  {errors.intencionCompra.message}
                </p>
              )}
            </div>
          </div>

          {/* Políticas y Newsletter */}
          <div className="space-y-4 pt-6 border-t">
            <div className="flex items-start space-x-2">
              <Checkbox
                id="aceptaPoliticas"
                className="rounded-full h-5 w-5 data-[state=checked]:bg-redInka data-[state=checked]:border-none data-[state=checked]:text-white"
                onCheckedChange={(checked) =>
                  setValue("aceptaPoliticas", !!checked)
                }
              />
              <Label htmlFor="idPoliticas" className="text-sm leading-5">
                Mediante el envío del formulario declaro que he leído la
                autorización y acepto la{" "}
                <a
                  href="/legal/terminos-condiciones"
                  className="underline text-redInka"
                >
                  Política de Protección de Datos Personales
                </a>{" "}
                y el tratamiento de mis datos personales a Automotores Inka Debe
                aceptar el tratamiento de Datos Personales *
              </Label>
            </div>
            {errors.aceptaPoliticas && (
              <p className="text-redInka text-sm">
                {errors.aceptaPoliticas.message}
              </p>
            )}

            <div>
              <Label className="text-sm font-bold">
                Automotores Inka podrá enviarme información sobre sus
                promociones y ofertas comerciales de sus productos y servicios,
                conforme a la{" "}
                <span className="text-redInka">
                  Cláusula de Datos Personales:
                </span>
              </Label>
              <RadioGroup
                onValueChange={(value) =>
                  setValue("aceptaNewsletter", value === "true")
                }
                className="flex flex-col space-y-3 mt-5"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem
                    value="true"
                    id="newsletter-si"
                    className="h-5 w-5 data-[state=checked]:text-redInka"
                  />
                  <Label htmlFor="newsletter-si">
                    Si autorizo a Automotores Inka.
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem
                    value="false"
                    id="newsletter-no"
                    className="h-5 w-5 data-[state=checked]:text-redInka"
                  />
                  <Label htmlFor="newsletter-no">
                    No autorizo, prefiero perder la oportunidad de recibir
                    promociones y ofertas.
                  </Label>
                </div>
              </RadioGroup>
            </div>
          </div>

          <Button
            type="submit"
            className="w-full bg-blueInka hover:bg-blueDarkInka h-12 text-lg"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader className="w-4 h-4 mr-2 animate-spin" />
                Enviando...
              </>
            ) : (
              <>
                Enviar Solicitud
                <ArrowRight className="w-5 h-5 ml-2" />
              </>
            )}
          </Button>
        </form>
      </div>
      {/* <div>selecciones</div> */}
    </motion.div>
  );
}
