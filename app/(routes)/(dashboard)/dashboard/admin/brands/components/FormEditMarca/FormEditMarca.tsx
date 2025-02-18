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
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { LoadingIcon } from "@/components/Shared/LoadingIcon";

import { UploadButton } from "@/utils/uploadthing";
import { useBrands } from "@/context/brands/marcaContext";

import { BrandFormValues, formAddBrandSchema } from "@/forms";
import { tFormEditMarca } from "@/types";

export function FormEditMarca({ brand, setOpenDialog }: tFormEditMarca) {
  const { isLoadingData, updateBrand } = useBrands();

  const [imageUploaded, setImageUploaded] = useState(false);
  const [linkImg, setLinkImg] = useState<string>("");

  const form = useForm<BrandFormValues>({
    resolver: zodResolver(formAddBrandSchema),
    defaultValues: {
      name: brand.name,
      isActive: brand.isActive,
      slug: brand.slug,
      imageUrl: brand.imageUrl,
    },
  });

  const handleImageUpload = (res: any) => {
    if (res && res[0]) {
      setLinkImg(res[0].url);
      form.setValue("imageUrl", res[0].url);
      setImageUploaded(true);
    }
  };

  const handleImageDelete = () => {
    setLinkImg("");
    form.setValue("imageUrl", "");
    setImageUploaded(false);
  };

  const actionSubmit = async (values: BrandFormValues) =>
    updateBrand(brand._id, values);

  useEffect(() => {
    if (brand.imageUrl !== "") {
      setLinkImg(brand.imageUrl);
      setImageUploaded(true);
    }
  }, []);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(actionSubmit)} className="space-y-4">
        <div className="grid grid-cols-[70%,1fr] gap-2">
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
        </div>

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
                  {linkImg && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={linkImg}
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
          className="w-full col-span-2 font-headMedium text-xl uppercase bg-black hover:bg-grisDarkInka"
          disabled={isLoadingData}
        >
          {isLoadingData ? (
            <>
              <LoadingIcon effect="default" />
              Actualizando...
            </>
          ) : (
            <>
              Actualizar
              <Send className="w-5 h-5 ml-2" />
            </>
          )}
        </Button>
      </form>
    </Form>
  );
}
