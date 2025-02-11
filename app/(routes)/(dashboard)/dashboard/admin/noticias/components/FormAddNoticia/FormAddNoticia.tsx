"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Minus, Plus, Send, Trash } from "lucide-react";
import axios from "axios";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";

import { LoadingIcon } from "@/components/Shared/LoadingIcon";

import { formNoticia, NoticiasFormValues } from "@/forms";
import { tFormAdding } from "@/types";
import { onToast } from "@/lib";
import { UploadButton } from "@/utils/uploadthing";

export function FormAddNoticia({ setOpenDialog }: tFormAdding) {
  const [isLoadingButton, setIsLoadingButton] = useState(false);
  const [imageUploaded, setImageUploaded] = useState(false);

  const router = useRouter();

  const form = useForm<NoticiasFormValues>({
    resolver: zodResolver(formNoticia),
    defaultValues: {
      title: "",
      slug: "",
      excerpt: "",
      content: [],
      imagePortada: "",
    },
  });

  const {
    fields: contentFields,
    append: appendContent,
    remove: removeContent,
  } = useFieldArray({
    control: form.control,
    name: "content",
  });

  const onSubmit = async (values: NoticiasFormValues) => {
    setIsLoadingButton(true);
    try {
      const query = await axios.post(`/api/noticia`, values);
      if (query.status === 200) {
        onToast(query.data.message);
        setIsLoadingButton(false);
        setOpenDialog(false);
      }
    } catch (err) {
      setOpenDialog(false);
      onToast("Algo salió mal ❌", "", true);
    } finally {
      router.refresh();
    }
  };

  const handleImageIpload = (res: any) => {
    if (res && res[0]) {
      form.setValue("imagePortada", res[0].url);
      setImageUploaded(true);
    }
  };

  return (
    <ScrollArea className="w-full h-96">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {/* Titulo */}
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-headMedium">Título</FormLabel>
                <FormControl>
                  <Input placeholder="Título..." {...field} />
                </FormControl>
                <FormMessage />
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

          {/* Excerpt */}
          <FormField
            control={form.control}
            name="excerpt"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-headMedium">Excerpt</FormLabel>
                <FormControl>
                  <Textarea placeholder="Excerpt..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* ImagenPortada */}
          <FormField
            control={form.control}
            name="imagePortada"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Imagen de Noticia</FormLabel>
                <FormControl>
                  {imageUploaded ? (
                    <p className="text-sm bg-green-700 text-white rounded-xl text-center">
                      Imagen cargada! 👍
                    </p>
                  ) : (
                    <UploadButton
                      className="rounded-lg bg-slate-600/20 text-slate-800 outline-dotted outline-1 p-1"
                      endpoint="imageUploaded"
                      onClientUploadComplete={handleImageIpload}
                      onUploadError={(err: Error) => console.log(err)}
                      {...field}
                    />
                  )}
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex flex-col gap-2 rounded border p-2">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold mb-1">Contenido</h3>
              <Button
                type="button"
                className="w-fit items-center font-semibold"
                onClick={() =>
                  appendContent({ title: "", parrafos: [{ oracion: "" }] })
                }
              >
                Agregar contenido
                <Plus className="h-5 w-5 ml-2" />
              </Button>
            </div>

            {contentFields.map((contentField, contentIndex) => (
              <div
                key={contentField.id}
                className="space-y-4 p-4 border rounded-md mb-4"
              >
                {/* Titulo Parrafo */}
                <FormField
                  control={form.control}
                  name={`content.${contentIndex}.title`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Título Parrafo</FormLabel>
                      <FormControl>
                        <Input placeholder="Título de parrafo" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex flex-col gap-2 rounded border p-2">
                  <div className="flex items-center justify-between">
                    <h4 className="text-lg font-bold mb-1">Parrafos</h4>
                    <Button
                      type="button"
                      onClick={() => {
                        const currentParrafos = form.getValues(
                          `content.${contentIndex}.parrafos`
                        );
                        form.setValue(`content.${contentIndex}.parrafos`, [
                          ...currentParrafos,
                          { oracion: "" },
                        ]);
                      }}
                    >
                      Agregar Parrafo
                      <Plus className="h-5 w-5 ml-2" strokeWidth={2} />
                    </Button>
                  </div>
                  {form
                    .watch(`content.${contentIndex}.parrafos`)
                    .map((_, parrafoIndex) => (
                      // Parrafo
                      <FormField
                        key={parrafoIndex}
                        control={form.control}
                        name={`content.${contentIndex}.parrafos.${parrafoIndex}.oracion`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Parrafo {parrafoIndex + 1}</FormLabel>
                            <div className="flex items-center space-x-2">
                              <FormControl>
                                <Textarea
                                  placeholder={`Ingresa parrafo ${parrafoIndex} ...`}
                                  {...field}
                                />
                              </FormControl>

                              <Button
                                type="button"
                                variant="destructive"
                                size="icon"
                                onClick={() => {
                                  const currentParrafos = form.getValues(
                                    `content.${contentIndex}.parrafos`
                                  );
                                  if (currentParrafos.length > 1) {
                                    const updatedParrafos = [
                                      ...currentParrafos,
                                    ];
                                    updatedParrafos.splice(parrafoIndex, 1);
                                    form.setValue(
                                      `content.${contentIndex}.parrafos`,
                                      updatedParrafos
                                    );
                                  }
                                }}
                              >
                                <Trash className="h-5 w-5" />
                              </Button>
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    ))}
                </div>

                <Button
                  type="button"
                  onClick={() => removeContent(contentIndex)}
                >
                  Quitar Contenido
                  <Minus className="w-5 h-5 ml-2" strokeWidth={3} />
                </Button>
              </div>
            ))}
          </div>

          <Button
            type="submit"
            disabled={isLoadingButton}
            className="w-full font-headMedium text-xl uppercase bg-black hover:bg-grisDarkInka"
          >
            {isLoadingButton ? (
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
    </ScrollArea>
  );
}
