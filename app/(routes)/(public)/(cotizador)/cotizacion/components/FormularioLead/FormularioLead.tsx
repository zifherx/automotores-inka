"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import axios from "axios";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
  SelectLabel,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import { Loader2, Send, Sparkles } from "lucide-react";
import { CotizacionModeloFormValue, formCotizacionModeloSchema } from "@/forms";
import { iCardModel, iSede } from "@/types";
import {
  buildCotizacionData,
  buildPayloadFlashdealer,
  createCotizacion,
  handleCotizacionError,
  onToast,
  sendCotizacionFlashDealer,
} from "@/lib";
import { DataLayerEvent, sendDataLayer } from "@/utils/analytics";

const tiposDocumento = [
  { value: "DNI", label: "DNI", maxLength: 8 },
  { value: "RUC", label: "RUC", maxLength: 11 },
  { value: "CE", label: "Carnet de Extranjería", maxLength: 15 },
  { value: "PASAPORTE", label: "Pasaporte", maxLength: 15 },
] as const;

export function FormularioLead({ model }: iCardModel) {
  const router = useRouter();

  const [sedeSinDuplicados, setSedeSinDuplicados] = useState<iSede[]>([]);
  const [concesionarios, setConcesionarios] = useState<iSede[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingAnimation, setLoadingAnimation] = useState<
    "default" | "sparkles" | "pulse"
  >("sparkles");

  const form = useForm<CotizacionModeloFormValue>({
    resolver: zodResolver(formCotizacionModeloSchema),
    defaultValues: {
      nombres: "",
      tipoDocumento: "",
      numeroDocumento: "",
      email: "",
      celular: "",
      departamento: "",
      concesionario: "",
      intencionCompra: "",
      checkDatosPersonales: false,
      checkPromociones: "",
    },
  });

  const marcaSelected = model.marca.slug;
  const watchSede = form.watch("departamento");
  const watchConcesionario = form.watch("concesionario");
  const tipoDocumentoSeleccionado = form.watch("tipoDocumento");
  const numeroDocumento = form.watch("numeroDocumento");

  const [utmParams, setUtmParams] = useState<{ [key: string]: string }>({}); // Captura de parámetros

  const trackEvent = useCallback((eventData: DataLayerEvent) => {
    sendDataLayer(eventData);
  }, []);

  const maxLengthDocumento =
    tiposDocumento.find((val) => val.value === tipoDocumentoSeleccionado)
      ?.maxLength || 0;

  const handleNumeroDocumentoChange = (value: string) => {
    if (tipoDocumentoSeleccionado) {
      const maxLength = maxLengthDocumento;
      if (value.length <= maxLength && /^\d*$/.test(value)) {
        form.setValue("numeroDocumento", value);
      }
    }
  };

  const getCiudadesByBrand = async (marca: string) => {
    if (marca !== "" || marca !== undefined) {
      const query = await axios.get(`/api/sucursal/by-marca/${marca}`);
      if (query.status === 200) {
        const ciudadesUnicas = query.data.all.filter(
          (item: any, index: any, self: any) =>
            index === self.findIndex((a: any) => a.ciudad === item.ciudad)
        );

        setSedeSinDuplicados(ciudadesUnicas);
        setConcesionarios(query.data.all);
      }
    }
  };

  useEffect(() => {
    if (marcaSelected) {
      getCiudadesByBrand(marcaSelected);
    }

    const params = new URLSearchParams(window.location.search);
    const utms: { [key: string]: string } = {};

    params.forEach((value, key) => {
      utms[key] = value;
    });

    setUtmParams(utms);
    console.log("UTM:", utms);
  }, [marcaSelected]);

  const handleOnSubmit = async (values: CotizacionModeloFormValue) => {
    setIsLoading(true);
    try {
      const cotizacionData = buildCotizacionData({
        ...values,
        departamento: watchSede,
        concesionario: watchConcesionario
          .toLocaleUpperCase()
          .replace(/-/g, " "),
        slugConcesionario: watchConcesionario,
        marca: model!.marca.name,
        carroceria: model!.carroceria.name,
        modelo: model!.name,
        slugModelo: model!.slug,
        imageUrl: model!.imageUrl,
        precioBase: model!.precioBase,
      });

      const flashdealerData = buildPayloadFlashdealer({
        numeroDocumento: values.numeroDocumento,
        nombreCompleto: values.nombres,
        correoElectronico: values.email,
        numeroCelular: values.celular,
        marcaVehiculo:
          cotizacionData.marca === "great-wall"
            ? "GREAT WALL"
            : cotizacionData.marca.toUpperCase(),
        codigoFlashDealer: model!.codigo_flashdealer,
        ciudadCotizacion: watchSede,
        plataformaOrigen: utmParams.utm_source || "web",
      });

      // console.log("cotizacionData", cotizacionData);
      // console.log("flashdealerData", flashdealerData);

      const [cotizacionResult, flashdealerResult] = await Promise.allSettled([
        createCotizacion(cotizacionData, "/api/cotizacion"),
        sendCotizacionFlashDealer(flashdealerData, `/api/flashdealer/new-lead`),
      ]);

      // console.log("cotizacionResult", cotizacionResult);
      // console.log("flashdealerResult", flashdealerResult);

      if (cotizacionResult.status === "rejected") {
        throw new Error(`Error al crear cotizacionResult`);
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
        `/gracias?nombre=${values.nombres}&celular=${values.celular}`
      );
    } catch (err: any) {
      handleCotizacionError(err);
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmit = async (values: CotizacionModeloFormValue) => {
    setIsLoading(true);
    try {
      //   console.log(values);
      const query = await axios.post("api/cotizacion", {
        ...values,
        departamento: watchSede,
        concesionario: watchConcesionario.toUpperCase().replace(/-/g, " "),
        slugConcesionario: watchConcesionario,
        marca: model.marca.name,
        carroceria: model.carroceria.name,
        modelo: model.name,
        slugModelo: model.slug,
        imageUrl: model.imageUrl,
        precioBase: model.precioBase,
      });

      if (query.status === 200) {
        // const envioCorreo = await axios.post("/api/send-email/cotizacion", {
        //   ...values,
        //   departamento: watchSede,
        //   concesionario: watchConcesionario.toUpperCase().replace(/-/g, " "),
        //   slugConcesionario: watchConcesionario,
        //   marca: model.marca.name,
        //   carroceria: model.carroceria.name,
        //   modelo: model.name,
        //   slugModelo: model.slug,
        //   imageUrl: model.imageUrl,
        //   precioBase: model.precioBase,
        // });

        // if (envioCorreo.status === 200) {
        setIsLoading(false);
        onToast(query.data.message);
        router.push(`/gracias/${query.data.obj._id}`);
        // }
      }
    } catch (err) {
      // console.log(err);
      setIsLoading(false);
      onToast("Algo salió mal ❌", "", true);
    }
  };

  const LoadingIcon = () => {
    switch (loadingAnimation) {
      case "sparkles":
        return <Sparkles className="mr-2 h-4 w-4 animate-spin" />;
      case "pulse":
        return (
          <div className="mr-2 h-4 w-4 rounded-full bg-white animate-pulse" />
        );
      default:
        return <Loader2 className="mr-2 h-4 w-4 animate-spin" />;
    }
  };

  return (
    <div className="my-5 md:my-0 p-4 border md:border-0 rounded-2xl md:rounded-none">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleOnSubmit)}
          className="space-y-2"
        >
          {/* Nombre y Apellido */}
          <FormField
            control={form.control}
            name="nombres"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-headMedium">
                  Nombre y Apellido
                </FormLabel>
                <FormControl>
                  <Input placeholder="Nombre completo" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Tipo de Documento */}
          <FormField
            control={form.control}
            name="tipoDocumento"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-headMedium">
                  Tipo de Documento
                </FormLabel>
                <Select
                  onValueChange={(value) => {
                    field.onChange(value);
                    form.setValue("numeroDocumento", "");
                  }}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccione un tipo de documento" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {tiposDocumento.map(({ label, value }) => (
                      <SelectItem key={value} value={value}>
                        {label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Número de Documento */}
          <FormField
            control={form.control}
            name="numeroDocumento"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-headMedium">
                  Número de Documento
                </FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder={
                      tipoDocumentoSeleccionado
                        ? `Ingrese su ${tipoDocumentoSeleccionado.toLocaleLowerCase()}`
                        : `Seleccione primero el tipo de documento`
                    }
                    disabled={!tipoDocumentoSeleccionado}
                    value={field.value}
                    onChange={(e) =>
                      handleNumeroDocumentoChange(e.target.value)
                    }
                  />
                </FormControl>
                {tipoDocumentoSeleccionado && (
                  <FormDescription>
                    Máximo {maxLengthDocumento} dígitos (
                    {numeroDocumento.length}/{maxLengthDocumento})
                  </FormDescription>
                )}
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Celular */}
          <FormField
            control={form.control}
            name="celular"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-headMedium">Celular</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Celular"
                    type="tel"
                    maxLength={9}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Email */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-headMedium">Email</FormLabel>
                <FormControl>
                  <Input placeholder="Email" type="email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Departamento */}
          <FormField
            control={form.control}
            name="departamento"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-headMedium">Sede</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccione una sede" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {sedeSinDuplicados.map(({ _id, ciudad }) => (
                      <SelectItem key={_id} value={ciudad}>
                        {ciudad}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Concesionario */}
          {watchSede && (
            <FormField
              control={form.control}
              name="concesionario"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-headMedium">
                    Concesionario
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccione donde quiere atenderse" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel className="capitalize">
                          Sede {watchSede}
                        </SelectLabel>
                        {concesionarios
                          .filter((value) => value.ciudad === watchSede)
                          .map(({ _id, name, address, slug }) => (
                            <SelectItem key={_id} value={slug}>
                              <div className="flex flex-col items-start">
                                <p className="font-semibold">{name}</p>
                                <p className="text-xs">{address}</p>
                              </div>
                            </SelectItem>
                          ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          {/* Intención de compra */}
          <FormField
            control={form.control}
            name="intencionCompra"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-headMedium">
                  Intención de Compra
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="¿Cuándo deseas comprar?" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="esta-semana">Esta semana</SelectItem>
                    <SelectItem value="este-mes">Este mes</SelectItem>
                    <SelectItem value="proximo-mes">Próximo mes</SelectItem>
                    <SelectItem value="mas-adelante">Más adelante</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Check Datos Personales */}
          <FormField
            control={form.control}
            name="checkDatosPersonales"
            render={({ field }) => (
              <FormItem className="flex items-start space-x-2 space-y-0 py-5">
                <FormControl>
                  <Checkbox
                    className="h-5 w-5 border-redInka data-[state=checked]:bg-redInka text-white rounded-full"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    color="#1B5094"
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel className="text-sm font-normal leading-relaxed">
                    Mediante el envío del formulario declaro que he leído la
                    autorización y acepto la{" "}
                    <a
                      href="/legal/terminos-condiciones"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-redInka underline hover:font-semibold"
                    >
                      Política de Protección de Datos Personales
                    </a>{" "}
                    y el tratamiento de mis datos personales a Automotores Inka
                  </FormLabel>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />

          {/* Autorización a promociones */}
          <FormField
            control={form.control}
            name="checkPromociones"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm leading-4 block text-justify">
                  Automotores Inka podrá enviarme información sobre sus
                  promociones y ofertas comerciales de sus productos y
                  servicios, conforme a la{" "}
                  <a
                    href="#"
                    target="_blank"
                    className="text-redInka hover:font-semibold"
                  >
                    Cláusula de Datos Personales:
                  </a>
                </FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={""}
                    className="flex flex-col space-y-1"
                  >
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="yes" />
                      </FormControl>
                      <FormLabel className="font-normal">
                        Si autorizo a Automotores Inka.
                      </FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="no" />
                      </FormControl>
                      <FormLabel className="font-normal">
                        No autorizo, prefiero perder la oportunidad de recibir
                        promociones y ofertas.
                      </FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <p className="leading-tight font-textMedium py-5">
            La presente cotización se realiza en función a los{" "}
            <a href="#" target="_blank" className="text-redInka">
              términos y condiciones.
            </a>
          </p>

          <Button
            type="submit"
            className="w-full font-headMedium text-xl uppercase bg-black hover:bg-grisDarkInka"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <LoadingIcon />
                Enviando...
              </>
            ) : (
              <>
                Enviar
                <Send className="w-5 h-5 ml-2" />
              </>
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
}
