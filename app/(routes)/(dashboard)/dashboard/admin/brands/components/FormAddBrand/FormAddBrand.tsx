"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Send } from "lucide-react";

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

import { tFormAdding } from "@/types";
import { BrandFormValues, formAddBrandSchema } from "@/forms";

export function FormAddBrand({setOpenDialog}: tFormAdding) {

  const [imageUploaded, setImageUploaded] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);
  const router = useRouter();

  const form = useForm<BrandFormValues>({
    resolver: zodResolver(formAddBrandSchema),
    defaultValues: {
      name: "",
      imageUrl: "",
      slug: "",
      isActive: true,
    },
  });

  const onSubmit = async (values: BrandFormValues) => {
    try {
      const query = await axios.post("/api/marca", values);

      if (query.status === 200) {
        onToast("Marca creada ✅");
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
        <div className="grid grid-cols-2 gap-2 md:gap-6">
          {/* Name */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-headMedium">
                  Nombre de Marca
                </FormLabel>
                <FormControl>
                  <Input placeholder="Marca..." {...field} />
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
                <FormLabel className="font-headMedium">Slug de Marca</FormLabel>
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
                <FormLabel>Imagen de Marca</FormLabel>
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
                        console.log("complete", res);
                        form.setValue("imageUrl", res ? res?.[0].url : "");
                        setImageUploaded(true);
                      }}
                      onUploadError={(err) => {
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
