"use client";

import { useRouter } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { LoadingIcon } from "@/components/Shared/LoadingIcon";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Switch } from "@/components/ui/switch";
import { Button } from "../../../../../../../../components/ui/button";

import { onToast } from "@/lib/toastMessage";
import { UploadButton } from "@/utils/uploadthing";
import { Send } from "lucide-react";

import { formAddSucursalSchema, SucursalFormValues } from "@/forms";
import { tFormAdding } from "@/types";

export function FormAddSucursal({ setOpenDialog }: tFormAdding) {
  const [imageUploaded, setImageUploaded] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);

  const router = useRouter();

  const form = useForm<SucursalFormValues>({
    resolver: zodResolver(formAddSucursalSchema),
    defaultValues: {
      name: "",
      slug: "",
      codexHR: "",
      imageUrl: "",
      ciudad: "",
      address: "",
      linkHowArrived: "",
      scheduleRegular: "",
      scheduleExtended: "",
      coordenadasMapa: {
        latitud: "",
        longitud: "",
      },
      isActive: true,
    },
  });

  const handleButton = async (values: SucursalFormValues) => {
    console.log("Values: ", values);
    setBtnLoading(true);
    try {
      const query = await axios.post("/api/sucursal", values);
      console.log("Response-Axios", query);
      if (query.status === 200) {
        onToast(query.data.message);
        setOpenDialog(false);
        router.refresh();
      }
    } catch (err) {
      onToast("Algo salió mal ❌", "", true);
    } finally {
      setBtnLoading(false);
    }
  };

  return (
    <ScrollArea className="h-[700px] w-full rounded-md">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleButton)} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-6 text-left">
            {/* Name */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-headMedium">
                    Nombre de Sede
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Sede..." {...field} />
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
                    Slug de Sede
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Slug..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* CodexHR */}
            <FormField
              control={form.control}
              name="codexHR"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-headMedium">Codex HR</FormLabel>
                  <FormControl>
                    <Input placeholder="Limsur..." {...field} />
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
                  <FormLabel className="font-headMedium">
                    Portada de Sede
                  </FormLabel>
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
                          form.setValue("imageUrl", res ? res?.[0].appUrl : "");
                          setImageUploaded(true);
                        }}
                        onUploadError={(err) => {
                          console.log(err);
                          // form.setValue("imageUrl", `https://utfs.io/f/${err.}`)
                        }}
                      />
                    )}
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Ciudad */}
            <FormField
              control={form.control}
              name="ciudad"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-headMedium">
                    Ciudad de la Sede
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Ciudad..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* IdNovaly */}
            <FormField
              control={form.control}
              name="idTiendaNovaly"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-headMedium">ID Tienda</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Id..."
                      min={0}
                      max={10}
                      {...field}
                      onChange={(e) => {
                        const value = e.target.value;
                        field.onChange(value === "" ? "" : Number(value));
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Address */}
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem className="md:col-span-2">
                  <FormLabel className="font-headMedium">
                    Dirección de la Sede
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Dirección..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Horario Regular */}
            <FormField
              control={form.control}
              name="scheduleRegular"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-headMedium">
                    Horario Regular
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="08:00am - 06-30pm..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Horario FDS */}
            <FormField
              control={form.control}
              name="scheduleExtended"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-headMedium">Horario FDS</FormLabel>
                  <FormControl>
                    <Input placeholder="08:00am - 12:30pm..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Latitud */}
            <FormField
              control={form.control}
              name="coordenadasMapa.latitud"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-headMedium">Latitud</FormLabel>
                  <FormControl>
                    <Input placeholder="-7.1221521" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Longitud */}
            <FormField
              control={form.control}
              name="coordenadasMapa.longitud"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-headMedium">Longitud</FormLabel>
                  <FormControl>
                    <Input placeholder="-79.04056178016265" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Link GPS */}
            <FormField
              control={form.control}
              name="linkHowArrived"
              render={({ field }) => (
                <FormItem className="md:col-span-2">
                  <FormLabel className="font-headMedium">
                    Link de Google Maps
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Link..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full md:col-span-2 font-headMedium text-xl uppercase bg-black hover:bg-grisDarkInka flex items-center justify-center py-3 rounded-lg text-white"
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
    </ScrollArea>
  );
}
