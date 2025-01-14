"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

import { tFormEditChasis } from "@/types";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChasisFormValues, formAddChasisSchema } from "@/forms";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { LoadingIcon } from "@/components/Shared/LoadingIcon";
import { onToast } from "@/lib";
import { RefreshCw } from "lucide-react";

export function FormEditChasis({ chasis, setOpenDialog }: tFormEditChasis) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const form = useForm<ChasisFormValues>({
    resolver: zodResolver(formAddChasisSchema),
    defaultValues: {
      name: chasis.name,
      slug: chasis.slug,
      isActive: chasis.isActive,
    },
  });

  const onSubmit = async (values: ChasisFormValues) => {
    setIsLoading(true);
    try {
      const query = await axios.patch(`/api/chasis/edit/${chasis._id}`, values);
      if (query.status === 200) {
        onToast(query.data.message);
        setOpenDialog(false);
        router.refresh();
      }
    } catch (err) {
      console.log(err);
      onToast("Algo salió mal ❌", "", true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
        <div className="grid grid-cols-1 gap-2 md:grid-cols-[70%,1fr] md:gap-6 text-left">
          {/* Name */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-headMedium">Carrocería</FormLabel>
                <FormControl>
                  <Input placeholder="Carrocería..." {...field} />
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
              <FormItem>
                <FormLabel className="font-headMedium">Estado</FormLabel>
                <FormControl>
                  <div className="flex gap-2 items-center">
                    <Switch
                      id="formSwitch"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                    <Label htmlFor="formSwitch">
                      {field.value ? `Activo 👍` : `Inactivo 👎`}
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
                <FormLabel className="font-headMedium">Slug</FormLabel>
                <FormControl>
                  <Input placeholder="Slug..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="w-full md:col-span-2 font-headMedium text-lg uppercase bg-black hover:bg-grisDarkInka"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <LoadingIcon effect="default" />
                Actualizando...
              </>
            ) : (
              <>
                Actualizar
                <RefreshCw className="w-5 h-5 ml-2" />
              </>
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}
