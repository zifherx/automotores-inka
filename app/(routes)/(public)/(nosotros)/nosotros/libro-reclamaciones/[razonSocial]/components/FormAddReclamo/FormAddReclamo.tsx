/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

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
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import { Loader2, OctagonAlert, Sparkles } from "lucide-react";
import { listDepartamentos } from "@/data/public.data";
import { formReclamoSchema, HReclamoFormValues } from "@/forms";
import { tDepartamento } from "@/interfaces";
import { iHojaReclamo, iSede } from "@/types";
import {
  cn,
  fechaHoy,
  formatNumberToSixDigits,
  horaHoy,
  onToast,
  setNomenclaturaLRD,
  switchRS,
  switchRuc,
} from "@/lib";

export function FormAddReclamo(props: iHojaReclamo) {
  const { slugType } = props;

  const router = useRouter();

  const [selectedDepartamento, setSelectedDepartamento] =
    useState<tDepartamento | null>(null);
  const [sedes, setSedes] = useState<iSede[]>([]);
  const [fechaToday, setFechaToday] = useState("");
  const [horaToday, setHoraToday] = useState("");
  const [tipoBienSelected, setTipoBienSelected] = useState("");
  const [codigoLRD, setCodigoLRD] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [loadingAnimation, setLoadingAnimation] = useState<
    "default" | "sparkles" | "pulse"
  >("default");
  const [numeroReclamo, setNumeroReclamo] = useState(0);
  const [sedeSelected, setSedeSelected] = useState<iSede>();
  const [charCounts, setCharCounts] = useState({
    descripcionBien: 100,
    detalleSolicitud: 500,
    pedidoSolicitud: 430,
  });

  let today = new Date();

  const getNumeroReclamo = async () => {
    const query = await axios.get("/api/reclamo/last");
    if (query.status === 200) {
      const lastClaim = query.data[0].numeroReclamo.split("-")[2];
      const claimNumber = Number(lastClaim);
      setNumeroReclamo(claimNumber);
    }
  };

  useEffect(() => {
    getNumeroReclamo();
    setCodigoLRD(
      `LRD-${setNomenclaturaLRD(slugType)}-${formatNumberToSixDigits(
        numeroReclamo + 1
      )}-${today.getFullYear()}-${
        sedeSelected?.codexHR ? sedeSelected!.codexHR.toUpperCase() : ""
      }`
    );
  }, [slugType, getNumeroReclamo]);

  const getSedes = async () => {
    const query = await axios.get(`/api/sucursal`);
    if (query.status === 200) {
      const sedesSoloActivas = query.data.obj.filter(
        (sede: iSede) => sede.isActive
      );
      setSedes(sedesSoloActivas);
    }
  };

  useEffect(() => {
    setFechaToday(fechaHoy(today));
    setHoraToday(horaHoy(today));
    getSedes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const formReclamo = useForm<HReclamoFormValues>({
    resolver: zodResolver(formReclamoSchema),
    defaultValues: {
      // 1. Datos del Consumidor
      tipoDocumento: "",
      numeroDocumento: "",
      nombres: "",
      apellidos: "",
      email: "",
      celular: "",
      departamento: "",
      provincia: "",
      distrito: "",
      direccion: "",
      // 2. Datos del bien adquirido
      tipoBien: "",
      vin: "",
      placa: "",
      sedeCompra: "",
      moneda: "",
      importeBien: 0,
      descripcionBien: "",
      // 3. Detalle del reclamo y solicitud del reclamante
      tipoSolicitud: "",
      detalleSolicitud: "",
      pedidoSolicitud: "",
      isConforme: false,
    },
  });

  const onSubmit = async (values: HReclamoFormValues) => {
    setIsLoading(true);
    try {
      const query = await axios.post("/api/reclamo", {
        ...values,
        sedeCompra: sedeSelected!.ciudad,
        sedeCodexHR: sedeSelected!.codexHR,
        tipoBien: tipoBienSelected,
        fecha: fechaToday,
        hora: horaToday,
        numeroReclamo: codigoLRD,
        razonSocial: switchRS(slugType),
        rucEmpresa: switchRuc(slugType),
        direccionCliente: `${values.direccion} ,${values.distrito}, ${values.provincia}, ${values.departamento}`,
        direccionSede: sedeSelected!.address,
      });

      if (query.status === 200) {
        const envioCorreo = await axios.post("/api/send-email/reclamo", {
          ...values,
          sedeCompra: sedeSelected!.ciudad,
          sedeCodexHR: sedeSelected!.codexHR,
          tipoBien: tipoBienSelected,
          fecha: fechaToday,
          hora: horaToday,
          numeroReclamo: codigoLRD,
          razonSocial: switchRS(slugType),
          rucEmpresa: switchRuc(slugType),
          direccionCliente: `${values.direccion} ,${values.distrito}, ${values.provincia}, ${values.departamento}`,
          direccionSede: sedeSelected!.address,
        });

        if (envioCorreo.status === 200) {
          setIsLoading(false);
          onToast(query.data.message);
          router.push("/nosotros/libro-reclamaciones/gracias");
        }
      }
    } catch (err) {
      // console.log(err);
      setIsLoading(false);
      onToast("Algo salió mal ❌", "", true);
    }
  };

  // const imprimirPDF = (values: HReclamoFormValues) => {
  //   makePDFReclamo({
  //     ...values,
  //     sedeCompra: sedeSelected!.ciudad,
  //     sedeCodexHR: sedeSelected!.codexHR,
  //     tipoBien: tipoBienSelected,
  //     fecha: fechaToday,
  //     hora: horaToday,
  //     numeroReclamo: codigoLRD,
  //     razonSocial: switchRS(slugType),
  //     rucEmpresa: switchRuc(slugType),
  //     direccionCliente: `${values.direccion} ,${values.distrito}, ${values.provincia}, ${values.departamento}`,
  //     direccionSede: sedeSelected!.address,
  //   });
  // };

  const handleTextareaChange = (
    e: ChangeEvent<HTMLTextAreaElement>,
    fieldName: string,
    limitCharacters: number
  ) => {
    const value = e.target.value;
    formReclamo.setValue(fieldName as any, value);
    setCharCounts((prev) => ({
      ...prev,
      [fieldName]: limitCharacters - value.length,
    }));
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
    <>
      <div className="flex items-center justify-between pb-5">
        <div className="flex justify-start gap-x-8 md:gap-x-24 ">
          <div className="flex flex-col gap-y-1">
            <Label
              htmlFor="fechaReclamo"
              className="font-bold capitalize text-lg"
            >
              Fecha
            </Label>
            <Label id="fechaReclamo" className="text-base">
              {fechaToday}
            </Label>
          </div>

          <div className="flex flex-col gap-y-1">
            <Label
              htmlFor="horaReclamo"
              className="font-bold capitalize text-lg"
            >
              Hora
            </Label>
            <Label id="horaReclamo" className="text-base">
              {horaToday}
            </Label>
          </div>
        </div>

        <div className="flex flex-col justify-end gap-y-1">
          <Label htmlFor="nroReclamo" className="font-bold capitalize text-lg">
            N° Reclamo
          </Label>
          <Label id="nroReclamo" className="text-base">
            {codigoLRD}
          </Label>
        </div>
      </div>

      <Form {...formReclamo}>
        <form onSubmit={formReclamo.handleSubmit(onSubmit)} className="w-full">
          <h2 className="font-bold text-base md:text-lg md:col-span-2">
            1. Identificación del Consumidor Reclamante
          </h2>
          <div className="grid md:grid-cols-2 gap-y-5 gap-x-2 md:gap-y-6 md:gap-x-4 p-1 md:p-2">
            {/* Tipo Documento */}
            <FormField
              control={formReclamo.control}
              name="tipoDocumento"
              render={({ field }) => (
                <FormItem className="col-span-2 md:col-span-1">
                  <FormLabel className="font-bold">Tipo de Documento</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona un tipo de documento" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="CE">Carnet de Extranjería</SelectItem>
                      <SelectItem value="DNI">DNI</SelectItem>
                      <SelectItem value="RUC">RUC</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Nro Documento */}
            <FormField
              control={formReclamo.control}
              name="numeroDocumento"
              render={({ field }) => (
                <FormItem className="col-span-2 md:col-span-1">
                  <FormLabel className="font-bold">Nro de Documento</FormLabel>
                  <FormControl>
                    <Input placeholder="DNI" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Nombres */}
            <FormField
              control={formReclamo.control}
              name="nombres"
              render={({ field }) => (
                <FormItem className="col-span-2 md:col-span-1">
                  <FormLabel className="font-bold">Nombres</FormLabel>
                  <FormControl>
                    <Input placeholder="Dwayne" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Apellidos */}
            <FormField
              control={formReclamo.control}
              name="apellidos"
              render={({ field }) => (
                <FormItem className="col-span-2 md:col-span-1">
                  <FormLabel className="font-bold">Apellidos</FormLabel>
                  <FormControl>
                    <Input placeholder="Jhonson" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Correo Electrónico */}
            <FormField
              control={formReclamo.control}
              name="email"
              render={({ field }) => (
                <FormItem className="col-span-2 md:col-span-1">
                  <FormLabel className="font-bold">
                    Correo Electrónico
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="ejemplo@dominio.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Celular */}
            <FormField
              control={formReclamo.control}
              name="celular"
              render={({ field }) => (
                <FormItem className="col-span-2 md:col-span-1">
                  <FormLabel className="font-bold">Celular</FormLabel>
                  <FormControl>
                    <Input placeholder="999666000" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="col-span-2">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-x-4">
                {/* Departamento */}
                <FormField
                  control={formReclamo.control}
                  name="departamento"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-bold">Departamento</FormLabel>
                      <Select
                        onValueChange={(value) => {
                          field.onChange(value);
                          const dept = listDepartamentos.find(
                            (d) => d.value === value
                          );
                          setSelectedDepartamento(dept || null);
                        }}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecciona un departamento" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {listDepartamentos.map(({ id, name, value }) => (
                            <SelectItem key={id} value={value}>
                              {name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Provincia */}
                <FormField
                  control={formReclamo.control}
                  name="provincia"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-bold">Provincia</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecciona una provincia" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {selectedDepartamento?.provincias.map(
                            ({ id, name, value }) => (
                              <SelectItem key={id} value={value}>
                                {name}
                              </SelectItem>
                            )
                          )}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Distrito */}
                <FormField
                  control={formReclamo.control}
                  name="distrito"
                  render={({ field }) => (
                    <FormItem className="col-span-2 md:col-span-1">
                      <FormLabel className="font-bold">Distrito</FormLabel>
                      <FormControl>
                        <Input placeholder="Escribe tu distrito" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Dirección */}
            <FormField
              control={formReclamo.control}
              name="direccion"
              render={({ field }) => (
                <FormItem className="col-span-2">
                  <FormLabel className="font-bold">Dirección</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Ingresa tu dirección de domicilio"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <h2 className="font-bold text-base md:text-lg md:col-span-2 mt-5 md:mt-10">
            2. Identificación del Bien Contratado
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-4 p-2">
            <div className="flex md:flex-row gap-5">
              <div className="">
                {/* Tipo de Bien */}
                <FormField
                  control={formReclamo.control}
                  name="tipoBien"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel className="font-bold">Tipo de bien</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={(value) => {
                            setTipoBienSelected(value);
                            return field.onChange;
                          }}
                          defaultValue={field.value}
                          className={cn("flex flex-col")}
                        >
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="producto" />
                            </FormControl>
                            <FormLabel>Producto</FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="servicio" />
                            </FormControl>
                            <FormLabel>Servicio</FormLabel>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex flex-row gap-2">
                {/* VIN */}
                <FormField
                  control={formReclamo.control}
                  name="vin"
                  render={({ field }) => (
                    <FormItem className="col-span-2 md:col-span-1">
                      <FormLabel className="font-bold">Vin</FormLabel>
                      <FormControl>
                        <Input placeholder="N° Vin" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* PLACA */}
                <FormField
                  control={formReclamo.control}
                  name="placa"
                  render={({ field }) => (
                    <FormItem className="col-span-2 md:col-span-1">
                      <FormLabel className="font-bold">Placa</FormLabel>
                      <FormControl>
                        <Input placeholder="N° Placa" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Sucursal */}
            <FormField
              control={formReclamo.control}
              name="sedeCompra"
              render={({ field }) => (
                <FormItem className="col-span-2 md:col-span-1">
                  <FormLabel className="font-bold">Sede</FormLabel>
                  <Select
                    onValueChange={(value) => {
                      setSedeSelected(
                        sedes.find((sede) => sede.codexHR === value)
                      );
                    }}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona una Sede" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {sedes.length > 0 &&
                        sedes.map(({ name, address, slug, codexHR }) => (
                          <SelectItem key={slug} value={codexHR}>
                            <div className="flex flex-col items-start">
                              <span className="text-sm font-semibold">
                                {name}
                              </span>
                              <span className="text-xs">{address}</span>
                            </div>
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Moneda de Monto */}
            <FormField
              control={formReclamo.control}
              name="moneda"
              render={({ field }) => (
                <FormItem className="col-span-2 md:col-span-1">
                  <FormLabel className="font-bold">Moneda</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona una moneda" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="pen">S/. (PEN)</SelectItem>
                      <SelectItem value="usd">$ (USD)</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Monto Reclamado */}
            <FormField
              control={formReclamo.control}
              name="importeBien"
              render={({ field }) => (
                <FormItem className="col-span-2 md:col-span-1">
                  <FormLabel className="font-bold">Monto Reclamado</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="0.00"
                      {...field}
                      onChange={(e) =>
                        field.onChange(parseFloat(e.target.value))
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Descripción */}
            <FormField
              control={formReclamo.control}
              name="descripcionBien"
              render={({ field }) => (
                <FormItem className="col-span-2">
                  <FormLabel className="font-bold">
                    Descripción de compra
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Ingresa el detalle del producto o servicio"
                      className="resize-y"
                      {...field}
                      onChange={(e) =>
                        handleTextareaChange(e, "descripcionBien", 220)
                      }
                      maxLength={220}
                    />
                  </FormControl>
                  <FormDescription>
                    Caracteres restantes: {charCounts.descripcionBien}
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <h2 className="font-bold text-base md:text-lg md:col-span-2 mt-5 md:mt-10">
            3. Detalle de la Reclamación y/o Pedido del Consumidor
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-4 p-2">
            {/* Tipo de Solicitud */}
            <FormField
              control={formReclamo.control}
              name="tipoSolicitud"
              render={({ field }) => (
                <FormItem className="col-span-2 md:col-span-1">
                  <FormLabel className="font-bold">Tipo de Solicitud</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-row md:flex-col gap-8 md:gap-1"
                    >
                      <FormItem className="space-x-2">
                        <FormControl>
                          <RadioGroupItem value="reclamo" />
                        </FormControl>
                        <FormLabel className="font-normal">Reclamo</FormLabel>
                      </FormItem>
                      <FormItem className="space-x-2">
                        <FormControl>
                          <RadioGroupItem value="queja" />
                        </FormControl>
                        <FormLabel className="font-normal">Queja</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex flex-col gap-5 justify-end md:-ml-80">
              <p className="text-sm md:text-xs">
                <strong>Reclamo:</strong> Disconformidad relacionada a la
                caldiad de los productos y/o servicios.
              </p>
              <p className="text-sm md:text-xs">
                <strong>Queja:</strong> Malestar o descontento respecto a la
                atención.
              </p>
            </div>

            {/* Detalle de Solicitud */}
            <FormField
              control={formReclamo.control}
              name="detalleSolicitud"
              render={({ field }) => (
                <FormItem className="col-span-2">
                  <FormLabel className="font-bold">
                    Detalle de Solicitud
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Ingresa el detalle del reclamo o queja"
                      className="resize-y"
                      {...field}
                      rows={4}
                      onChange={(e) =>
                        handleTextareaChange(e, "detalleSolicitud", 500)
                      }
                      maxLength={500}
                    />
                  </FormControl>
                  <FormDescription>
                    Caracteres restantes: {charCounts.detalleSolicitud}
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Pedido de Solicitud */}
            <FormField
              control={formReclamo.control}
              name="pedidoSolicitud"
              render={({ field }) => (
                <FormItem className="col-span-2">
                  <FormLabel className="font-bold">Pedido</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Ingresa el pedido del reclamo o queja"
                      className="resize-y"
                      {...field}
                      rows={4}
                      onChange={(e) =>
                        handleTextareaChange(e, "pedidoSolicitud", 430)
                      }
                      maxLength={430}
                    />
                  </FormControl>
                  <FormDescription>
                    Caracteres restantes: {charCounts.pedidoSolicitud}
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Conformidad */}
          <FormField
            control={formReclamo.control}
            name="isConforme"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center space-x-3 space-y-0 col-span-2 my-5 p-2">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>
                    Me encuentro conforme con los términos de mi reclamos y
                    queja
                  </FormLabel>
                  <FormDescription>
                    Aceptas nuestros{" "}
                    <Link
                      href="/legal/terminos-condiciones"
                      className="hover:text-black hover:font-semibold"
                    >
                      Términos de servicio y Política
                    </Link>{" "}
                    de privacidad.
                  </FormDescription>
                </div>
              </FormItem>
            )}
          />

          {/* Legal, autorización de datos personales */}
          <div className="flex flex-col gap-3 mt-5 text-left my-5">
            <p className="text-sm text-gray-500 leading-tight">
              * La formulación del reclamo no impide acudir a otras vías de
              solución de controversias, ni es requisito para interponer una
              denuncia ante el INDECOPI.
            </p>
            <p className="text-sm text-gray-500 leading-tight">
              * El proveedor deberá dar respuesta al reclamo en un plazo no
              mayor a 15 días hábiles, pudiendo ampliaar el plazo hasta por
              treinta (30) días más, previa comunicación al consumidor.
            </p>
            <p className="text-sm text-gray-500 leading-tight">
              * En caso de que el consumidor no consigne como mínimo su nombre,
              DNI, domicilio o correo electrónico, fecha de reclamo o queja y el
              detalle de los mismo, estos se considerarán como no presentados.
            </p>
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full md:col-span-2 bg-blueInka"
          >
            {isLoading ? (
              <>
                <LoadingIcon />
                Generando...
              </>
            ) : (
              <>
                Generar Reclamo
                <OctagonAlert className="ml-2 w-5 h-5" />
              </>
            )}
          </Button>

          {/* <Button
            type="button"
            variant="destructive"
            onClick={() => imprimirPDF(formReclamo.getValues())}
          >
            Test PDF
          </Button> */}
        </form>
      </Form>
    </>
  );
}
