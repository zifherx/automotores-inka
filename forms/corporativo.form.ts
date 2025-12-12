import z from "zod";

export const corporativoSchema = z.object({
  // Datos de contacto
  nombreCompleto: z
    .string()
    .min(3, "El nombre debe tener al menos 3 caracteres")
    .max(100, "El nombre es demasiado largo")
    .regex(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, "Solo se permiten letras y espacios"),
  dni: z
    .string()
    .min(8, "El DNI debe tener al menos 8 caracteres")
    .max(11, "El DNI no puede tener más de 11 caracteres")
    .regex(/^[0-9]+$/, "Solo se permiten números"),
  correoElectronico: z
    .string()
    .email("Ingresa un correo electrónico válido")
    .min(1, "El correo es obligatorio")
    .toLowerCase(),
  celular: z
    .string()
    .length(9, "El celular debe tener 9 dígitos")
    .regex(/^[0-9]+$/, "Solo se permiten números"),

  // Datos de la Empresa
  razonSocial: z
    .string()
    .min(3, "La razón social debe tener al menos 3 caracteres")
    .max(200, "La razón social es demadiaso larga"),
  ruc: z
    .string()
    .length(11, "El RUC debe tener exactamente 11 dígitos")
    .regex(/^[0-9]+$/, "El RUC solo debe contener números")
    .refine((val) => val.startsWith("10") || val.startsWith("20"), {
      message: "El RUC debe comenzar con 10 o 20",
    }),

  // Información Adicional (opcionales)
  marca: z.string().optional(),
  intencionCompra: z.string().optional(),
});

export type CorporativoFormType = z.infer<typeof corporativoSchema>;
