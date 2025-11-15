"use client";

import { useParams, useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";

import { FormHeader } from "./FormHeader";
import { ConsumerSection } from "./ConsumerSection";
import { ProductSection } from "./ProductSection";
import { ComplaintSection } from "./ComplaintSection";
import { LegalInfo } from "./LegalInfo";

import { listRSReclamos } from "@/data";
import { formNewReclamoSchema, NewReclamoFormValues } from "@/forms";
import {
  buildReclamoData,
  createReclamo,
  getCurrentDateTime,
  onToast,
  sendReclamoEmail,
  switchRuc,
} from "@/lib";
import { ExtendedFieldErrors, iSede } from "@/types";

export function ReclamoSlugView() {
  const params = useParams();
  const slug = params.slug as string;
  const router = useRouter();

  const [numeroDocumentoDisabled, setNumeroDocumentoDisabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [codigoReclamo, setCodigoReclamo] = useState("");
  const [dealerSeleccionado, setDealerSeleccionado] = useState<
    iSede | undefined
  >(undefined);

  const razonSocial = listRSReclamos.find((rs) => rs.ruta === slug);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<NewReclamoFormValues>({
    resolver: zodResolver(formNewReclamoSchema),
    defaultValues: {
      isConforme: false,
      importeBien: 0,
    },
  });

  const tipoDocumento = watch("tipoDocumento");
  const tipoBien = watch("tipoBien");
  const direccionWatch = watch("direccion");
  const distritoWatch = watch("distrito");
  const provinciaWatch = watch("provincia");
  const departamentoWatch = watch("departamento");

  useEffect(() => {
    if (tipoDocumento) {
      setNumeroDocumentoDisabled(false);
    } else {
      setNumeroDocumentoDisabled(true);
      setValue("numeroDocumento", "");
    }
  }, [tipoDocumento, setValue]);

  const { fecha, hora } = getCurrentDateTime();

  const onHandleSubmit = async (values: NewReclamoFormValues) => {
    setIsLoading(true);
    try {
      const claimData = buildReclamoData({
        ...values,
        sedeCompra: dealerSeleccionado!.ciudad,
        sedeCodexHR: values.sedeCompra.toUpperCase(),
        tipoBien,
        fecha,
        hora,
        numeroReclamo: codigoReclamo.toUpperCase(),
        razonSocial: razonSocial!.name,
        rucEmpresa: switchRuc(razonSocial!.ruta),
        direccionCliente: `${direccionWatch} ,${distritoWatch}, ${provinciaWatch}, ${departamentoWatch}`,
        direccionSede: dealerSeleccionado!.address,
      });

      const [reclamoResult, emailResult] = await Promise.allSettled([
        createReclamo(claimData, `/api/reclamo`),
        sendReclamoEmail(claimData, `/api/send-email/reclamo`),
      ]);

      // console.log(`reclamoResult`, reclamoResult);
      // console.log(`emailResult`, emailResult);

      if (reclamoResult.status === "rejected") {
        throw new Error(`Error al crear reclamo`);
      }

      if (emailResult.status === "rejected") {
        console.warn(`El envío del email falló pero se creo el reclamo`);
        onToast(
          `Reclamo creado, El envío del email podría demorar unos minutos`,
          ``,
          false
        );
      } else {
        onToast(reclamoResult.value?.data.message);
        router.push(`/nosotros/gracias`);
      }
    } catch (err: any) {
      console.log(err.message);
      onToast("Algo salió mal ❌", err.message, true);
    } finally {
      setIsLoading(false);
    }
  };

  if (!razonSocial) {
    return <div>Razon Social no encontrada</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="max-w-5xl mx-auto px-4 py-8">
        <FormHeader
          razonSocial={razonSocial}
          fecha={fecha}
          hora={hora}
          codigoReclamo={codigoReclamo}
          setCodigoReclamo={setCodigoReclamo}
          codexReclamo={
            dealerSeleccionado?.codexHR ? dealerSeleccionado.codexHR : ""
          }
        />

        <form onSubmit={handleSubmit(onHandleSubmit)} className="space-y-8">
          <ConsumerSection
            register={register}
            setValue={setValue}
            watch={watch}
            errors={errors as ExtendedFieldErrors}
            numeroDocumentoDisabled={numeroDocumentoDisabled}
          />
          <ProductSection
            register={register}
            setValue={setValue}
            watch={watch}
            errors={errors}
            sedeSelected={dealerSeleccionado}
            setSedeSelected={setDealerSeleccionado}
          />
          <ComplaintSection
            register={register}
            setValue={setValue}
            watch={watch}
            errors={errors}
            isLoading={isLoading}
          />
        </form>

        <LegalInfo />
      </div>
    </div>
  );
}
