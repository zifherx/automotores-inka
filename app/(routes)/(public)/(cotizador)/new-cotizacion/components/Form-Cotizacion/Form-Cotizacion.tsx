/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  Form,
  FormControl,
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
import { ShowingCar } from "../ShowingCar";
import { LoadingCar } from "../LoadingCar";

import { Loader2, Send, Sparkles } from "lucide-react";

import {
  CotizacionGeneralFormValues,
  formCotizacionGeneralSchema,
} from "@/forms";
import { iBrand, iModelo, iSede } from "@/types";
import { onToast } from "@/lib";

export function FormCotizacion() {
  const [listBrands, setListBrands] = useState<iBrand[]>([]);
  const [listModels, setListModels] = useState<iModelo[]>([]);
  const [vehicleSelected, setVehicleSelected] = useState<iModelo | null>(null);

  const [ciudades, setCiudades] = useState<iSede[]>([]);
  const [concesionarios, setConcesionarios] = useState<iSede[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingAnimation, setLoadingAnimation] = useState<
    "default" | "sparkles" | "pulse"
  >("sparkles");

  const router = useRouter();

  const form = useForm<CotizacionGeneralFormValues>({
    resolver: zodResolver(formCotizacionGeneralSchema),
    defaultValues: {
      nombres: "",
      tipoDocumento: "",
      numeroDocumento: "",
      email: "",
      celular: "",
      marca: "",
      modelo: "",
      departamento: "",
      concesionario: "",
      intencionCompra: "",
      checkDatosPersonales: false,
      checkPromociones: "",
    },
  });

  const getBrands = async () => {
    const query = await axios.get("/api/marca");
    if (query.status === 200) {
      setListBrands(query.data.obj);
    }
  };

  const getModelByBrand = async (brand: string) => {
    if (brand !== "" || brand !== undefined) {
      const query = await axios.get(`/api/modelo/find/${brand}`);
      if (query.status === 200) {
        // console.log(query.data);
        setListModels(query.data);
      }
    }
  };

  const getCiudadesByBrand = async (ciudad: string) => {
    if (ciudad !== "" || ciudad !== undefined) {
      const query = await axios.get(`/api/sucursal/by-marca/${ciudad}`);
      if (query.status === 200) {
        const sedesSinDuplicados = query.data.filter(
          (item: any, index: any, self: any) =>
            index === self.findIndex((a: any) => a.ciudad === item.ciudad)
        );
        setCiudades(sedesSinDuplicados);
        setConcesionarios(query.data);
      }
    }
  };

  const watchMarca = form.watch("marca");
  const watchModelo = form.watch("modelo");
  const watchCiudad = form.watch("departamento");
  const watchConcesionario = form.watch("concesionario");

  useEffect(() => {
    getBrands();
  }, []);

  useEffect(() => {
    if (watchMarca) {
      getModelByBrand(watchMarca);
      getCiudadesByBrand(watchMarca);
    }
  }, [watchMarca]);

  useEffect(() => {
    if (watchModelo) {
      const selected = listModels.find((modelo) => modelo.slug === watchModelo);
      setVehicleSelected(selected || null);
    }
  }, [watchModelo]);

  const onSubmit = async (values: CotizacionGeneralFormValues) => {
    setIsLoading(true);
    try {
      if (vehicleSelected !== null) {
        const query = await axios.post("api/cotizacion", {
          ...values,
          departamento: watchCiudad,
          concesionario: watchConcesionario.toUpperCase().replace(/-/g, " "),
          slugConcesionario: watchConcesionario,
          marca: vehicleSelected?.marca.name,
          carroceria: vehicleSelected?.carroceria.name,
          modelo: vehicleSelected?.name,
          slugModelo: vehicleSelected?.slug,
          imageUrl: vehicleSelected?.imageUrl,
          precioBase: vehicleSelected?.precioBase,
        });

        if (query.status === 200) {
          const envioCorreo = await axios.post("/api/send-email/cotizacion", {
            ...values,
            departamento: watchCiudad,
            concesionario: watchConcesionario.toUpperCase().replace(/-/g, " "),
            slugConcesionario: watchConcesionario,
            marca: vehicleSelected.marca.name,
            carroceria: vehicleSelected.carroceria.name,
            modelo: vehicleSelected.name,
            slugModelo: vehicleSelected.slug,
            imageUrl: vehicleSelected.imageUrl,
            precioBase: vehicleSelected.precioBase,
          });

          if (envioCorreo.status === 200) {
            setIsLoading(false);
            onToast(query.data.message);
            router.push(`/gracias/${envioCorreo.data.mail.id}`);
          }
        }
      }
    } catch (err) {
      console.log(err);
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
    <div className="flex flex-col md:grid md:grid-cols-2 gap-10">
      <div className="p-3 my-5 md:my-0 md:p-2 border rounded-xl md:border-none md:rounded-none">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
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
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccione un tipo de documento" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="dni">DNI</SelectItem>
                      <SelectItem value="ruc">RUC</SelectItem>
                      <SelectItem value="carnet de extranjeria">
                        Carnet de Extranjería
                      </SelectItem>
                      <SelectItem value="pasaporte">Pasaporte</SelectItem>
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
                      placeholder="Número de Documento"
                      {...field}
                      type="number"
                    />
                  </FormControl>
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
                    <Input placeholder="Celular" {...field} type="number" />
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
                    <Input placeholder="Email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Marca */}
              <FormField
                control={form.control}
                name="marca"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-headMedium">Marca</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccione un marca" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {listBrands
                          .filter((value) => value.isActive)
                          .map(({ _id, name, slug, imageUrl }) => (
                            <SelectItem key={_id} value={slug}>
                              <div className="flex items-center justify-between gap-4 h-14 w-auto">
                                <img
                                  src={imageUrl}
                                  alt={name}
                                  className="object-contain h-14"
                                />
                                <span className="text-lg font-semibold">
                                  {name}
                                </span>
                              </div>
                            </SelectItem>
                          ))}
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
                    <FormLabel className="font-headMedium">Modelo</FormLabel>
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
                        {listModels.length > 0 &&
                          listModels.map(({ _id, name, slug }) => (
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

            {/* Sede */}
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
                      {ciudades.map(({ _id, ciudad }) => (
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
                        <SelectLabel className="uppercase font-bold">
                          Sede {watchCiudad}
                        </SelectLabel>
                        {watchCiudad &&
                          concesionarios
                            .filter((value) => value.ciudad === watchCiudad)
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
                <FormItem className="flex flex-row items-center space-x-3 space-y-0 px-0 py-2">
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
                      y el tratamiento de mis datos personales a Automotores
                      Inka
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
                  <FormLabel className="text-justify font-textMedium block">
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
                      className="flex flex-col"
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

            <p className="leading-4 font-textMedium py-5">
              La presente cotización se realiza en función a los{" "}
              <a
                href="#"
                target="_blank"
                className="text-redInka hover:font-semibold"
              >
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
      <div>
        {vehicleSelected ? (
          <ShowingCar vehicle={vehicleSelected} />
        ) : (
          <LoadingCar />
        )}
      </div>
    </div>
  );
}
