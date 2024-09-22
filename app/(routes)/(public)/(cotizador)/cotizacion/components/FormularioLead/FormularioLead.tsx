"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import axios from "axios";

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

import { Loader2, Send, Sparkles } from "lucide-react";
import { CotizacionModeloFormValue, formCotizacionModeloSchema } from "@/forms";
import { iSideFormMarca } from "@/types";

export function FormularioLead(props: iSideFormMarca) {
  const { model, listDepartamentos } = props;
  const router = useRouter();

  const listTesting = listDepartamentos[0];

  const [sede, setSede] = useState<any>("");
  const [concesionario, setConcesionario] = useState("");
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

  const onSubmit = async (values: CotizacionModeloFormValue) => {
    setIsLoading(true);
    try {
      //   console.log(values);
      const query = await axios.post("api/send", {
        ...values,
        departamento: sede,
        concesionario: concesionario.toUpperCase().replace(/-/g, " "),
        marca: model.marca.name,
        carroceria: model.carroceria.name,
        modelo: model.name,
        imageUrl: model.imageUrl,
        precioBase: model.precioBase,
      });

      setIsLoading(false);
      if (query.status === 200) {
        setIsLoading(false);
        //   router.push(`/gracias/${query.data.id}`);
      }
    } catch (err) {
      console.log(err);
      setIsLoading(false);
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
    <div className="p-4 my-10 md:my-0 md:p-10 border rounded-xl md:border-none md:rounded-none">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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

          {/* Departamento */}
          <FormField
            control={form.control}
            name="departamento"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-headMedium">Sede</FormLabel>
                <Select
                  onValueChange={(value) => {
                    setSede(value);
                    setConcesionario("");
                    return value;
                  }}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccione una sede" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Chiclayo">Chiclayo</SelectItem>
                    <SelectItem value="Chimbote">Chimbote</SelectItem>
                    <SelectItem value="Lima">Lima</SelectItem>
                    <SelectItem value="Trujillo">Trujillo</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Concesionario */}
          {sede && (
            <FormField
              control={form.control}
              name="concesionario"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-headMedium">
                    Concesionario
                  </FormLabel>
                  <Select
                    onValueChange={(value) => {
                      setConcesionario(value);
                      return value;
                    }}
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
                          Sede {sede}
                        </SelectLabel>
                        {listTesting[sede].map(({ address, name, slug }) => (
                          <SelectItem key={slug} value={slug}>
                            <div className="flex flex-col items-start">
                              <p className="font-semibold">{name}</p>
                              <small>{address}</small>
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

          <p className="leading-tight font-textMedium">
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
            // disabled={!isValid}
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
