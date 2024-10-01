import { Metadata } from "next";

import { CondicionesFormularios } from "@/components/Shared/CondicionesFormularios";

import { Cotizador } from "./components/Cotizador";

export const metadata: Metadata = {
  title: {
    template: "",
    default: "Cotiza tu auto",
  },
};

export default async function NewCotizacionPage() {
  return (
    <>
      <Cotizador />
      <CondicionesFormularios />
    </>
  );
}
