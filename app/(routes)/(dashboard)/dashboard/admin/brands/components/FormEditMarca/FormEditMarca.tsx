"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Send, X } from "lucide-react";
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

import { onToast } from "@/lib";
import { BrandFormValues, formAddBrandSchema } from "@/forms";
import { tFormEditMarca } from "@/types";
import { UploadButton } from "@/utils/uploadthing";

export function FormEditMarca({ brand, setOpenDialog }: tFormEditMarca) {
  const [isLoading, setIsLoading] = useState(false);
  const [imageUploaded, setImageUploaded] = useState(false);
  const [linkImg, setLinkImg] = useState<string>("");

  const router = useRouter();

  const form = useForm<BrandFormValues>({
    resolver: zodResolver(formAddBrandSchema),
    defaultValues: {
      name: brand.name,
      isActive: brand.isActive,
      slug: brand.slug,
      imageUrl: brand.imageUrl,
    },
  });

  useEffect(() => {
    if (brand.imageUrl !== "") {
      setLinkImg(brand.imageUrl);
      setImageUploaded(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit = async (values: BrandFormValues) => {
    setIsLoading(true);
    try {
      const query = await axios.patch(`/api/marca/${brand._id}`, values);
      if (query.status === 200) {
        onToast(query.data.message);
        setOpenDialog(false);
        router.refresh();
      }
    } catch (err: any) {
      console.log(err);
      onToast(
        "Algo salió mal ❌",
        !err.response.data.success ? err.response.data.message : "",
        true
      );
    } finally {
      setIsLoading(false);
    }
  };

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

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
                      {...field}
                      endpoint="imageUploaded"
                      onClientUploadComplete={handleImageUpload}
                      onUploadError={(err) => {
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
