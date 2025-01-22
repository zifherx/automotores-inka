"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { CalendarIcon, Send } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { LoadingIcon } from "@/components/Shared/LoadingIcon";

import { formTipoCambio, TCambioFormValues } from "@/forms";
import { tFormAdding } from "@/types";
import { cn, fechaHoy, onToast } from "@/lib";

export function FormAddTipoCambio({ setOpenDialog }: tFormAdding) {
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const form = useForm<TCambioFormValues>({
    resolver: zodResolver(formTipoCambio),
    defaultValues: {
      fechaTC: new Date(),
      tipo_cambio: 3.85,
    },
  });

  const onSubmit = async (values: TCambioFormValues) => {
    setIsLoading(true);
    try {
      const query = await axios.post(`/api/tipo-cambio`, {
        ...values,
        fechaTC: fechaHoy(values.fechaTC),
      });
      if (query.status === 200) {
        onToast(query.data.message);
        setOpenDialog(false);
        router.refresh();
      }
    } catch (err: any) {
      onToast("Algo salió mal ❌", err.response.data.message, true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {/* Tipo de cambio */}
        <FormField
          control={form.control}
          name="tipo_cambio"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-headMedium">Tipo de cambio</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  step={0.01}
                  placeholder="3.845"
                  {...field}
                  onChange={(e) => field.onChange(parseFloat(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Fecha */}
        <FormField
          control={form.control}
          name="fechaTC"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel className="font-headMedium">Fecha</FormLabel>
              <Popover modal>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        fechaHoy(field.value)
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
                    className="rounded-md border"
                  />
                </PopoverContent>
              </Popover>
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
              <LoadingIcon effect="default" />
              Guardando...
            </>
          ) : (
            <>
              Guardar
              <Send className="w-5 h-5 ml-2" />
            </>
          )}
        </Button>
      </form>
    </Form>
  );
}
