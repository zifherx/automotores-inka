import type { Metadata } from "next";

import { CitaSection } from "./components/CitaSection";

export const metadata: Metadata = {
  title: {
    default: "Mantenimiento",
    template: ""
  }
}

export default function SeparaTuCitaPage() {
  return (
    <>
      <CitaSection/>
    </>
  )
}
