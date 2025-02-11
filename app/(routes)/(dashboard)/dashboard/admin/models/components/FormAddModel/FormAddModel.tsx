"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Minus, Plus, Send } from "lucide-react";
import axios from "axios";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectValue,
  SelectTrigger,
} from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { LoadingIcon } from "@/components/Shared/LoadingIcon";

import { onToast } from "@/lib";
import { UploadButton } from "@/utils/uploadthing";
import { formAddModeloSchema, ModelFormValues } from "@/forms";
import { iBrand, iChasis, tFormAdding } from "@/types";

export function FormAddModel({ setOpenDialog }: tFormAdding) {
  const [marcas, setMarcas] = useState<iBrand[]>([]);
  const [carrocerias, setCarrocerias] = useState<iChasis[]>([]);
  const [imageBaseUploaded, setImageBaseUploaded] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);
  const [imageColor, setImageColor] = useState<string[]>([]);
  const [imageGaleria, setImageGaleria] = useState<string[]>([]);

  const router = useRouter();

  const form = useForm<ModelFormValues>({
    resolver: zodResolver(formAddModeloSchema),
    defaultValues: {
      name: "",
      slug: "",
      codigo_flashdealer: "",
      imageUrl: "",
      precioBase: 0,
      fichaTecnica: "",
      isEntrega48H: false,
      isGLP: false,
      isLiquidacion: false,
      isNuevo: false,
      isActive: false,
      marca: "",
      carroceria: "",
      features: {
        feature1: [],
        feature2: [],
      },
      colores: [],
      galeria: [],
    },
  });

  const getBrands = async () => {
    const query = await axios.get("/api/marca");
    if (query.status === 200) {
      setMarcas(query.data.obj);
    }
  };

  const getChasis = async () => {
    const query = await axios.get("/api/chasis");
    if (query.status === 200) {
      setCarrocerias(query.data.obj);
    }
  };

  useEffect(() => {
    getBrands();
    getChasis();
  }, []);

  const {
    fields: colorFields,
    append: appendColor,
    remove: removeColor,
  } = useFieldArray({
    control: form.control,
    name: "colores",
  });

  const {
    fields: galeriaFields,
    append: appendGaleria,
    remove: removeGaleria,
  } = useFieldArray({
    control: form.control,
    name: "galeria",
  });

  const {
    fields: features1Fields,
    append: appendFeatures1,
    remove: removeFeatures1,
  } = useFieldArray({
    control: form.control,
    name: "features.feature1",
  });

  const {
    fields: features2Fields,
    append: appendFeatures2,
    remove: removeFeatures2,
  } = useFieldArray({
    control: form.control,
    name: "features.feature2",
  });

  const onSubmit = async (values: ModelFormValues) => {
    // console.log(values);
    setBtnLoading(true);
    try {
      const query = await axios.post("/api/modelo/", values);
      // console.log(query);
      if (query.status === 200) {
        onToast(`${query.data.message}`);
        setBtnLoading(false);
        setOpenDialog(false);
      }
    } catch (err) {
      // console.log(err);
      setBtnLoading(false);
      onToast("Algo salió mal ❌", "", true);
    } finally {
      router.refresh();
    }
  };

  return (
    <ScrollArea className="h-96 w-full md:h-[700px]">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid gap-3 md:gap-5">
            {/* Name */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-headMedium">
                    Nombre de Modelo
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Modelo..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-5">
              {/* Slug */}
              <FormField
                control={form.control}
                name="slug"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-headMedium">
                      Slug de Modelo
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Slug..." {...field} />
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
                      <div className="flex gap-1 pt-1 items-center">
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

            {/* CODIGO FLASHDEALER */}
            <FormField
              control={form.control}
              name="codigo_flashdealer"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-headMedium">
                    Código Flashdealer
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Código modelo..." {...field} />
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
                  <FormLabel>Imagen de Modelo</FormLabel>
                  <FormControl>
                    {imageBaseUploaded ? (
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
                          setImageBaseUploaded(true);
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

            {/* Marca */}
            <FormField
              control={form.control}
              name="marca"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Marca</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona una marca" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {marcas.map(({ _id, name, imageUrl, slug }) => (
                        <SelectItem key={_id} value={slug}>
                          <div className="flex justify-start">
                            <Image
                              src={imageUrl}
                              width={50}
                              height={50}
                              alt={name}
                              className="mr-3"
                              priority
                            />
                            <span className="my-auto">{name}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Carrocería */}
            <FormField
              control={form.control}
              name="carroceria"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Carrocería</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona un chasis" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {carrocerias.map(({ _id, name, slug }) => (
                        <SelectItem key={_id} value={slug}>
                          {name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Precio Base */}
            <FormField
              control={form.control}
              name="precioBase"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-headMedium">
                    Precio de Modelo
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Precio..."
                      {...field}
                      onChange={(e) =>
                        field.onChange(parseFloat(e.target.value))
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Ficha Técnica */}
            <FormField
              control={form.control}
              name="fichaTecnica"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-headMedium">
                    Ficha Técnica
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Ficha técnica..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-5">
              {/* isEntrega48H */}
              <FormField
                control={form.control}
                name="isEntrega48H"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center space-x-3 space-y-0 rounded-md border p-2">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Entrega 48H</FormLabel>
                    </div>
                  </FormItem>
                )}
              />

              {/* isGLP */}
              <FormField
                control={form.control}
                name="isGLP"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center space-x-3 space-y-0 rounded-md border p-2">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>GLP</FormLabel>
                    </div>
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-2 gap-5">
              {/* isLiquidacion */}
              <FormField
                control={form.control}
                name="isLiquidacion"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center space-x-3 space-y-0 rounded-md border p-2">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Liquidación</FormLabel>
                    </div>
                  </FormItem>
                )}
              />

              {/* isNuevo */}
              <FormField
                control={form.control}
                name="isNuevo"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center space-x-3 space-y-0 rounded-md border p-2">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Nuevo</FormLabel>
                    </div>
                  </FormItem>
                )}
              />
            </div>

            <div className="flex flex-col gap-2 rounded border p-2">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold mb-1">Colores</h3>
                <Button
                  type="button"
                  className="w-fit items-center font-semibold"
                  onClick={() =>
                    appendColor({
                      label: "",
                      hex: "",
                      carColor: "",
                      isActive: false,
                    })
                  }
                >
                  Agregar Color
                  <Plus className="w-5 h-5 ml-2" />
                </Button>
              </div>
              {colorFields.map((field, index) => (
                <div
                  key={field.id}
                  className="space-y-4 p-4 border rounded-md mb-4"
                >
                  {/* Color Label */}
                  <FormField
                    control={form.control}
                    name={`colores.${index}.label`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-headMedium">
                          Color Label
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="Label..." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Color isActive */}
                  <FormField
                    control={form.control}
                    name={`colores.${index}.isActive`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-headMedium">
                          Estado
                        </FormLabel>
                        <FormControl>
                          <div className="flex gap-1 pt-1 items-center">
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

                  {/* Color HEX */}
                  <FormField
                    control={form.control}
                    name={`colores.${index}.hex`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-headMedium">
                          Color HEX
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="#000000..." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Color URL */}
                  <FormField
                    control={form.control}
                    name={`colores.${index}.carColor`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Imagen de Color</FormLabel>
                        <FormControl>
                          {imageColor.includes(field.name) ? (
                            <p className="text-sm bg-green-700 text-white rounded-xl text-center">
                              Color cargado! 👍
                            </p>
                          ) : (
                            <UploadButton
                              className="rounded-lg bg-slate-600/20 text-slate-800 outline-dotted outline-1"
                              {...field}
                              endpoint="imageUploaded"
                              onClientUploadComplete={(res) => {
                                form.setValue(
                                  `colores.${index}.carColor`,
                                  res?.[0].url
                                );
                                setImageColor([...imageColor, field.name]);
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

                  <Button type="button" onClick={() => removeColor(index)}>
                    Quitar Color
                    <Minus className="w-5 h-5 ml-2" />
                  </Button>
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-2 rounded border p-2">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold mb-1">Galeria</h3>
                <Button
                  type="button"
                  className="w-fit items-center font-semibold"
                  onClick={() =>
                    appendGaleria({
                      name: "",
                      imageUrl: "",
                    })
                  }
                >
                  Agregar Imagen
                  <Plus className="w-5 h-5 ml-2" />
                </Button>
              </div>
              {galeriaFields.map((field, index) => (
                <div
                  key={field.id}
                  className="space-y-4 p-4 border rounded-mb mb-4"
                >
                  {/* Galeria Name */}
                  <FormField
                    control={form.control}
                    name={`galeria.${index}.name`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-headMedium">
                          Galeria Alt
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="Alt..." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Galeria URL */}
                  <FormField
                    control={form.control}
                    name={`galeria.${index}.imageUrl`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Imagen para Galeria</FormLabel>
                        <FormControl>
                          {imageGaleria.includes(field.name) ? (
                            <p className="text-sm bg-green-700 text-white rounded-xl text-center">
                              Imagen cargado! 👍
                            </p>
                          ) : (
                            <UploadButton
                              className="rounded-lg bg-slate-600/20 text-slate-800 outline-dotted outline-1"
                              {...field}
                              endpoint="imageUploaded"
                              onClientUploadComplete={(res) => {
                                form.setValue(
                                  `galeria.${index}.imageUrl`,
                                  res?.[0].url
                                );
                                setImageGaleria([...imageGaleria, field.name]);
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

                  <Button type="button" onClick={() => removeGaleria(index)}>
                    Quitar Imagen
                    <Minus className="w-5 h-5-ml-2" />
                  </Button>
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-2 rounded border p-2">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold mb-1">Features 1</h3>
                <Button
                  type="button"
                  className="w-fit items-center font-semibold"
                  onClick={() =>
                    appendFeatures1({
                      mainTitle: "",
                      superTitle: "",
                      subTitle: "",
                    })
                  }
                >
                  Agregar Feature 1
                  <Plus className="w-5 h-5 ml-2" />
                </Button>
              </div>
              {features1Fields.map((field, index) => (
                <div
                  key={field.id}
                  className="space-y-4 p-4 border rounded-mb mb-4"
                >
                  {/* Features 1 SuperTitle */}
                  <FormField
                    control={form.control}
                    name={`features.feature1.${index}.superTitle`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-headMedium">
                          Super Title
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="SuperTitle..." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Features 1 MainTitle */}
                  <FormField
                    control={form.control}
                    name={`features.feature1.${index}.mainTitle`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-headMedium">
                          Main Title
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="Main Title..." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Features 1 SubTitle */}
                  <FormField
                    control={form.control}
                    name={`features.feature1.${index}.subTitle`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-headMedium">
                          Sub Title
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="Sub Title..." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button type="button" onClick={() => removeFeatures1(index)}>
                    Quitar Feature 1
                    <Minus className="w-5 h-5-ml-2" />
                  </Button>
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-2 rounded border p-2">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold mb-1">Features 2</h3>
                <Button
                  type="button"
                  className="w-fit items-center font-semibold"
                  onClick={() =>
                    appendFeatures2({
                      mainTitle: "",
                      superTitle: "",
                      subTitle: "",
                    })
                  }
                >
                  Agregar Feature 2
                  <Plus className="w-5 h-5 ml-2" />
                </Button>
              </div>
              {features2Fields.map((field, index) => (
                <div
                  key={field.id}
                  className="space-y-4 p-4 border rounded-mb mb-4"
                >
                  {/* Features 2 SuperTitle */}
                  <FormField
                    control={form.control}
                    name={`features.feature2.${index}.superTitle`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-headMedium">
                          Super Title
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="superTitle..." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Features 2 MainTitle */}
                  <FormField
                    control={form.control}
                    name={`features.feature2.${index}.mainTitle`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-headMedium">
                          Main Title
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="mainTitle..." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Features 2 SubTitle */}
                  <FormField
                    control={form.control}
                    name={`features.feature2.${index}.subTitle`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-headMedium">
                          Sub Title
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="subTitle..." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button type="button" onClick={() => removeFeatures2(index)}>
                    Quitar Feature 2
                    <Minus className="w-5 h-5-ml-2" />
                  </Button>
                </div>
              ))}
            </div>

            <Button
              type="submit"
              className="w-full font-headMedium text-xl uppercase bg-black hover:bg-grisDarkInka"
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
