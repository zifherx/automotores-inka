import { LoadingIcon } from "@/components/Shared/LoadingIcon";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { formNoticia, NoticiasFormValues } from "@/forms";
import { tFormAdding } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Minus, Plus, Send, Trash, Trash2 } from "lucide-react";
import { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";

export function FormAddNoticia({ setOpenDialog }: tFormAdding) {
  const [isLoadingButton, setIsLoadingButton] = useState(false);

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
      setTimeout(() => {
        console.log(values);
        alert("SE guarda noticia");
        setIsLoadingButton(false);
        // setOpenDialog(false)
      }, 3000);
    } catch (err) {
      console.log(err);
    } finally {
      console.log("Finalizó");
    }
  };

  return (
    // <div className="h-[calc(100vh-4rem)] flex flex-col">
    <ScrollArea className="w-full h-96">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
    // </div>
  );
}
