import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import axios from "axios";

import { formEditSucursalSchema, SucursalFormEditValues } from "@/forms";
import { iFormEditSucursal } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";

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

import { RefreshCw } from "lucide-react";
import { onToast } from "@/lib";

export function FormEditSucursal({ sede, setOpenDialog }: iFormEditSucursal) {
  const [btnLoading, setBtnLoading] = useState(false);
  const router = useRouter();

  const form = useForm<SucursalFormEditValues>({
    resolver: zodResolver(formEditSucursalSchema),
    defaultValues: {
      name: sede.name,
      slug: sede.slug,
      codexHR: sede.codexHR,
      address: sede.address,
      ciudad: sede.ciudad,
      linkHowArrived: sede.linkHowArrived,
      scheduleRegular: sede.scheduleRegular,
      scheduleExtended: sede.scheduleExtended,
      coordenadasMapa: {
        latitud: sede.coordenadasMapa?.latitud
          ? sede.coordenadasMapa.latitud
          : "",
        longitud: sede.coordenadasMapa?.longitud
          ? sede.coordenadasMapa.longitud
          : "",
      },
      isActive: sede.isActive ? sede.isActive : false,
    },
  });

  const onSubmit = async (values: SucursalFormEditValues) => {
    try {
      const query = await axios.patch(`/api/sucursal/edit/${sede._id}`, values);

      if (query.status === 200) {
        onToast("Sede actualizada ✅");
        setOpenDialog(false);
        router.refresh();
      }
    } catch (err) {
      console.log(err);
      onToast("Algo salió mal ❌", "", true);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
                <FormLabel className="font-headMedium">Slug de Sede</FormLabel>
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

          {/* Ciudad */}
          <FormField
            control={form.control}
            name="ciudad"
            render={({ field }) => (
              <FormItem className="md:col-span-2">
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
            className="w-full md:col-span-2 font-headMedium text-xl uppercase bg-black hover:bg-grisDarkInka"
          >
            {btnLoading ? (
              <>
                <LoadingIcon effect="default" />
                Enviando...
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
