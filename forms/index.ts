import { z } from "zod";

export const formAddCoverSchema = z.object({
  name: z.string().min(4).max(50),
  imageUrl: z.string(),
  slug: z.string(),
  isActive: z.boolean(),
});

export const formAddBrandSchema = z.object({
  name: z.string().min(3).max(50),
  imageUrl: z.string().or(z.array(z.string())),
  slug: z.string(),
  isActive: z.boolean(),
});

export const formAddChasisSchema = z.object({
  name: z.string().min(3).max(50),
  slug: z.string(),
  isActive: z.boolean(),
});

export const formColorSchema = z.object({
  label: z.string().min(5, { message: "Label es requerido" }),
  hex: z
    .string()
    .regex(/^#[0-9A-F]{6}$/i, { message: "Código Hex es requerido" }),
  carColor: z.string(),
  isActive: z.boolean(),
});

export const formFeatureSchema = z.object({
  superTitle: z.string().min(1, { message: "SuperTitle es requerido" }),
  mainTitle: z.string().min(1, { message: "MaiTitle es requerido" }),
  subTitle: z.string().optional(),
});

export const formGallerySchema = z.object({
  name: z.string().min(3, { message: "Alt de imagen es requerido" }),
  imageUrl: z.string(),
});

export const formAddModeloSchema = z.object({
  name: z.string().min(3),
  slug: z.string(),
  imageUrl: z.string(),
  precioBase: z.number(),
  fichaTecnica: z.string(),
  marca: z.string(),
  carroceria: z.string(),
  isEntrega48H: z.boolean(),
  isGLP: z.boolean(),
  isActive: z.boolean(),
  // Color
  colores: z.array(formColorSchema),
  features: z.object({
    // Feature 1
    feature1: z.array(formFeatureSchema),
    // Feature 2
    feature2: z.array(formFeatureSchema),
  }),
  // Galeria
  galeria: z.array(formGallerySchema),
});

export const formAddSucursalSchema = z.object({
  name: z.string().min(1),
  slug: z.string().min(1),
  imageUrl: z.string(),
  ciudad: z.string().min(1),
  address: z.string().min(1),
  scheduleRegular: z.string().min(1),
  scheduleExtended: z.string().min(1),
  linkHowArrived: z.string().url(),
  isActive: z.boolean(),
});

export const formCotizacionGeneralSchema = z.object({
  nombres: z.string().min(3).max(50),
  tipo_documento: z.string(),
  numero_documento: z.string().min(8).max(20),
  email: z.string().email(),
  celular: z.string().length(9),
  marca: z.string(),
  modelo: z.string(),
  departamento: z.string(),
  concesionario: z.string(),
  intencion_compra: z.string(),
  checkDatosPersonales: z.boolean(),
  checkPromociones: z.string(),
});

export const formCotizacionModeloSchema = z.object({
  nombres: z
    .string()
    .min(3, "Este campo debe superar 3 caracteres.")
    .max(50, "No se puede exceder de 50 caracteres."),
  tipoDocumento: z.string(),
  numeroDocumento: z
    .string()
    .min(8, "El número de documento debe ser como mínimo de 8 dígitos.")
    .max(20, "El número de documento no debe exceder los 20 caracteres."),
  email: z.string().email("Debe ingresar un email válido."),
  celular: z.string().length(9, "Este campo debe ser de 9 dígitos."),
  departamento: z.string(),
  concesionario: z.string(),
  intencionCompra: z.string(),
  checkDatosPersonales: z.boolean({ required_error: "Check requerido" }),
  checkPromociones: z.string(),
});

export type BrandFormValues = z.infer<typeof formAddBrandSchema>;
export type ModelFormValues = z.infer<typeof formAddModeloSchema>;
export type SucursalFormValues = z.infer<typeof formAddSucursalSchema>;
export type CotizacionGeneralFormValues = z.infer<
  typeof formCotizacionGeneralSchema
>;
export type CotizacionModeloFormValue = z.infer<
  typeof formCotizacionModeloSchema
>;
