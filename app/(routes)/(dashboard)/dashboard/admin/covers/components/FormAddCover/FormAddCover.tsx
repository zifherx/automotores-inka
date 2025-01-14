"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Send } from "lucide-react";
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

import { UploadButton } from "@/utils/uploadthing";
import { onToast } from "@/lib/toastMessage";

import { formAddCoverSchema } from "@/forms";
import { tFormAdding } from "@/types";

export function FormAddPortada({ setOpenDialog }: tFormAdding) {
  const [imageUploaded, setImageUploaded] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof formAddCoverSchema>>({
    resolver: zodResolver(formAddCoverSchema),
    defaultValues: {
      name: "",
      imageUrl: "",
      slug: "",
      isActive: true,
    },
  });

  const onSubmit = async (values: z.infer<typeof formAddCoverSchema>) => {
    try {
      const query = await axios.post("/api/portada", values);

      if (query.status === 200) {
        onToast("Portada creada ✅");
        setOpenDialog(false);
        router.refresh();
      }
    } catch (er) {
      onToast("Algo salió mal ❌", "", true);
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
                <FormLabel className="font-headMedium">
                  Nombre de Portada
                </FormLabel>
                <FormControl>
                  <Input placeholder="Nombre..." {...field} />
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
                  Slug de Portada
                </FormLabel>
                <FormControl>
                  <Input placeholder="Slug..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* ImageUrl */}
          <FormField
            control={form.control}
            name="imageUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Imagen de Portada</FormLabel>
                <FormControl>
                  {imageUploaded ? (
                    <p className="text-sm bg-green-700 text-white rounded-xl text-center">
                      Imagen cargada! 👍
                    </p>
                  ) : (
                    <UploadButton
                      className="rounded-lg bg-slate-600/20 text-slate-800 outline-dotted outline-1"
                      {...field}
                      endpoint="imageUploaded"
                      onClientUploadComplete={(res) => {
                        form.setValue("imageUrl", res?.[0].url);
                        setImageUploaded(true);
                      }}
                      onUploadError={(err: Error) => {
                        console.log(err);
                      }}
                    />
                  )}
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="w-full col-span-2 font-headMedium text-xl uppercase bg-black hover:bg-grisDarkInka"
          >
            {btnLoading ? (
              <>
                <LoadingIcon effect="default" />
                Enviando...
              </>
            ) : (
              <>
                Enviar
                <Send className="w-5 h-5 ml-2" />
              </>
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}
