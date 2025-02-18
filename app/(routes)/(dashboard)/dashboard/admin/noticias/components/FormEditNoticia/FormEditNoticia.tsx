"use client";

import { useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Minus, Plus, Send, Trash, X } from "lucide-react";

import { tFormEditNoticia } from "@/types";
import { useNews } from "@/context/news/noticeContext";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

import { LoadingIcon } from "@/components/Shared/LoadingIcon";

import { UploadButton } from "@/utils/uploadthing";
import { formNoticia, NoticiasFormValues } from "@/forms";

export function FormEditNoticia({ noticia, setOpenDialog }: tFormEditNoticia) {
  const { isLoadingData, updateNew } = useNews();

  const [imageUploaded, setImageUploaded] = useState(false);
  const [linkImage, setLinkImage] = useState("");

  const form = useForm<NoticiasFormValues>({
    resolver: zodResolver(formNoticia),
    defaultValues: {
      title: noticia.title,
      slug: noticia.slug,
      excerpt: noticia.excerpt,
      content: noticia.content,
      imagePortada: noticia.imagePortada,
    },
  });

  const handleImageUpload = (res: any) => {
    if (res && res[0]) {
      setLinkImage(res[0].url);
      form.setValue("imagePortada", res[0].url);
      setImageUploaded(true);
    }
  };

  const handleImageDelete = () => {
    setLinkImage("");
    form.setValue("imagePortada", "");
    setImageUploaded(false);
  };

  const actionSubmit = (values: NoticiasFormValues) =>
    updateNew(noticia._id, values);

  useEffect(() => {
    if (noticia.imagePortada !== "") {
      setLinkImage(noticia.imagePortada);
      setImageUploaded(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const {
    fields: contentFields,
    append: appendContent,
    remove: removeContent,
  } = useFieldArray({
    control: form.control,
    name: "content",
  });

  return (
    <ScrollArea className="w-full h-96">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(actionSubmit)} className="space-y-4">
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
                  <div className="space-y-4">
                    {!imageUploaded ? (
                      <UploadButton
                        className="rounded-lg bg-slate-600/20 text-slate-800 outline-dotted outline-1 p-1"
                        endpoint="imageUploaded"
                        onClientUploadComplete={handleImageUpload}
                        onUploadError={(err: Error) => console.log(err)}
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
                          <X className="w-4 h-4" strokeWidth={2} />
                        </Button>
                      </div>
                    )}
                    {linkImage && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={linkImage}
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
            disabled={isLoadingData}
            className="w-full font-headMedium text-xl uppercase bg-black hover:bg-grisDarkInka"
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
    </ScrollArea>
  );
}
