/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Loader2, Send, Sparkles } from "lucide-react";

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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

import { getRouteForModel, onToast } from "@/lib";
import { listTipoServicio } from "@/data";
import { iBrand, iModelo, iSede } from "@/types";
import {
  formServicioMantenimientoSchema,
  SolicitudServicioFormValues,
} from "@/forms";

export function FormMantenimiento() {
  const router = useRouter();

  const [listaSedes, setListaSedes] = useState<iSede[]>([]);
  const [listaConcesionarios, setListaConcesionarios] = useState<iSede[]>([]);
  const [listaMarcas, setListaMarcas] = useState<iBrand[]>([]);
  const [listaMarcasDisponibles, setListaMarcasDisponibles] = useState<
    iBrand[]
  >([]);
  const [listaModelos, setListaModelos] = useState<iModelo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingAnimation, setLoadingAnimation] = useState<
    "default" | "sparkles" | "pulse"
  >("sparkles");

  const form = useForm<SolicitudServicioFormValues>({
    resolver: zodResolver(formServicioMantenimientoSchema),
    defaultValues: {
      nombres: "",
      tipoDocumento: undefined,
      numeroDocumento: "",
      placa: "",
      kilometraje: "",
      celular: "",
      correo: "",
      marca: "",
      modelo: "",
      tipoServicio: "",
      sede: "",
      concesionario: "",
      comentario: "",
      checkDatosPersonales: false,
      checkPromociones: "",
    },
  });

  const watchUser = form.watch("nombres");
  const tipoDocumento = form.watch("tipoDocumento");
  const watchMarca = form.watch("marca");
  const sedeSelected = form.watch("sede");

  const getSucursales = async () => {
    let sedesSinDuplicados;
    const query = await axios.get("/api/sucursal");
    if (query.status === 200) {
      sedesSinDuplicados = query.data.obj.filter(
        (item: any, index: any, self: any) =>
          index === self.findIndex((a: any) => a.ciudad === item.ciudad)
      );
      setListaSedes(sedesSinDuplicados);
      setListaConcesionarios(query.data);
    }
  };

  const getBrands = async () => {
    const query = await axios.get("/api/marca");
    if (query.status === 200) {
      setListaMarcas(query.data);
    }
  };

  const getModelByBrand = async (marca: string) => {
    const query = await axios.get(`/api/modelo/find/${marca}`);
    if (query.status === 200) {
      setListaModelos(query.data);
    }
  };

  useEffect(() => {
    getSucursales();
    getBrands();
  }, []);

  useEffect(() => {
    let marcasDuplicadas: iBrand[] = [];
    if (sedeSelected) {
      const filtrandoMarcas = listaConcesionarios
        .filter((sede) => sede.ciudad.toLowerCase() === sedeSelected)
        .map((item) => item.marcasDisponibles);
      marcasDuplicadas = filtrandoMarcas.flat();
      const uniqueBrands = marcasDuplicadas.filter((marca, index) => {
        return (
          marcasDuplicadas.findIndex((m) => m.slug === marca.slug) === index
        );
      });

      setListaMarcasDisponibles(uniqueBrands);
    }
  }, [sedeSelected]);

  useEffect(() => {
    if (watchMarca) {
      getModelByBrand(watchMarca);
    }
  }, [watchMarca]);

  const validateDocumentLength = (value: string) => {
    if (!tipoDocumento) return true;

    switch (tipoDocumento) {
      case "RUC":
        return value.length === 11;
      case "DNI":
        return value.length === 8;
      case "Pasaporte":
        return value.length === 15;
      default:
        return true;
    }
  };

  form.register("numeroDocumento", {
    validate: validateDocumentLength,
  });

  const onSubmit = async (values: SolicitudServicioFormValues) => {
    setIsLoading(true);

    try {
      const query = await axios.post("/api/citas", { ...values });

      if (query.status === 200) {
        setIsLoading(false);
        onToast(query.data.message);
        router.push(`/posventa/gracias/${getRouteForModel(watchUser)}`);
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
    <div className="p-4 md:p-6 border rounded-xl md:border-none md:rounded-none">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {/* Nombres */}
          <FormField
            control={form.control}
            name="nombres"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-headMedium">
                  Nombre y Apellido
                </FormLabel>
                <FormControl>
                  <Input
                    className="text-black"
                    placeholder="Nombre completo"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 md:gap-4">
            {/* Tipo de Documento */}
            <FormField
              control={form.control}
              name="tipoDocumento"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tipo de Documento</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccione tipo de documento" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="RUC">RUC</SelectItem>
                      <SelectItem value="DNI">DNI</SelectItem>
                      <SelectItem value="Pasaporte">Pasaporte</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Numero de Documento */}
            <FormField
              control={form.control}
              name="numeroDocumento"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Número de Documento</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Ingrese su número de documento"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    {tipoDocumento === "RUC" && "Debe tener 11 dígitos"}
                    {tipoDocumento === "DNI" && "Debe tener 8 dígitos"}
                    {tipoDocumento === "Pasaporte" &&
                      "Debe tener hasta 15 dígitos"}
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 md:gap-4">
            {/* Celular */}
            <FormField
              control={form.control}
              name="celular"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Celular</FormLabel>
                  <FormControl>
                    <Input
                      type="tel"
                      placeholder="Ingrese su número de celular"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Correo */}
            <FormField
              control={form.control}
              name="correo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Correo</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="Ingrese su correo electrónico"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 md:gap-4">
            {/* Placa */}
            <FormField
              control={form.control}
              name="placa"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Placa</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Ingrese la placa del vehículo"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Placa */}
            <FormField
              control={form.control}
              name="kilometraje"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Kilometraje</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Ingrese el kilometraje de tu unidad"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Sede */}
          <FormField
            control={form.control}
            name="sede"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Sede</FormLabel>
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
                    {listaSedes.length > 0 &&
                      listaSedes
                        .filter((value) => value.isActive)
                        .map(({ _id, ciudad }) => (
                          <SelectItem key={_id} value={ciudad.toLowerCase()}>
                            {ciudad}
                          </SelectItem>
                        ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 md:gap-4">
            {/* Marca */}
            <FormField
              control={form.control}
              name="marca"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Marca</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccione una marca" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {sedeSelected !== "" &&
                        listaMarcasDisponibles.map(
                          ({ _id, name, slug, imageUrl }) => (
                            <SelectItem key={_id} value={slug}>
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

            {/* Modelo */}
            <FormField
              control={form.control}
              name="modelo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Modelo</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccione un modelo" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {listaModelos.length > 0 &&
                        listaModelos.map(({ _id, name, slug }) => (
                          <SelectItem key={_id} value={slug}>
                            {name}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 md:gap-4">
            {/* Concesionario */}
            <FormField
              control={form.control}
              name="concesionario"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Concesionario</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccione un concesionario" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {sedeSelected &&
                        listaConcesionarios.length > 0 &&
                        listaConcesionarios
                          .filter(
                            (value) =>
                              value.ciudad.toLowerCase() === sedeSelected &&
                              value.marcasDisponibles.some(
                                (item) => item.slug === watchMarca
                              )
                          )
                          .map(({ _id, name, address, slug }) => (
                            <SelectItem key={_id} value={slug}>
                              <div className="flex flex-col items-start">
                                <p className="font-semibold">{name}</p>
                                <small>{address}</small>
                              </div>
                            </SelectItem>
                          ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Tipo de Servicio */}
            <FormField
              control={form.control}
              name="tipoServicio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tipo de Servicio</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccione tipo de servicio" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {listTipoServicio.map(({ id, label, value }) => (
                        <SelectItem key={id} value={value}>
                          {label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Comentario */}
          <FormField
            control={form.control}
            name="comentario"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Comentario</FormLabel>
                <FormControl>
                  <Textarea placeholder="Ingrese su comentario" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Check Datos Personales */}
          <FormField
            control={form.control}
            name="checkDatosPersonales"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center space-x-3 space-y-0 px-0 py-4">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    color="#1B5094"
                  />
                </FormControl>
                <div className="space-y-1 text-xs leading-tight">
                  <FormLabel>
                    Mediante el envío del formulario declaro que he leído la
                    autorización y acepto la{" "}
                    <a
                      href="/legal/terminos-condiciones"
                      target="_blank"
                      className="text-redInka hover:font-semibold"
                    >
                      Política de Protección de Datos Personales
                    </a>{" "}
                    y el tratamiento de mis datos personales a Automotores Inka
                  </FormLabel>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Autorización a promociones */}
          <FormField
            control={form.control}
            name="checkPromociones"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-justify font-textMedium leading-tight">
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
                    className="flex flex-col space-y-1 pb-5"
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
