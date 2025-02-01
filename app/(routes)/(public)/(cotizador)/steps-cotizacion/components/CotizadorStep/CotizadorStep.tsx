/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";

import { TimelineStep } from "../TimelineStep";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { cn, formatPENPrice, formatUSDPrice, onToast } from "@/lib";
import { iBrand, iModelo, iSede } from "@/types";
import {
  CotizacionGeneralFormValues,
  formCotizacionGeneralSchema,
} from "@/forms";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  ChevronLeft,
  ChevronRight,
  Loader2,
  Send,
  Sparkles,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { BrandGrid } from "../BrandGrid";

export function CotizadorStep() {
  const [step, setStep] = useState(1);
  const [showPanel, setShowPanel] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingAnimation, setLoadingAnimation] = useState<
    "default" | "sparkles" | "pulse"
  >("sparkles");
  // Marca Seleccionada
  const [selectedBrand, setSelectedBrand] = useState<iBrand | null>(null);
  // Vehículo Seleccionado
  const [selectedModel, setSelectedModel] = useState<iModelo | null>(null);
  // Step 01
  const [brands, setBrands] = useState<iBrand[]>([]);
  const [models, setModels] = useState<iModelo[]>([]);
  // Step 02
  const [ciudades, setCiudades] = useState<iSede[]>([]);
  const [concesionarios, setConcesionarios] = useState<iSede[]>([]);

  const router = useRouter();

  // Step 03
  const formSteps = useForm<CotizacionGeneralFormValues>({
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
      setBrands(query.data.obj);
    }
  };

  const getModelos = async () => {
    const query = await axios.get("/api/modelo");
    if (query.status === 200) {
      setModels(query.data.obj);
    }
  };

  const getCityByBrand = async (brand: string) => {
    if (brand !== "" || brand !== undefined) {
      const query = await axios.get(`/api/sucursal/by-marca/${brand}`);
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

  const watchCiudad = formSteps.watch("departamento");
  const watchConcesionario = formSteps.watch("concesionario");

  useEffect(() => {
    getBrands();
    getModelos();
  }, []);

  useEffect(() => {
    setShowPanel(step > 1);
  }, [step]);

  useEffect(() => {
    if (selectedModel !== null) {
      getCityByBrand(selectedModel!.marca.slug);
    }
  }, [selectedModel]);

  const handleNext = () => {
    if (step === 1 && !selectedBrand) {
      formSteps.setError("marca", {
        type: "manual",
        message: "Debe seleccionar una marca",
      });
      return;
    }
    if (step === 2 && !selectedModel) {
      formSteps.setError("modelo", {
        type: "manual",
        message: "Debe seleccionar un modelo",
      });
      return;
    }
    if (step === 3 && !formSteps.getValues("concesionario")) {
      formSteps.setError("concesionario", {
        type: "manual",
        message: "Debe seleccionar una ubicación",
      });
      return;
    }
    setStep(step + 1);
  };

  const handlePrevious = () => {
    setStep(step - 1);
  };

  const onSubmit = async (values: CotizacionGeneralFormValues) => {
    setIsLoading(true);

    const newObj = {
      ...values,
      departamento: watchCiudad,
      concesionario: watchConcesionario.toLocaleUpperCase().replace(/-/g, " "),
      slugConcesionario: watchConcesionario,
      marca: selectedModel!.marca.name,
      carroceria: selectedModel!.carroceria.name,
      modelo: selectedModel!.name,
      slugModelo: selectedModel!.slug,
      imageUrl: selectedModel!.imageUrl,
      precioBase: selectedModel!.precioBase,
    };

    console.log("###PAYLOAD VALUES:", newObj);

    try {
      if (selectedModel !== null) {
        const query = await axios.post("/api/cotizacion", newObj);

        if (query.status === 200) {
          // const envioCorreo = await axios.post("/api/send-email/cotizacion", {
          //   ...values,
          //   departamento: watchCiudad,
          //   concesionario: watchConcesionario.toUpperCase().replace(/-/g, " "),
          //   slugConcesionario: watchConcesionario,
          //   marca: selectedModel!.marca.name,
          //   carroceria: selectedModel!.carroceria.name,
          //   modelo: selectedModel!.name,
          //   slugModelo: selectedModel!.slug,
          //   imageUrl: selectedModel!.imageUrl,
          //   precioBase: selectedModel!.precioBase,
          // });

          // if (envioCorreo.status === 200) {
          setIsLoading(false);
          // onToast("Testing");
          onToast(query.data.message);
          router.push(`/gracias/${query.data.obj._id}`);
          // }
        }
      }
    } catch (err) {
      console.log(err);
      setIsLoading(false);
      onToast("Algo salió mal ❌", "", true);
    }
  };

  const handleBrandSelect = (brand: iBrand) => {
    setSelectedBrand(brand);
    setSelectedModel(null);
    formSteps.setValue("marca", brand.slug);
    formSteps.setValue("modelo", "");
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

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="flex flex-col p-2 items-center">
            <CardTitle className="text-center text-4xl mb-5">
              <p className="font-headBold">Elige la marca</p>
              <p className="font-headLight">del vehículo que quieres</p>
            </CardTitle>
            <BrandGrid
              brands={brands}
              selectedBrand={selectedBrand}
              onSelect={handleBrandSelect}
            />
            {formSteps.formState.errors.marca && (
              <p className="text-sm text-redInka mt-4 font-bold">
                {formSteps.formState.errors.marca.message}
              </p>
            )}
          </div>
        );

      case 2:
        return (
          <div className="flex flex-col p-2 items-center">
            <CardTitle className="text-center text-4xl mb-5">
              <p className="font-headBold">Elige el modelo</p>
              <p className="font-headLight">del vehículo que quieres</p>
            </CardTitle>
            {selectedBrand && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
                {models
                  .filter(
                    (model) =>
                      model.marca.slug === selectedBrand.slug && model.isActive
                  )
                  .map((model) => (
                    <Card
                      key={model._id}
                      className={`cursor-pointer ${
                        selectedModel?.slug === model.slug
                          ? "ring-2 ring-blueInka"
                          : ""
                      }`}
                      onClick={() => setSelectedModel(model)}
                    >
                      <CardContent className="p-4">
                        <Image
                          src={model.imageUrl}
                          alt={model.name}
                          width={200}
                          height={150}
                          priority
                          className="w-full h-auto object-cover mb-2"
                        />
                        <h3 className="font-bold">{model.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {model.carroceria.name}
                        </p>
                        <p className="font-semibold mt-2">
                          Desde {formatUSDPrice(model.precioBase)} o{" "}
                          {formatPENPrice(model.precioBase * 3.8)}
                        </p>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {model.isNuevo && (
                            <span className="bg-cyan-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">
                              Nuevo
                            </span>
                          )}
                          {model.isGLP && (
                            <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">
                              Nuevo
                            </span>
                          )}
                          {model.isLiquidacion && (
                            <span className="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded">
                              Liquidación
                            </span>
                          )}
                          {model.isEntrega48H && (
                            <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                              Entrega 48h
                            </span>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            )}
            {formSteps.formState.errors.modelo && (
              <p className="text-sm text-redInka mt-4 font-bold">
                {formSteps.formState.errors.modelo.message}
              </p>
            )}
          </div>
        );

      case 3:
        return (
          <div className="p-2 space-y-4">
            <CardTitle className="text-center text-4xl mb-5">
              <p className="font-headBold">Selecciona la ubicación</p>
              <p className="font-headLight">donde recogeras tu vehículo</p>
            </CardTitle>

            {/* Sede */}
            <FormField
              control={formSteps.control}
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
              control={formSteps.control}
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

            {formSteps.formState.errors.concesionario && (
              <p className="text-sm text-redInka mt-2 font-bold">
                {formSteps.formState.errors.concesionario.message}
              </p>
            )}
          </div>
        );

      case 4:
        return (
          <div className="p-2 space-y-4">
            {/* Nombre y Apellido */}
            <FormField
              control={formSteps.control}
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
              control={formSteps.control}
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
              control={formSteps.control}
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
              control={formSteps.control}
              name="celular"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-headMedium">Celular</FormLabel>
                  <FormControl>
                    <Input placeholder="Celular" {...field} maxLength={9} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Email */}
            <FormField
              control={formSteps.control}
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

            {/* Intención de compra */}
            <FormField
              control={formSteps.control}
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
              control={formSteps.control}
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
              control={formSteps.control}
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
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-center mb-8">Cotizar</h2>
      <div className="mb-8">
        <div className="flex justify-between items-center max-w-2xl mx-auto">
          <TimelineStep
            number={1}
            title="Elige tu marca"
            isActive={step >= 1}
          />
          <div className="flex-1 h-px bg-muted mx-2">
            <div
              className={cn(
                "h-full bg-blueInka transition-all duration-300 ease-in-out",
                step >= 2 ? "w-full" : "w-0"
              )}
            />
          </div>

          <TimelineStep
            number={2}
            title="Elige tu modelo"
            isActive={step >= 2}
          />
          <div className="flex-1 h-px bg-muted mx-2">
            <div
              className={cn(
                "h-full bg-blueInka transition-all duration-300 ease-in-out",
                step >= 3 ? "w-full" : "w-0"
              )}
            />
          </div>

          <TimelineStep
            number={3}
            title="Selecciona tu ubicación"
            isActive={step >= 3}
          />
          <div className="flex-1 h-px bg-muted mx-2">
            <div
              className={cn(
                "h-full bg-blueInka transition-all duration-300 ease-in-out",
                step >= 4 ? "w-full" : "w-0"
              )}
            />
          </div>

          <TimelineStep
            number={4}
            title="Ingresa tus datos"
            isActive={step >= 4}
          />
        </div>
      </div>

      <div className="flex flex-col-reverse lg:flex-row gap-10">
        <Card
          className={cn(
            "w-full mt-10 bg-transparent border-none",
            showPanel ? "w-full md:w-2/3" : "w-full"
          )}
        >
          <CardContent>
            <Form {...formSteps}>
              <form
                onSubmit={formSteps.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                {renderStep()}
              </form>
            </Form>
          </CardContent>
          <CardFooter className="flex justify-between">
            {step > 1 && (
              <Button onClick={handlePrevious}>
                <ChevronLeft className="w-5 h-5 ml-2" />
                Anterior
              </Button>
            )}
            {step < 4 ? (
              <Button onClick={handleNext}>
                Siguiente
                <ChevronRight className="w-5 h-5 mr-2" />
              </Button>
            ) : (
              <Button
                onClick={formSteps.handleSubmit(onSubmit)}
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <LoadingIcon />
                    Enviando...
                  </>
                ) : (
                  <>
                    Cotizar
                    <Send className="w-5 h-5 ml-2" />
                  </>
                )}
              </Button>
            )}
          </CardFooter>
        </Card>
        {showPanel && (
          <Card className="w-full lg:w-1/3 transition-all duration-300 ease-in-out transform lg:translate-x-0 lg:scale-100 origin-right mt-10">
            <CardHeader>
              <CardTitle>Tu selección:</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              {selectedBrand && (
                <>
                  <p className="font-bold text-left">
                    Marca: {selectedBrand.name}
                  </p>
                </>
              )}
              {selectedModel && (
                <>
                  <Image
                    src={selectedModel.imageUrl}
                    alt={selectedModel.name}
                    width={200}
                    height={150}
                    className="w-full h-auto object-cover mb-2"
                    priority
                  />
                  <h3 className="text-2xl font-bold">{selectedModel.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {selectedModel.carroceria.name}
                  </p>
                  <p className="font-semibold mt-2">
                    Desde {formatUSDPrice(selectedModel.precioBase)} o{" "}
                    {formatPENPrice(selectedModel.precioBase * 3.8)}
                  </p>
                </>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
