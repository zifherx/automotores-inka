import type { Metadata } from "next";
import { CitaSection } from "../mantenimiento/components/CitaSection";

export const metadata: Metadata = {
  title: {
    default: "Separa tu cita",
    template: ""
  }
}

export default function SeparaTuCitaPage() {
  return (
    <>
      <h1>Separa tu cita</h1>
    </>
  )
}
