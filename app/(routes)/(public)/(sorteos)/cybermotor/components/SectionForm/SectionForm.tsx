"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";

import { CybermotorFormValues, formCybermotorSchema } from "@/forms";
import { TimelineStep } from "@/app/(routes)/(public)/(cotizador)/steps-cotizacion2/components/TimelineStep";
import { cn, onToast } from "@/lib";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Save } from "lucide-react";
import { Input } from "@/components/ui/input";
import { DiceGame } from "../DiceGame";
import { useRouter } from "next/navigation";

export function SectionForm() {
  const [step, setStep] = useState(1);
  const [resultadoDado, setResultadoDado] = useState<number>(0);
  const [resultadoPremio, setResultadoPremio] = useState<string>("");

  const router = useRouter();

  const formGeneral = useForm<CybermotorFormValues>({
    resolver: zodResolver(formCybermotorSchema),
    defaultValues: {
      name: "",
      documento: "",
      celular: "",
      email: "",
    },
  });

  const handleNext = () => {
    setStep(step + 1);
  };

  const handlePrevious = () => {
    setStep(step - 1);
  };

  const onSubmit = async (values: CybermotorFormValues): Promise<void> => {
    // console.log(resultadoDado);
    const objConcurso = {
      ...values,
      resultado: resultadoDado,
      premio: resultadoPremio,
    };
    // console.log('Llamado desde el padre:',objConcurso);
    try {
      const query = await axios.post("/api/cybermotor", objConcurso);
      if (query.status === 200) {
        onToast(query.data.message);
        const timer = setTimeout(() => {
          router.push("/");
        }, 5000);
      }
    } catch (err) {
      console.log(err);
      onToast("Algo salió mal ❌", "", true);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-4">
            {/* Nombre */}
            <FormField
              control={formGeneral.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-headMedium">
                    Nombre Completo
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Nombre completo" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Documento */}
            <FormField
              control={formGeneral.control}
              name="documento"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-headMedium">DNI</FormLabel>
                  <FormControl>
                    <Input placeholder="10109802" {...field} maxLength={8} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Celular */}
            <FormField
              control={formGeneral.control}
              name="celular"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-headMedium">Celular</FormLabel>
                  <FormControl>
                    <Input placeholder="991651321" {...field} maxLength={9} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Email */}
            <FormField
              control={formGeneral.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-headMedium">E-mail</FormLabel>
                  <FormControl>
                    <Input placeholder="abc@email.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        );
      case 2:
        return (
          <div>
            <DiceGame
              resultado={resultadoDado}
              setResultado={setResultadoDado}
              premio={resultadoPremio}
              setPremio={setResultadoPremio}
              guardarRuedo={formGeneral.handleSubmit(onSubmit)}
            />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="mx-auto p-4">
      {/* STEPS */}
      <div className="">
        <div className="flex justify-between items-center max-w-2xl mx-auto">
          <TimelineStep
            number={1}
            title="Llena tus datos"
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
          <TimelineStep number={2} title="Juega y Gana" isActive={step >= 2} />
        </div>
      </div>

      {/* CONTENT */}
      <Card className="w-full md:w-[500px] mx-auto mt-14 pt-4 px-2 shadow-none">
        <CardContent>
          <Form {...formGeneral}>
            <form
              onSubmit={formGeneral.handleSubmit(onSubmit)}
              className="space-y-6"
            >
              {renderStep()}
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex justify-between">
          {step > 1 && (
            <Button
              onClick={handlePrevious}
              className="bg-blueInka text-white hover:bg-blueInka hover:font-bold transition-transform"
            >
              <ChevronLeft className="w-4 h-4 mr-2" strokeWidth={2} />
              Anterior
            </Button>
          )}
          {step === 1 && (
            <Button
              onClick={handleNext}
              className="bg-blueInka text-white hover:bg-blueInka hover:font-bold transition-transform"
            >
              Siguiente
              <ChevronRight className="w-4 h-4 ml-2" strokeWidth={2} />
            </Button>
          )}
          {/* {
            step === 2 && 
          <Button onClick={formGeneral.handleSubmit(onSubmit)} className="bg-blueInka text-white font-bold hover:bg-blueInka">
            Enviar
            <Save className="w-4 h-4 ml-2" strokeWidth={2}/>
          </Button>
          } */}
        </CardFooter>
      </Card>
    </div>
  );
}
