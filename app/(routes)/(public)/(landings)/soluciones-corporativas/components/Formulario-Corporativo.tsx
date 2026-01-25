/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Barcode,
  Briefcase,
  Building,
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  CorporativoFormType,
  corporativoSchema,
} from "@/forms/corporativo.form";
import { useBrands } from "@/context/brands/marcaContext";
import {
  buildLeadCorporativoRequest,
  createLeadCorporativo,
  enviarCorreoCorporativo,
  onToast,
} from "@/lib";

export function FormularioCorporativo() {
  const { brands } = useBrands();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formCorporativo = useForm<CorporativoFormType>({
    resolver: zodResolver(corporativoSchema),
    defaultValues: {
      nombres: "",
      apellidos: "",
      dni: "",
      razonSocial: "",
      ruc: "",
      marca: "",
      celular: "",
      correoElectronico: "",
      ciudad: "",
      sector_negocio: "",
      intencionCompra: "",
    },
  });

  const marcaSeleccionada = useMemo(() => {
    const marcaId = formCorporativo.watch("marca");
    if (!marcaId) return null;
    return brands.find((item) => item._id === marcaId) || null;
  }, [brands, formCorporativo.watch("marca")]);

  const onSubmit = async (values: CorporativoFormType) => {
    setIsSubmitting(true);

    try {
      const leadCorporativoData = buildLeadCorporativoRequest({
        ...values,
        marcaObject: marcaSeleccionada!,
        marcaId: marcaSeleccionada?._id!,
        marcaText: marcaSeleccionada?.name!,
        marcaSlug: marcaSeleccionada?.slug!,
        sector: values.sector_negocio!,
        ciudad: values.ciudad!,
        intencionCompra: values.intencionCompra!,
      });

      const envioCorreoData = buildLeadCorporativoRequest({
        ...values,
        marcaObject: marcaSeleccionada!,
        marcaId: marcaSeleccionada?._id!,
        marcaText: marcaSeleccionada?.name!,
        marcaSlug: marcaSeleccionada?.slug!,
        sector: values.sector_negocio!,
        ciudad: values.ciudad!,
        intencionCompra: values.intencionCompra!,
      });

      const [leadResult, mailResult] = await Promise.allSettled([
        createLeadCorporativo(leadCorporativoData, "/api/lead-corporativo"),
        enviarCorreoCorporativo(
          envioCorreoData,
          "/api/send-email/lead-corporativo",
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
          false,
        );
      } else {
        onToast(
          "Lead creado con éxito ✅",
          "En breve nuestro equipo especializado se contactará con ustedes",
          false,
        );
      }

      // console.group("📋 LEAD CORPORATIVO");
      // console.log("⏰ Timestamp:", new Date().toLocaleString("es-PE"));
      // console.table({
      //   "Nombre Completo": values.nombres + " " + values.apellidos,
      //   DNI: values.dni,
      //   Email: values.correoElectronico,
      //   Celular: values.celular,
      //   "Razon Social": values.razonSocial,
      //   RUC: values.ruc,
      //   "Marca ID": marcaSeleccionada?._id! || "No especificada",
      //   "Marca Nombre": marcaSeleccionada?.name! || "No especificada",
      //   Ciudad: values.ciudad || "No especificada",
      //   "Intención de Compra": values.intencionCompra || "No especificada",
      //   Sector: values.sector_negocio || "No especificada",
      // });
      // console.groupEnd();

      router.push(
        `/landing/gracias?cliente=${values.nombres + " " + values.apellidos}&documento=${values.dni}`,
      );
    } catch (err: any) {
      console.error("Error al enviar formulario", err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="formulario"
      className="bg-white w-full bg-[url('/images/fondo-tramado-gris.png')] bg-cover bg-center bg-no-repeat"
    >
      <div className="max-w-6xl mx-auto py-10 px-4 md:py-14 md:px-8">
        <h1 className="text-xl md:text-5xl font-headRegular font-bold text-center text-[#05224C]">
          <span className="bg-[#05224C] px-8 py-2 rounded-md text-white">
            Cotiza ahora
          </span>{" "}
          y obtén beneficios
        </h1>
      </div>

      <form
        onSubmit={formCorporativo.handleSubmit(onSubmit)}
        className="max-w-6xl mx-auto space-y-3 p-4 md:space-y-10 pb-10"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-10">
          <Controller
            name="nombres"
            control={formCorporativo.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel
                  htmlFor="corp-nombres"
                  className="font-headBold font-semibold text-[#05224C]"
                >
                  Nombres <span className="text-redInka">*</span>
                </FieldLabel>

                <InputGroup className="h-12 rounded-sm border-2 border-[#05224C]">
                  <InputGroupAddon>
                    <User className="w-6 h-6 text-[#05224C]" strokeWidth={2} />
                  </InputGroupAddon>

                  <InputGroupInput
                    {...field}
                    id="corp-nombres"
                    className="text-[#05224C] text-xl font-bold focus-visible:border-none"
                    aria-invalid={fieldState.invalid}
                    placeholder="Ingresar nombres"
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

          <Controller
            name="apellidos"
            control={formCorporativo.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel
                  htmlFor="corp-apellidos"
                  className="font-headBold font-semibold text-[#05224C]"
                >
                  Apellidos <span className="text-redInka">*</span>
                </FieldLabel>

                <InputGroup className="h-12 rounded-sm border-2 border-[#05224C]">
                  <InputGroupAddon>
                    <User className="w-6 h-6 text-[#05224C]" strokeWidth={2} />
                  </InputGroupAddon>

                  <InputGroupInput
                    {...field}
                    id="corp-apellidos"
                    className="text-[#05224C] text-xl font-bold focus-visible:border-none"
                    aria-invalid={fieldState.invalid}
                    placeholder="Ingresar apellidos"
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

          <Controller
            name="dni"
            control={formCorporativo.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel
                  htmlFor="corp-dni"
                  className="font-headBold font-semibold text-[#05224C]"
                >
                  DNI <span className="text-redInka">*</span>
                </FieldLabel>

                <InputGroup className="h-12 rounded-sm border-2 border-[#05224C]">
                  <InputGroupAddon>
                    <Barcode
                      className="w-6 h-6 text-[#05224C]"
                      strokeWidth={2}
                    />
                  </InputGroupAddon>

                  <InputGroupInput
                    {...field}
                    id="corp-dni"
                    className="text-[#05224C] text-xl font-bold focus-visible:border-none"
                    aria-invalid={fieldState.invalid}
                    placeholder="Ingresar DNI"
                    autoComplete="off"
                    maxLength={8}
                    disabled={isSubmitting}
                    pattern="[0-9]*"
                  />
                </InputGroup>

                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-10">
          <Controller
            name="razonSocial"
            control={formCorporativo.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel
                  htmlFor="corp-razon-social"
                  className="font-headBold font-semibold text-[#05224C]"
                >
                  Razón Social <span className="text-redInka">*</span>
                </FieldLabel>

                <InputGroup className="h-12 rounded-sm border-2 border-[#05224C]">
                  <InputGroupAddon>
                    <Briefcase
                      className="w-6 h-6 text-[#05224C]"
                      strokeWidth={2}
                    />
                  </InputGroupAddon>

                  <InputGroupInput
                    {...field}
                    id="corp-razon-social"
                    className="text-[#05224C] text-xl font-bold focus-visible:border-none"
                    aria-invalid={fieldState.invalid}
                    placeholder="Ingresar razón social"
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

          <Controller
            name="ruc"
            control={formCorporativo.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel
                  htmlFor="corp-ruc"
                  className="font-headBold font-semibold text-[#05224C]"
                >
                  RUC <span className="text-redInka">*</span>
                </FieldLabel>

                <InputGroup className="h-12 rounded-sm border-2 border-[#05224C]">
                  <InputGroupAddon>
                    <Barcode
                      className="w-6 h-6 text-[#05224C]"
                      strokeWidth={2}
                    />
                  </InputGroupAddon>

                  <InputGroupInput
                    {...field}
                    id="corp-ruc"
                    className="text-[#05224C] text-xl font-bold focus-visible:border-none"
                    aria-invalid={fieldState.invalid}
                    placeholder="Ingresar RUC"
                    maxLength={11}
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

          <Controller
            name="marca"
            control={formCorporativo.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel
                  htmlFor="corp-marca"
                  className="font-headBold font-semibold text-[#05224C]"
                >
                  Marca <span className="text-redInka">*</span>
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
                    id="corp-marca"
                    aria-invalid={fieldState.invalid}
                    className="min-w-[120px] h-12 border-2 border-[#05224C]"
                  >
                    <SelectValue placeholder="Seleccione una marca" />
                  </SelectTrigger>

                  <SelectContent position="item-aligned">
                    {brands.length > 0 &&
                      brands
                        .filter((item) => item.isActive)
                        .map(({ _id, name, imageUrl }) => (
                          <SelectItem
                            key={_id}
                            value={_id}
                            className="cursor-pointer"
                          >
                            <div className="flex items-center justify-between gap-5">
                              <Avatar>
                                <AvatarImage src={imageUrl} alt={name} />
                                <AvatarFallback>{name}</AvatarFallback>
                              </Avatar>
                              <span className="font-textRegular uppercase text-sm font-semibold text-[#05224C]">
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
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-10">
          <Controller
            name="celular"
            control={formCorporativo.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel
                  htmlFor="corp-celular"
                  className="font-headBold font-semibold text-[#05224C]"
                >
                  Celular <span className="text-redInka">*</span>
                </FieldLabel>

                <InputGroup className="h-12 rounded-sm border-2 border-[#05224C]">
                  <InputGroupAddon>
                    <Phone className="w-6 h-6 text-[#05224C]" strokeWidth={2} />
                  </InputGroupAddon>

                  <InputGroupInput
                    {...field}
                    id="corp-celular"
                    className="text-[#05224C] text-xl font-bold focus-visible:border-none"
                    aria-invalid={fieldState.invalid}
                    placeholder="Ingresar N° celular"
                    maxLength={9}
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

          <Controller
            name="correoElectronico"
            control={formCorporativo.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel
                  htmlFor="corp-email"
                  className="font-headBold font-semibold text-[#05224C]"
                >
                  E-mail <span className="text-redInka">*</span>
                </FieldLabel>

                <InputGroup className="h-12 rounded-sm border-2 border-[#05224C]">
                  <InputGroupAddon>
                    <Mail className="w-6 h-6 text-[#05224C]" strokeWidth={2} />
                  </InputGroupAddon>

                  <InputGroupInput
                    {...field}
                    id="corp-email"
                    className="text-[#05224C] text-xl font-bold focus-visible:border-none"
                    type="email"
                    aria-invalid={fieldState.invalid}
                    placeholder="Ingresar E-mail"
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

          <Controller
            name="ciudad"
            control={formCorporativo.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel
                  htmlFor="corp-ciudad"
                  className="font-headBold font-semibold text-[#05224C]"
                >
                  Ciudad <span className="text-redInka">*</span>
                </FieldLabel>

                <InputGroup className="h-12 rounded-sm border-2 border-[#05224C]">
                  <InputGroupAddon>
                    <Building
                      className="w-6 h-6 text-[#05224C]"
                      strokeWidth={2}
                    />
                  </InputGroupAddon>

                  <InputGroupInput
                    {...field}
                    id="corp-ciudad"
                    className="text-[#05224C] text-xl font-bold focus-visible:border-none"
                    aria-invalid={fieldState.invalid}
                    placeholder="Ingresar Ciudad"
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

        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-10">
          <Controller
            name="sector_negocio"
            control={formCorporativo.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel
                  htmlFor="corp-sector"
                  className="font-headBold font-semibold text-[#05224C]"
                >
                  Sector <span className="text-redInka">*</span>
                </FieldLabel>

                <Select
                  name={field.name}
                  value={field.value}
                  onValueChange={field.onChange}
                  disabled={isSubmitting}
                >
                  <SelectTrigger
                    id="corp-sector"
                    aria-invalid={fieldState.invalid}
                    className="min-w-[120px] h-12 border-2 border-[#05224C]"
                  >
                    <SelectValue
                      placeholder="Seleccione una intención de compra"
                      className="font-textBold text-[#05224C]"
                    />
                  </SelectTrigger>

                  <SelectContent position="item-aligned">
                    <SelectItem value="agricultura">
                      Agroindustria y agricultura
                    </SelectItem>
                    <SelectItem value="abarrotes">
                      Alimentos y bebidas
                    </SelectItem>
                    <SelectItem value="arrendamiento">
                      Renting Vehicular
                    </SelectItem>
                    <SelectItem value="inmobiliaria">
                      Construcción e inmobiliaria
                    </SelectItem>
                    <SelectItem value="logistica">
                      Distribución y logística
                    </SelectItem>
                    <SelectItem value="ecommerce">E-commerce</SelectItem>
                    <SelectItem value="educacion">Educación</SelectItem>
                    <SelectItem value="servicios-publicos">
                      Energía y servicios públicos
                    </SelectItem>
                    <SelectItem value="eventos">
                      Eventos y Producción
                    </SelectItem>
                    <SelectItem value="farmaceutica">
                      Farmaceutica y salud
                    </SelectItem>
                    <SelectItem value="gobierno">
                      Gobierno y entidades públicas
                    </SelectItem>
                    <SelectItem value="trurismo">Hoteles y Turismo</SelectItem>
                    <SelectItem value="limpieza-industrial">
                      Limpieza industrial
                    </SelectItem>
                    <SelectItem value="mantenimiento">Mantenimiento</SelectItem>
                    <SelectItem value="manufactura">
                      Manufactura e industria
                    </SelectItem>
                    <SelectItem value="mineria">Minería</SelectItem>
                    <SelectItem value="pesca">Industria Pesquera</SelectItem>
                    <SelectItem value="restaurantes">
                      Restaurantes y food service
                    </SelectItem>
                    <SelectItem value="retail">Retail y comercio</SelectItem>
                    <SelectItem value="seguridad">Seguridad privada</SelectItem>
                    <SelectItem value="servicios-generales">
                      Servicios generales
                    </SelectItem>
                    <SelectItem value="telecomunicaciones">
                      Telecomunicaciones
                    </SelectItem>
                    <SelectItem value="transporte">
                      Transporte y carga
                    </SelectItem>
                  </SelectContent>
                </Select>

                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Controller
            name="intencionCompra"
            control={formCorporativo.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel
                  htmlFor="corp-intencion"
                  className="font-headBold font-semibold text-[#05224C]"
                >
                  Periodo de compra <span className="text-redInka">*</span>
                </FieldLabel>

                <Select
                  name={field.name}
                  value={field.value}
                  onValueChange={field.onChange}
                  disabled={isSubmitting}
                >
                  <SelectTrigger
                    id="corp-intencion"
                    aria-invalid={fieldState.invalid}
                    className="min-w-[120px] h-12 border-2 border-[#05224C]"
                  >
                    <SelectValue placeholder="Seleccione una intención de compra" />
                  </SelectTrigger>

                  <SelectContent position="item-aligned">
                    <SelectItem value="0">Inmediata</SelectItem>
                    <SelectItem value="1">En 1 mes</SelectItem>
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

        <motion.div className="pt-2">
          <motion.div
            whileHover={!isSubmitting ? { scale: 1.02 } : {}}
            whileTap={!isSubmitting ? { scale: 0.98 } : {}}
          >
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full text-2xl bg-redInka hover:bg-redDarkInka text-white h-14 rounded-xl font-headBold shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-4"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-6 h-6 animate-spin" />
                  Enviando solicitud...
                </>
              ) : (
                <>
                  Enviar Solicitud
                  <CheckCircle2 className="w-6 h-6" />
                </>
              )}
            </button>
          </motion.div>

          <p className="text-sm font-textRegular text-grisDarkInka text-center mt-4 leading-relaxed ">
            Al enviar este formulario, aceptas que Automotores Inka se ponga en
            contacto contigo para brindarte información sobre nuestras
            soluciones corporativas.
          </p>
        </motion.div>
      </form>
    </section>
  );
}
