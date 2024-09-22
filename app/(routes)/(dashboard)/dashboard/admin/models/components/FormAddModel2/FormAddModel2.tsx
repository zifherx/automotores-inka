// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";

// import { z } from "zod";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";
// import { Send } from "lucide-react";
// import axios from "axios";

// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { Switch } from "@/components/ui/switch";
// import { Label } from "@/components/ui/label";
// import { LoadingIcon } from "@/components/Shared/LoadingIcon";

// import { UploadButton } from "@/utils/uploadthing";
// import { onToast } from "@/lib/toastMessage";

// import { iFormAddModel } from "@/types";
// import { formAddBrandSchema } from "@/forms";

// export function FormAddModel(props: iFormAddModel) {
//   const { setOpenDialog } = props;

//   const [imageUploaded, setImageUploaded] = useState(false);
//   const [btnLoading, setBtnLoading] = useState(false);
//   const router = useRouter();

//   const form = useForm<z.infer<typeof formAddBrandSchema>>({
//     resolver: zodResolver(formAddBrandSchema),
//     defaultValues: {
//       name: "",
//       imageUrl: "",
//       slug: "",
//       isActive: true,
//     },
//   });

//   const onSubmit = async (values: z.infer<typeof formAddBrandSchema>) => {
//     try {
//       const query = await axios.post("/api/marca", values);

//       if (query.status === 200) {
//         onToast("Marca creada ✅");
//         setOpenDialog(false);
//         router.refresh();
//       }
//     } catch (er) {
//       onToast("Algo salió mal ❌", "", true);
//     }
//   };

//   return (
//     <Form {...form}>
//       <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
//         <div className="grid grid-cols-2 gap-2 md:gap-6">
//           {/* Name */}
//           <FormField
//             control={form.control}
//             name="name"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel className="font-headMedium">
//                   Nombre de Marca
//                 </FormLabel>
//                 <FormControl>
//                   <Input placeholder="Marca..." {...field} />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />
//           {/* isActive */}
//           <FormField
//             control={form.control}
//             name="isActive"
//             render={({ field }) => (
//               <FormItem className="">
//                 <FormLabel className="font-headMedium">Estado</FormLabel>
//                 <FormControl>
//                   <div className="flex gap-2 pt-1 items-center">
//                     <Switch
//                       id="formSwitch"
//                       checked={field.value}
//                       onCheckedChange={field.onChange}
//                     />
//                     <Label htmlFor="formSwitch">
//                       {field.value ? "Activo 👍" : "Inactivo 👎"}
//                     </Label>
//                   </div>
//                 </FormControl>
//               </FormItem>
//             )}
//           />
//           {/* Slug */}
//           <FormField
//             control={form.control}
//             name="slug"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel className="font-headMedium">Slug de Marca</FormLabel>
//                 <FormControl>
//                   <Input placeholder="Slug..." {...field} />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />
//           {/* ImageUrl */}
//           <FormField
//             control={form.control}
//             name="imageUrl"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Imagen de Marca</FormLabel>
//                 <FormControl>
//                   {imageUploaded ? (
//                     <p className="text-sm bg-green-700 text-white rounded-xl text-center">
//                       Imagen cargada! 👍
//                     </p>
//                   ) : (
//                     <UploadButton
//                       className="rounded-lg bg-slate-600/20 text-slate-800 outline-dotted outline-1"
//                       {...field}
//                       endpoint="imageUploaded"
//                       onClientUploadComplete={(res) => {
//                         form.setValue("imageUrl", res?.[0].url);
//                         setImageUploaded(true);
//                       }}
//                       onUploadError={(err: Error) => {
//                         console.log(err);
//                       }}
//                     />
//                   )}
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />

//           <Button
//             type="submit"
//             className="w-full col-span-2 font-headMedium text-xl uppercase bg-black hover:bg-grisDarkInka"
//           >
//             {btnLoading ? (
//               <>
//                 <LoadingIcon effect="default" />
//                 Enviando...
//               </>
//             ) : (
//               <>
//                 Enviar
//                 <Send className="w-5 h-5 ml-2" />
//               </>
//             )}
//           </Button>
//         </div>
//       </form>
//     </Form>
//   );
// }
"use client";

import React from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { iFormAddModel } from "@/types";

const ColorSchema = z.object({
  label: z.string().min(1, "Label is required"),
  hex: z.string().regex(/^#[0-9A-F]{6}$/i, "Invalid hex color code"),
  carColor: z.string().min(1, "Car color is required"),
  isActive: z.boolean(),
});

const ModelSchema = z.object({
  name: z.string().min(1, "Name is required"),
  slug: z.string().min(1, "Slug is required"),
  imageUrl: z.string().url("Invalid URL"),
  precioBase: z.number().positive("Price must be positive"),
  fichaTecnica: z.string(),
  marca: z.object({
    name: z.string().min(1, "Brand name is required"),
  }),
  carroceria: z.object({
    name: z.string().min(1, "Chassis name is required"),
  }),
  isEntrega48H: z.boolean(),
  isGLP: z.boolean(),
  colores: z.array(ColorSchema),
  isActive: z.boolean(),
  createdBy: z.string().min(1, "Creator is required"),
});

type ModelFormValues = z.infer<typeof ModelSchema>;

export function FormAddModel2(props: iFormAddModel) {
  const { setOpenDialog } = props;
  const form = useForm<ModelFormValues>({
    resolver: zodResolver(ModelSchema),
    defaultValues: {
      name: "",
      slug: "",
      imageUrl: "",
      precioBase: 0,
      fichaTecnica: "",
      marca: { name: "" },
      carroceria: { name: "" },
      isEntrega48H: false,
      isGLP: false,
      colores: [],
      isActive: true,
      createdBy: "",
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "colores",
  });

  function onSubmit(values: ModelFormValues) {
    console.log(values);
  }

  return (
    <ScrollArea className="h-72 w-full">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 scroll-m-10"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Model name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="slug"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Slug</FormLabel>
                <FormControl>
                  <Input placeholder="model-slug" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="imageUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Image URL</FormLabel>
                <FormControl>
                  <Input
                    placeholder="https://example.com/image.jpg"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="precioBase"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Base Price</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    {...field}
                    onChange={(e) => field.onChange(parseFloat(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="fichaTecnica"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Technical Sheet</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="marca.name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Brand</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="carroceria.name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Chassis</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="isEntrega48H"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>48-Hour Delivery</FormLabel>
                  <FormDescription>
                    Is this model available for 48-hour delivery?
                  </FormDescription>
                </div>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="isGLP"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>GLP</FormLabel>
                  <FormDescription>
                    Is this model GLP compatible?
                  </FormDescription>
                </div>
              </FormItem>
            )}
          />

          <div>
            <h3 className="text-lg font-semibold mb-2">Colores</h3>
            {fields.map((field, index) => (
              <div
                key={field.id}
                className="space-y-4 p-4 border rounded-md mb-4"
              >
                <FormField
                  control={form.control}
                  name={`colores.${index}.label`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Label</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`colores.${index}.hex`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Hex Color</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="#000000" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`colores.${index}.carColor`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Car Color</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`colores.${index}.isActive`}
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>Active</FormLabel>
                      </div>
                    </FormItem>
                  )}
                />
                <Button
                  type="button"
                  variant="destructive"
                  onClick={() => remove(index)}
                >
                  Remove Color
                </Button>
              </div>
            ))}
            <Button
              type="button"
              onClick={() =>
                append({ label: "", hex: "", carColor: "", isActive: true })
              }
            >
              Add Color
            </Button>
          </div>

          <FormField
            control={form.control}
            name="isActive"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>Active</FormLabel>
                  <FormDescription>
                    Is this model currently active?
                  </FormDescription>
                </div>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="createdBy"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Created By</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </ScrollArea>
  );
}
