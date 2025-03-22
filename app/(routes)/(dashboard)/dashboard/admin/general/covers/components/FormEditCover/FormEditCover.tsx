"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Send, X } from "lucide-react";

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

import { useCovers } from "@/context/covers/coverContext";

import { UploadButton } from "@/utils/uploadthing";
import { formAddCoverSchema, PortadasFormValues } from "@/forms";
import { tFormEditCover } from "@/types";

export function FormEditPortada({ portada }: tFormEditCover) {
  const { isLoading, updateCover } = useCovers();

  const [imageUploaded, setImageUploaded] = useState(false);
  const [linkImagen, setLinkImagen] = useState<string>("");

  const form = useForm<PortadasFormValues>({
    resolver: zodResolver(formAddCoverSchema),
    defaultValues: {
      name: portada.name,
      slug: portada.slug,
      isActive: portada.isActive,
      imageUrl: portada.imageUrl,
    },
  });

  const actionSubmit = async (values: PortadasFormValues) =>
    updateCover(portada._id, values);

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

  useEffect(() => {
    if (portada.imageUrl !== "") {
      setLinkImagen(portada.imageUrl);
      setImageUploaded(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(actionSubmit)} className="space-y-3">
        <div className="grid grid-cols-[70%,1fr] gap-x-2">
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
              <FormItem>
                <FormLabel className="font-headMedium">Estado</FormLabel>
                <FormControl>
                  <div className="flex items-center gap-2 pt-1">
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
        </div>

        {/* Slug */}
        <FormField
          control={form.control}
          name="slug"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-headMedium">Slug de Portada</FormLabel>
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

        <Button
          type="submit"
          className="w-full font-headMedium text-xl uppercase bg-black hover:bg-grisDarkInka"
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
              <Send className="w-5 h-5 ml-2" strokeWidth={2} />
            </>
          )}
        </Button>
      </form>
    </Form>
  );
}
