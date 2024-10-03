import type { Metadata } from "next";
import { Cotizacion } from "./components/Cotizacion";
import { CondicionesFormularios } from "@/components/Shared/CondicionesFormularios";

export const metadata: Metadata = {
  title: {
    template: "",
    default: "Cotización",
  },
};

export default async function CotizacionPage() {
  return (
    <>
      <Cotizacion />
      <CondicionesFormularios />
    </>
  );
}
