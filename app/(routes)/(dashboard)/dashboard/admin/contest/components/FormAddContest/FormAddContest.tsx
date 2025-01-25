"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";
import { format } from "date-fns";
import axios from "axios";

import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { LoadingIcon } from "@/components/Shared/LoadingIcon";

import { onToast } from "@/lib/toastMessage";
import { tFormAdding } from "@/types";
import { ContestFormValues, formContestSchema } from "@/forms";
import { Textarea } from "@/components/ui/textarea";
import {
  CalendarIcon,
  Loader2,
  Minus,
  OctagonAlert,
  Plus,
  Sparkles,
} from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib";
import { Calendar } from "@/components/ui/calendar";
import { ScrollArea } from "@/components/ui/scroll-area";

export function FormAddContest(props: tFormAdding) {
  const { setOpenDialog } = props;
  const [isLoading, setIsLoading] = useState(false);
  const [loadingAnimation, setLoadingAnimation] = useState<
    "default" | "sparkles" | "pulse"
  >("default");

  const router = useRouter();

  const formConcurso = useForm<ContestFormValues>({
    resolver: zodResolver(formContestSchema),
    defaultValues: {
      codex: uuidv4(),
      title: "",
      bases: "",
      premios: [],
      fechaConcurso: undefined,
    },
  });

  const {
    fields: premiosFields,
    append: appendPremio,
    remove: removePremio,
  } = useFieldArray({
    control: formConcurso.control,
    name: "premios",
  });

  const onSubmit = async (values: ContestFormValues) => {
    setIsLoading(true);
    console.log(values);

    try {
      const query = await axios.post("/api/concurso", {
        ...values,
        fechaConcurso: new Date(values.fechaConcurso),
      });

      if (query.status === 200) {
        onToast(`${query.data.message} ✅`);
        setIsLoading(false);
        setOpenDialog(false);
        router.refresh();
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
    <ScrollArea className="w-full md:h-[600px]">
      <Form {...formConcurso}>
        <form
          onSubmit={formConcurso.handleSubmit(onSubmit)}
          className="space-y-4"
        >
          {/* Codex */}
          <FormField
            control={formConcurso.control}
            name="codex"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-headMedium">Codex</FormLabel>
                <FormControl>
                  <Input placeholder="Codex..." {...field} disabled />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Title */}
          <FormField
            control={formConcurso.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-headMedium">Título</FormLabel>
                <FormControl>
                  <Input placeholder="Título..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Bases */}
          <FormField
            control={formConcurso.control}
            name="bases"
            render={({ field }) => (
              <FormItem className="col-span-2">
                <FormLabel className="font-bold">Bases</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Ingresa las bases del concurso"
                    className="resize-y"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Premios */}
          <div className="flex flex-col gap-2 rounded border p-2">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold mb-1">Premios</h3>
              <Button
                type="button"
                className="w-fit items-center font-semibold"
                onClick={() =>
                  appendPremio({
                    name: "",
                  })
                }
              >
                Agregar Premio
                <Plus className="w-5 h-5 ml-2" />
              </Button>
            </div>
            {premiosFields.map((field, index) => (
              <div
                key={field.id}
                className="space-y-2 p-2 border rounded-mb mb-4"
              >
                {/* Nombre Premio */}
                <FormField
                  control={formConcurso.control}
                  name={`premios.${index}.name`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-headMedium">
                        Nombre del Premio
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="Premio..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="button" onClick={() => removePremio(index)}>
                  Quitar Premio
                  <Minus className="w-5 h-5 ml-2" />
                </Button>
              </div>
            ))}
          </div>

          {/* FechaConcurso */}
          <FormField
            control={formConcurso.control}
            name="fechaConcurso"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel className="font-headMedium">
                  Fecha del Concurso
                </FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Selecciona una fecha</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date > new Date() || date < new Date("1900-01-01")
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full md:col-span-2 bg-blueInka"
          >
            {isLoading ? (
              <>
                <LoadingIcon />
                Guardando...
              </>
            ) : (
              <>
                Crear Concurso
                <OctagonAlert className="ml-2 w-5 h-5" />
              </>
            )}
          </Button>
        </form>
      </Form>
    </ScrollArea>
  );
}
