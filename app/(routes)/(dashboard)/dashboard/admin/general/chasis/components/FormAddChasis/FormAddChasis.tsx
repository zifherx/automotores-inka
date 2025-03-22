"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import axios from "axios";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { LoadingIcon } from "@/components/Shared/LoadingIcon";

import { onToast } from "@/lib/toastMessage";

import { tFormAdding } from "@/types";
import { ChasisFormValues, formAddChasisSchema } from "@/forms";
import { Send } from "lucide-react";

export function FormAddChasis({ setOpenDialog }: tFormAdding) {
  const [btnLoading, setBtnLoading] = useState(false);
  const router = useRouter();

  const form = useForm<ChasisFormValues>({
    resolver: zodResolver(formAddChasisSchema),
    defaultValues: {
      name: "",
      slug: "",
      isActive: true,
    },
  });

  const onSubmit = async (values: ChasisFormValues) => {
    setBtnLoading(true);
    try {
      const query = await axios.post("/api/chasis", values);
      if (query.status === 200) {
        onToast(query.data.message);
        setOpenDialog(false);
        router.refresh();
      }
    } catch (er) {
      onToast("Algo salió mal ❌", "", true);
    } finally {
      setBtnLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid gap-6 grid-cols-2">
          {/* Name */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-headMedium">Carrocería</FormLabel>
                <FormControl>
                  <Input placeholder="Chasis..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* isActive */}
          <FormField
            control={form.control}
            name="isActive"
            render={({ field }) => (
              <FormItem className="">
                <FormLabel className="font-headMedium">Estado</FormLabel>
                <FormControl>
                  <div className="flex gap-2 pt-1 items-center">
                    <Switch
                      id="formSwitch"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                    <Label htmlFor="formSwitch">
                      {field.value ? "Activo 👍" : "Inactivo 👎"}
                    </Label>
                  </div>
                </FormControl>
              </FormItem>
            )}
          />
          {/* Slug */}
          <FormField
            control={form.control}
            name="slug"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-headMedium">
                  Slug de Chasis
                </FormLabel>
                <FormControl>
                  <Input placeholder="Slug..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="w-full col-span-2 font-headMedium text-xl uppercase bg-black hover:bg-grisDarkInka"
            disabled={btnLoading}
          >
            {btnLoading ? (
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
        </div>
      </form>
    </Form>
  );
}
