import type { Metadata } from "next";

import { SideForm } from "./components/SideForm";

import { BrandsProvider } from "@/context/brands/marcaContext";

export const metadata: Metadata = {
  title: {
    default: "Separa tu cita",
    template: "",
  },
};

export default function SeparaTuCitaPage() {
  return (
    <BrandsProvider>
      <SideForm />
    </BrandsProvider>
  );
}
