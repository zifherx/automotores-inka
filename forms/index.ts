import { z } from "zod";

export const formAddCoverSchema = z.object({
  name: z.string().min(4).max(50),
  imageUrl: z.string().url({ message: "imageUrl debe ser una URL válida" }),
  slug: z.string().min(1, { message: "slug no puede estar vacío" }),
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
  label: z.string().min(3, { message: "Label es requerido" }),
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
  name: z.string().min(2),
  slug: z.string().min(2),
  codigo_flashdealer: z.string().min(2),
  imageUrl: z.string(),
  precioBase: z.number(),
  fichaTecnica: z.string(),
  marca: z.string(),
  carroceria: z.string(),
  isEntrega48H: z.boolean(),
  isGLP: z.boolean(),
  isLiquidacion: z.boolean(),
  isNuevo: z.boolean(),
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
  name: z.string().min(1, "Este campo debe contener al menos 1 caracter"),
  slug: z.string().min(1, "Este campo debe contener al menos 1 caracter"),
  codexHR: z.string().min(3, "Este campo debe contener al menos 3 caracteres"),
  imageUrl: z.string(),
  ciudad: z.string().min(1, "Este campo debe contener al menos 1 caracter"),
  address: z.string().min(1, "Este campo debe contener al menos 1 caracter"),
  scheduleRegular: z
    .string()
    .min(1, "Este campo debe contener al menos 1 caracter"),
  scheduleExtended: z
    .string()
    .min(1, "Este campo debe contener al menos 1 caracter"),
  coordenadasMapa: z.object({
    latitud: z.string(),
    longitud: z.string(),
  }),
  linkHowArrived: z.string().url("Debe ingresar una url válida"),
  isActive: z.boolean(),
});

export const formMarcasDisponiblesSchema = z.string();

export const formEditSucursalSchema = z.object({
  name: z.string().min(1, "Este campo debe contener al menos 1 caracter"),
  slug: z.string().min(1, "Este campo debe contener al menos 1 caracter"),
  codexHR: z.string().min(3, "Este campo debe contener al menos 3 caracteres"),
  ciudad: z.string().min(1, "Este campo debe contener al menos 1 caracter"),
  address: z.string().min(1, "Este campo debe contener al menos 1 caracter"),
  scheduleRegular: z
    .string()
    .min(1, "Este campo debe contener al menos 1 caracter"),
  scheduleExtended: z
    .string()
    .min(1, "Este campo debe contener al menos 1 caracter"),
  marcasDisponiblesVentas: z.array(z.string()),
  marcasDisponiblesTaller: z.array(z.string()),
  coordenadasMapa: z.object({
    latitud: z.string().min(1, "Este campo debe contener al menos 1 caracter"),
    longitud: z.string().min(1, "Este campo debe contener al menos 1 caracter"),
  }),
  linkHowArrived: z.string().url("Debe ingresar una url válida"),
  isActive: z.boolean(),
});

export const formCotizacionGeneralSchema = z.object({
  nombres: z
    .string()
    .min(3, "Nombres no debe ser inferior a 3 caracteres")
    .max(50, "Nombres no debe superar los 50 caracteres"),
  tipoDocumento: z.string(),
  numeroDocumento: z
    .string()
    .min(8, "Numero de Documento no debe ser inferior a 8 caracteres")
    .max(20, "Numero de Documento no debe superar los 20 caracteres"),
  email: z.string().email({ message: `Email es obligatorio` }),
  celular: z.string().length(9, "Celular debe ser de 9 dígitos"),
  marca: z.string().min(1, { message: "Debe seleccionar una marca" }),
  modelo: z.string().min(1, { message: `Debe seleccionar un modelo` }),
  departamento: z.string().min(1, { message: "Debe seleccionar una sede" }),
  concesionario: z
    .string()
    .min(1, { message: "Debe seleccionar un concesionario" }),
  intencionCompra: z
    .string()
    .min(1, { message: "Debe seleccionar su intención de compra" }),
  checkDatosPersonales: z.boolean().refine((val) => val === true, {
    message: `Debe aceptar el tratamiento de Datos Personales`,
  }),
  checkPromociones: z.string(),
});

export const formCotizacionModeloSchema = z.object({
  nombres: z
    .string()
    .min(3, "Nombres debe superar 3 caracteres.")
    .max(50, "Nombres no se puede exceder de 50 caracteres."),
  tipoDocumento: z
    .string()
    .min(1, { message: "Debe seleccionar un tipo de documento" }),
  numeroDocumento: z
    .string()
    .min(8, "Número de documento debe ser como mínimo de 8 dígitos.")
    .max(20, "Número de documento no debe exceder los 20 caracteres."),
  email: z.string().email("Debe ingresar un email válido."),
  celular: z.string().length(9, "Celular debe ser de 9 dígitos."),
  departamento: z.string().min(1, { message: "Debe seleccionar una sede" }),
  concesionario: z
    .string()
    .min(1, { message: "Debe seleccionar un concesionario" }),
  intencionCompra: z
    .string()
    .min(1, { message: "Debe seleccionar su intención de compra" }),
  checkDatosPersonales: z.boolean().refine((val) => val === true, {
    message:
      "Debe estar de acuerdo con la Política de Protección de Datos Personales",
  }),
  checkPromociones: z.string(),
});

export const formReclamoSchema = z.object({
  // 1. Datos del Consumidor
  tipoDocumento: z.string({ message: "Debe seleccionar una opción." }),
  numeroDocumento: z
    .string()
    .min(8, { message: "El campo debe contener al menos 8 caracteres." })
    .max(20, { message: "El campo no debe superar los 20 caracteres" }),
  nombres: z.string().min(3, "El campo debe contener al menos 3 caracteres."),
  apellidos: z.string().min(3, "El campo debe contener al menos 3 caracteres."),
  email: z.string().email("Debe ingresar un email válido"),
  celular: z.string().length(9, "El campo debe contener 9 dígitos."),
  departamento: z.string(),
  provincia: z.string(),
  distrito: z.string(),
  direccion: z.string().optional(),
  // 2. Datos del bien adquirido
  tipoBien: z.string(),
  vin: z.string().optional(),
  placa: z
    .string()
    // .length(6, "Este campo debe contener 6 caracteres")
    .optional(),
  sedeCompra: z.string(),
  // moneda: z.enum(["pen", "usd"]),
  moneda: z.string(),
  importeBien: z.number(),
  descripcionBien: z.string().max(220),
  // 3. Detalle del reclamo y solicitud del reclamante
  tipoSolicitud: z.string(),
  detalleSolicitud: z
    .string()
    .max(500, "No puede ingresar más de 500 caracteres"),
  pedidoSolicitud: z
    .string()
    .max(500, "No puede ingresar más de 500 caracteres"),
  isConforme: z.boolean(),
});

export const formServicioMantenimientoSchema = z.object({
  nombres: z
    .string()
    .min(2, { message: "El nombre debe tener al menos 2 caracteres" }),
  tipoDocumento: z
    .enum(["RUC", "DNI", "Pasaporte"], {
      required_error: "Debe seleccionar un Tipo de Documento",
    })
    .refine((value) => value.length > 0),
  numeroDocumento: z.string().refine((val) => {
    if (val.length === 0) return false;
    const numericValue = val.replace(/\D/g, "");
    return numericValue === val;
  }, "Campo inválido"),
  placa: z.string().length(6, { message: "La placa debe tener 6 caracteres" }),
  kilometraje: z.string().min(2, "Campo requerido"),
  celular: z.string().length(9, {
    message: "El número de celular debe tener 9 dígitos.",
  }),
  correo: z.string().email({
    message: "Ingrese un correo electrónico válido.",
  }),
  marca: z.string(),
  // modelo: z.string(),
  tipoServicio: z.string({
    message: "Debe seleccionar un Tipo de Servicio",
  }),
  comentario: z.string().optional(),
  sede: z.string().min(1, {
    message: "Debe seleccionar una ciudad.",
  }),
  concesionario: z.string().min(1, { message: "Debe seleccionar un dealer" }),
  checkDatosPersonales: z.boolean({ required_error: "Check requerido" }),
  checkPromociones: z.string(),
});

export const formEmailModule = z.object({
  area: z.string(),
  email: z.string().email({ message: "Debe ingresar un email válido." }),
  isActive: z.boolean(),
});

export const formPremiosSchema = z.object({
  name: z.string(),
});

export const formContestSchema = z.object({
  codex: z.string(),
  title: z.string(),
  bases: z.string(),
  premios: z.array(formPremiosSchema),
  fechaConcurso: z.date(),
});

export const formCybermotorSchema = z.object({
  name: z.string().min(2).max(50),
  documento: z.string().length(8),
  email: z.string().email(),
  celular: z.string().length(9),
});

export const formTipoCambio = z.object({
  fechaTC: z.date({ required_error: `Campo obligatorio` }),
  tipo_cambio: z
    .number({ message: "Campo obligatorio" })
    .min(3.7, "Debe superar los 3.70")
    .max(4.5, "No debe superar los 4.50"),
});

export const formOracionSchema = z.object({
  oracion: z.string(),
});

export const formParrafoSchema = z.object({
  title: z.string(),
  parrafos: z.array(formOracionSchema),
});

export const formNoticia = z.object({
  title: z.string(),
  slug: z.string(),
  excerpt: z.string(),
  content: z.array(formParrafoSchema),
  imagePortada: z.string().url(),
});

export const formContactAccesorios = z.object({
  name: z
    .string()
    .min(2, "El nombre debe tener al menos 2 caracteres")
    .max(50, "El nombre no puede exceder 50 caracteres")
    .regex(
      /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/,
      "El nombre solo puede contener letras y espacios"
    ),
  email: z
    .string()
    .min(1, "El correo electrónico es requerido")
    .email("Ingresa un correo electrónico válido"),
  phone: z
    .string()
    .length(9, "El teléfono debe tener al menos 9 dígitos")
    .regex(/^[+]?[\d\s-()]+$/, "Formato de teléfono inválido")
    .optional()
    .or(z.literal("")),
  message: z
    .string()
    .min(10, "El mensaje debe tener al menos 10 caracteres")
    .max(500, "El mensaje no puede exceder 500 caracteres"),
});

export const cotizadorPasosSchema = z.object({
  nombreCompleto: z
    .string()
    .min(2, { message: "Nombre debe tener al menos 2 caracteres" }),
  tipoDocumento: z.enum(["dni", "ruc", "pasaporte", "ce"], {
    required_error: "Selecciona un tipo de documento",
  }),
  numeroDocumento: z
    .string()
    .min(1, { message: "Ingresa el número de documento" }),
  celular: z
    .string()
    .length(9, { message: "celular debe tener exactamente 9 dígitos" }),
  email: z.string().email({ message: "Ingresa un email válido" }),
  intencionCompra: z.enum(
    ["esta-semana", "este-mes", "proximo-mes", "mas-adelante"],
    { required_error: "Selecciona tu intención de compra" }
  ),
  aceptaPoliticas: z.boolean().refine((val) => val === true, {
    message: "Debes aceptar las politicas de Protección de Datos Personales",
  }),
  aceptaNewsletter: z.boolean(),
});

export type PortadasFormValues = z.infer<typeof formAddCoverSchema>;
export type ChasisFormValues = z.infer<typeof formAddChasisSchema>;
export type BrandFormValues = z.infer<typeof formAddBrandSchema>;
export type ModelFormValues = z.infer<typeof formAddModeloSchema>;
export type SucursalFormValues = z.infer<typeof formAddSucursalSchema>;
export type SucursalFormEditValues = z.infer<typeof formEditSucursalSchema>;
export type CotizacionGeneralFormValues = z.infer<
  typeof formCotizacionGeneralSchema
>;
export type CotizacionModeloFormValue = z.infer<
  typeof formCotizacionModeloSchema
>;
export type HReclamoFormValues = z.infer<typeof formReclamoSchema>;
export type SolicitudServicioFormValues = z.infer<
  typeof formServicioMantenimientoSchema
>;
export type EmailModuleFormValues = z.infer<typeof formEmailModule>;
export type ContestFormValues = z.infer<typeof formContestSchema>;
export type CybermotorFormValues = z.infer<typeof formCybermotorSchema>;
export type TCambioFormValues = z.infer<typeof formTipoCambio>;
export type NoticiasFormValues = z.infer<typeof formNoticia>;
export type ContactFormAccesoriesValues = z.infer<typeof formContactAccesorios>;
export type CotizadorPasosFormValues = z.infer<typeof cotizadorPasosSchema>;
