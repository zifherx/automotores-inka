"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Send, X } from "lucide-react";

import { useCovers } from "@/context/covers/coverContext";
import { UploadButton } from "@/utils/uploadthing";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { LoadingIcon } from "@/components/Shared/LoadingIcon";

import { formAddCoverSchema, PortadasFormValues } from "@/forms";
import { tFormGeneric } from "@/types";

export function FormPortada({ onSubmit, portada }: tFormGeneric) {
  const { createCover, updateCover, isLoading } = useCovers();
  const [imageUploaded, setImageUploaded] = useState(false);
  const [linkImagen, setLinkImagen] = useState<string>("");

  const form = useForm<PortadasFormValues>({
    resolver: zodResolver(formAddCoverSchema),
    defaultValues: {
      name: "",
      slug: "",
      imageUrl: "",
      isActive: false,
    },
  });

  useEffect(() => {
    if (portada) {
      form.reset({
        name: portada.name,
        slug: portada.slug,
        imageUrl: portada.imageUrl,
        isActive: portada.isActive,
      });
    }
  }, [portada, form]);

  useEffect(() => {
    if (portada) {
      setLinkImagen(portada.imageUrl);
      setImageUploaded(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onFormSubmit = async (values: PortadasFormValues) => {
    if (portada) {
      await updateCover(portada._id, values);
    } else {
      await createCover(values);
    }
    onSubmit();
  };

  const handleImageUpload = (res: any) => {
    if (res && res[0]) {
      setLinkImagen(res[0].url);
      form.setValue("imageUrl", res[0].url);
      setImageUploaded(true);
    }
  };

  const handleImageDelete = () => {
    setLinkImagen("");
    form.setValue("imageUrl", "");
    setImageUploaded(false);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onFormSubmit)} className="space-y-4">
        {/* Name */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre</FormLabel>
              <FormControl>
                <Input placeholder="Nombre de la portada" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-[60%,1fr] gap-x-4">
          {/* Slug */}
          <FormField
            control={form.control}
            name="slug"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Slug</FormLabel>
                <FormControl>
                  <Input placeholder="Slug de la portada" {...field} />
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
                <FormLabel>Estado</FormLabel>
                <FormControl>
                  <div className="flex items-center gap-2 pt-2">
                    <Switch
                      id="formSwitch"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                    <Label htmlFor="formSwitch">
                      {field.value ? `Activo ✅` : `Inactivo ❌`}
                    </Label>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* ImageUrl */}
        <FormField
          control={form.control}
          name="imageUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Imagen de Portada</FormLabel>
              <FormControl>
                <div className="space-y-4">
                  {!imageUploaded ? (
                    <UploadButton
                      className="rounded-lg bg-slate-600/20 text-slate-800 outline-dotted outline-1"
                      endpoint="imageUploaded"
                      onClientUploadComplete={handleImageUpload}
                      onUploadError={(err: Error) => {
                        console.log(err);
                      }}
                      {...field}
                    />
                  ) : (
                    <div className="flex items-center space-x-2">
                      <p className="px-2 py-1 text-sm bg-green-700 text-white rounded-xl text-center">
                        Imagen cargada! 👍
                      </p>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="hover:bg-redInka hover:text-white"
                        onClick={handleImageDelete}
                      >
                        <X className="h-4 w-4" strokeWidth={2} />
                      </Button>
                    </div>
                  )}
                  {linkImagen && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={linkImagen}
                      alt="Imagen cargada"
                      className="mt-2 max-w-xs rounded-md mx-auto"
                    />
                  )}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? (
            <>
              <LoadingIcon effect="default" />
              Cargando...
            </>
          ) : (
            <>
              <Send className="h-5 w-5 mr-2" strokeWidth={2} />
              {portada ? "Actualizar" : "Guardar"}
            </>
          )}
        </Button>
      </form>
    </Form>
  );
}
