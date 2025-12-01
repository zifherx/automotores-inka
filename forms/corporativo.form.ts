import z from "zod";

export const corporativoSchema = z.object({
  nombreCompleto: z
    .string()
    .min(3, "El nombre debe tener al menos 3 caracteres")
    .max(100, "El nombre es demasiado largo"),
  tipoDocumento: z
    .enum(["DNI", "RUC", "CE", "Pasaporte"], {
      required_error: "Debe seleccionar un Tipo de Documento",
    })
    .refine((value) => value.length > 0),
  numeroDocumento: z.string().refine((value) => {
    if (value.length === 0) return false;
    const numericValue = value.replace(/\D/g, "");
    return numericValue === value;
  }, "Campo inválido"),
  correoElectronico: z
    .string()
    .email("Ingresa un correo electrónico válido")
    .min(1, "El correo es obligatorio"),
  celular: z
    .string()
    .length(9, "El celular debe tener 9 dígitos")
    .regex(/^[0-9]+$/),
  marca: z.string().optional(),
  intencionCompra: z.string().optional(),
});

export type CorporativoFormType = z.infer<typeof corporativoSchema>;
