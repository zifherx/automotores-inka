/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Barcode,
  CheckCircle2,
  Loader2,
  Mail,
  Phone,
  User,
} from "lucide-react";

import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { useBrands } from "@/context/brands/marcaContext";
import {
  CorporativoFormType,
  corporativoSchema,
} from "@/forms/corporativo.form";
import {
  buildLeadCorporativoRequest,
  createLeadCorporativo,
  enviarCorreoCorporativo,
  onToast,
} from "@/lib";
import { useRouter } from "next/navigation";

export function FormularioSection() {
  const { brands } = useBrands();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fadeInUp = {
    initial: { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 },
  };

  const formCorporativo = useForm<CorporativoFormType>({
    resolver: zodResolver(corporativoSchema),
    defaultValues: {
      nombreCompleto: "",
      tipoDocumento: undefined,
      numeroDocumento: "",
      correoElectronico: "",
      celular: "",
      marca: "",
      intencionCompra: "",
    },
  });

  const marcaSeleccionada = useMemo(() => {
    const marcaId = formCorporativo.watch("marca");
    if (!marcaId) return null;
    return brands.find((marca) => marca._id === marcaId) || null;
  }, [brands, formCorporativo.watch("marca")]);

  const onSubmit = async (values: CorporativoFormType) => {
    setIsSubmitting(true);

    try {
      const leadCorporativoData = buildLeadCorporativoRequest({
        nombreCompleto: values.nombreCompleto,
        tipoDocumento: values.tipoDocumento,
        numeroDocumento: values.numeroDocumento,
        correoElectronico: values.correoElectronico,
        celular: values.celular,
        marcaId: values.marca!,
        marcaText: marcaSeleccionada?.name!,
        marcaSlug: marcaSeleccionada?.slug!,
        intencionCompra: values.intencionCompra!,
      });

      const enviarCorreoData = buildLeadCorporativoRequest({
        nombreCompleto: values.nombreCompleto,
        tipoDocumento: values.tipoDocumento,
        numeroDocumento: values.numeroDocumento,
        correoElectronico: values.correoElectronico,
        celular: values.celular,
        marcaId: values.marca!,
        marcaText: marcaSeleccionada?.name! || "",
        marcaSlug: marcaSeleccionada?.slug! || "",
        intencionCompra: values.intencionCompra!,
      });

      const [leadResult, mailResult] = await Promise.allSettled([
        createLeadCorporativo(leadCorporativoData, "/api/lead-corporativo"),
        enviarCorreoCorporativo(
          enviarCorreoData,
          "/api/send-email/lead-corporativo"
        ),
      ]);

      if (leadResult.status === "rejected") {
        throw new Error(`Error al crear lead corporativo`);
      }

      if (mailResult.status === "rejected") {
        console.warn(`El envío del correo ha fallado pero se creó el lead`);
        onToast(
          "Lead creado con éxito ⌛",
          "En breve nuestro equipo especializado se contactará con ustedes",
          false
        );
      } else {
        onToast(
          "Lead creado con éxito ✅",
          "En breve nuestro equipo especializado se contactará con ustedes",
          false
        );
      }

      // console.group("📋 LEAD CORPORATIVO");
      // console.log("⏰ Timestamp:", new Date().toLocaleString("es-PE"));
      // console.table({
      //   "Nombre Completo": values.nombreCompleto,
      //   "Tipo Documento": values.tipoDocumento,
      //   "DNI/RUC": values.numeroDocumento,
      //   Email: values.correoElectronico,
      //   Celular: values.celular,
      //   "Marca ID": values.marca || "No especificada",
      //   "Marca Nombre": marcaSeleccionada?.name || "No especificada",
      //   "Intención de Compra": values.intencionCompra || "No especificada",
      // });
      // console.groupEnd();

      limpiarFormulario();
      router.push(
        `/landing/gracias?cliente=${values.nombreCompleto}&documento=${values.numeroDocumento}`
      );
    } catch (err: any) {
      console.error("Error al enviar formulario", err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const limpiarFormulario = () => {
    formCorporativo.reset({
      nombreCompleto: "",
      tipoDocumento: undefined,
      numeroDocumento: "",
      correoElectronico: "",
      celular: "",
      marca: "",
      intencionCompra: "",
    });
  };
  return (
    <section id="formulario" className="py-20 px-6 bg-white">
      <div className="max-w-3xl mx-auto">
        <motion.div {...fadeInUp} className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Solicita tu asesoría corporativa
          </h2>
          <p className="text-lg text-gray-600">
            Completa el formulario y un ejecutivo especializado se pondrá en
            contacto contigo
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white rounded-2xl shadow-2xl p-8 md:p-10 border border-gray-200"
        >
          <form
            onSubmit={formCorporativo.handleSubmit(onSubmit)}
            className="space-y-6"
          >
            {/* Nombre Completo */}
            <Controller
              name="nombreCompleto"
              control={formCorporativo.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel
                    htmlFor="corporativo-nombreCompleto"
                    className="font-headRegular font-semibold"
                  >
                    Nombre Completo <span className="text-redInka">*</span>
                  </FieldLabel>

                  <InputGroup className="h-12">
                    <InputGroupAddon>
                      <User className="w-5 h-5" />
                    </InputGroupAddon>

                    <InputGroupInput
                      {...field}
                      id="corporativo-nombreCompleto"
                      aria-invalid={fieldState.invalid}
                      placeholder="Ingrese su nombre completo"
                      autoComplete="off"
                      disabled={isSubmitting}
                    />
                  </InputGroup>

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Tipo Documento */}
              <Controller
                name="tipoDocumento"
                control={formCorporativo.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel
                      htmlFor="corporativo-tipoDocumento"
                      className="font-headRegular font-semibold"
                    >
                      Tipo Documento <span className="text-redInka">*</span>
                    </FieldLabel>

                    <Select
                      name={field.name}
                      value={field.value}
                      onValueChange={field.onChange}
                      disabled={isSubmitting}
                    >
                      <SelectTrigger
                        id="corporativo-tipoDocumento"
                        aria-invalid={fieldState.invalid}
                        className="min-w-[120px] h-12"
                      >
                        <SelectValue placeholder="Seleccione un tipo de documento" />
                      </SelectTrigger>

                      <SelectContent position="item-aligned">
                        <SelectItem value="DNI">DNI</SelectItem>
                        <SelectItem value="RUC">RUC</SelectItem>
                        <SelectItem value="CE">Carnet Extranjeria</SelectItem>
                        <SelectItem value="Pasaporte">Pasaporte</SelectItem>
                      </SelectContent>
                    </Select>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              {/* Número Documento */}
              <Controller
                name="numeroDocumento"
                control={formCorporativo.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel
                      htmlFor="corporativo-numeroDocumento"
                      className="font-headRegular font-semibold"
                    >
                      Número de Documento{" "}
                      <span className="text-redInka">*</span>
                    </FieldLabel>

                    <InputGroup className="h-12">
                      <InputGroupAddon>
                        <Barcode />
                      </InputGroupAddon>

                      <InputGroupInput
                        {...field}
                        id="corporativo-numeroDocumento"
                        aria-invalid={fieldState.invalid}
                        placeholder="Ingrese su número documento"
                        autoComplete="off"
                        disabled={isSubmitting}
                      />
                    </InputGroup>

                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Email */}
              <Controller
                name="correoElectronico"
                control={formCorporativo.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel
                      htmlFor="corporativo-correoElectronico"
                      className="font-headRegular font-semibold"
                    >
                      Correo Electrónico <span className="text-redInka">*</span>
                    </FieldLabel>

                    <InputGroup className="h-12">
                      <InputGroupAddon>
                        <Mail className="w-5 h-5" />
                      </InputGroupAddon>

                      <InputGroupInput
                        {...field}
                        id="corporativo-correoElectronico"
                        type="email"
                        aria-invalid={fieldState.invalid}
                        placeholder="Ej: jperez@empresa.com"
                        disabled={isSubmitting}
                        autoComplete="email"
                      />
                    </InputGroup>

                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              {/* Celular */}
              <Controller
                name="celular"
                control={formCorporativo.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel
                      htmlFor="corporativo-celular"
                      className="font-headRegular font-semibold"
                    >
                      Celular <span className="text-redInka">*</span>
                    </FieldLabel>

                    <InputGroup className="h-12">
                      <InputGroupAddon>
                        <Phone className="w-5 h-5" />
                      </InputGroupAddon>

                      <InputGroupInput
                        {...field}
                        id="corporativo-celular"
                        type="tel"
                        aria-invalid={fieldState.invalid}
                        placeholder="Ej: 999 999 999"
                        disabled={isSubmitting}
                      />
                    </InputGroup>

                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* marca */}
              <Controller
                name="marca"
                control={formCorporativo.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel
                      htmlFor="corporativo-marca"
                      className="font-headRegular font-semibold"
                    >
                      Marca{" "}
                      <span className="text-grisInka text-xs">Opcional</span>
                    </FieldLabel>

                    <Select
                      name={field.name}
                      value={field.value}
                      onValueChange={(value) => {
                        field.onChange(value);
                      }}
                      disabled={isSubmitting}
                    >
                      <SelectTrigger
                        id="corporativo-marca"
                        aria-invalid={fieldState.invalid}
                        className="min-w-[120px] h-12"
                      >
                        <SelectValue placeholder="Seleccione una marca" />
                      </SelectTrigger>

                      <SelectContent position="item-aligned">
                        {brands.length > 0 &&
                          brands
                            .filter((marca) => marca.isActive)
                            .map(({ _id, name, imageUrl }) => (
                              <SelectItem key={_id} value={_id}>
                                <div className="flex items-center justify-between gap-5">
                                  <Avatar>
                                    <AvatarImage src={imageUrl} alt={name} />
                                    <AvatarFallback>{name}</AvatarFallback>
                                  </Avatar>
                                  <span className="font-medium uppercase text-sm">
                                    {name}
                                  </span>
                                </div>
                              </SelectItem>
                            ))}
                      </SelectContent>
                    </Select>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              {/* Intencion de Compra */}
              <Controller
                name="intencionCompra"
                control={formCorporativo.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel
                      htmlFor="corporativo-intencionCompra"
                      className="font-headRegular font-semibold"
                    >
                      Intención de Compra{" "}
                      <span className="text-grisInka text-xs">Opcional</span>
                    </FieldLabel>
                    <Select
                      name={field.name}
                      value={field.value}
                      onValueChange={field.onChange}
                      disabled={isSubmitting}
                    >
                      <SelectTrigger
                        id="corporativo-intencionCompra"
                        aria-invalid={fieldState.invalid}
                        className="min-w-[120px] h-12"
                      >
                        <SelectValue placeholder="Seleccione una intención de compra" />
                      </SelectTrigger>

                      <SelectContent position="item-aligned">
                        <SelectItem value="0">Inmediata</SelectItem>
                        <SelectItem value="1">En 1 mes</SelectItem>
                        <SelectItem value="2">En 2 meses</SelectItem>
                        <SelectItem value="3">En 3 meses</SelectItem>
                        <SelectItem value="6">En 6 meses</SelectItem>
                      </SelectContent>
                    </Select>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </div>

            {/* Submit Button */}
            <motion.div
              whileHover={!isSubmitting ? { scale: 1.02 } : {}}
              whileTap={!isSubmitting ? { scale: 0.98 } : {}}
            >
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-redInka to-redDarkInka hover:from-redDarkInka hover:to-redInka text-white py-4 rounded-lg font-semibold text-lg shadow-xl shadow-red-600/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Enviando...
                  </>
                ) : (
                  <>
                    Solicitar Asesoría Ahora
                    <CheckCircle2 className="w-5 h-5" />
                  </>
                )}
              </Button>
            </motion.div>

            <p className="text-xs text-grisDarkInka text-center">
              Al enviar este formulario, aceptas que Automotores Inka se ponga
              en contacto contigo para brindarte información sobre nuestras
              soluciones corporativas.
            </p>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
