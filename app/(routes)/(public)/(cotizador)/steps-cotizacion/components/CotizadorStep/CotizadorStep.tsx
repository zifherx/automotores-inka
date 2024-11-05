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

import { cn } from "@/lib";
import { iBrand, iModelo } from "@/types";
import {
  CotizacionGeneralFormValues,
  formCotizacionGeneralSchema,
} from "@/forms";
import { Form } from "@/components/ui/form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";

export function CotizadorStep() {
  const [step, setStep] = useState(1);
  const [showPanel, setShowPanel] = useState(false);
  const [selectedModel, setSelectedModel] = useState<iModelo | null>(null);
  const [brands, setBrands] = useState<iBrand[]>([]);
  const [models, setModels] = useState<iModelo[]>([]);

  const formGeneral = useForm<CotizacionGeneralFormValues>({
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

  useEffect(() => {
    getBrands();
    getModelos();
  }, []);

  useEffect(() => {
    setShowPanel(step > 1);
  }, [step]);

  const handleNext = () => {
    setStep(step + 1);
  };

  const handlePrevious = () => {
    setStep(step - 1);
  };

  const onSubmit = (values: CotizacionGeneralFormValues) => {
    console.log(values);
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="flex flex-col items-center p-2 ">
            <CardTitle className="text-center text-4xl mb-5">
              <p className="font-headBold">Elige la marca y modelo</p>
              <p className="font-headLight">del vehículo que quieres</p>
            </CardTitle>
            <Tabs defaultValue={brands[0]!.slug} className="w-full space-y-5">
              <TabsList className="w-full flex flex-row gap-1">
                {brands.filter(marca => marca.isActive).map(({ slug, name, _id }) => (
                  <TabsTrigger key={_id} value={slug}>
                    {name}
                  </TabsTrigger>
                ))}
              </TabsList>
              {brands.length > 0 &&
                brands.map(({ slug, _id }) => (
                  <TabsContent key={_id} value={slug}>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {models
                        .filter(
                          ({ marca, isActive }) =>
                            marca.slug === slug && isActive
                        )
                        .map((model) => (
                          <Card
                            key={model._id}
                            className={cn(
                              "cursor-pointer",
                              selectedModel?.slug === model.slug
                                ? "ring-2 ring-blueInka"
                                : ""
                            )}
                            onClick={() => {
                              setSelectedModel(model);
                              formGeneral.setValue("modelo", model.slug);
                            }}
                          >
                            <CardContent className="p-4">
                              <Image
                                src={model.imageUrl}
                                alt={model.name}
                                width={200}
                                height={200}
                                className="w-full h-[200px] object-contain mb-2"
                                priority
                              />
                              <h3 className="font-bold">{model.name}</h3>

                            </CardContent>
                          </Card>
                        ))}
                    </div>
                  </TabsContent>
                ))}
            </Tabs>
          </div>
        );
      case 2:
        return <div></div>;
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
            title="Elige tu modelo"
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
            title="Selecciona tu ubicación"
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
            title="Ingresa tus datos"
            isActive={step >= 3}
          />
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-10  border-2 border-pink-500">
        <Card
          className={cn(
            "w-full mt-10 bg-transparent border-none",
            showPanel ? "w-2/3" : "w-full"
          )}
        >
          <CardContent>
            <Form {...formGeneral}>
              <form
                onSubmit={formGeneral.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                {renderStep()}
              </form>
            </Form>
          </CardContent>
          <CardFooter className="flex justify-between">
            {step > 1 && <Button onClick={handlePrevious}>Anterior</Button>}
            {step < 3 ? (
              <Button onClick={handleNext}>Siguiente</Button>
            ) : (
              <Button onClick={() => console.log("Enviar formulario")}>
                Cotizar
              </Button>
            )}
          </CardFooter>
        </Card>
        {showPanel && <Card className=""></Card>}
      </div>
    </div>
  );
}
