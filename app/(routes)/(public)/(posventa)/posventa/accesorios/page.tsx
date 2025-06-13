import { Metadata } from "next";

import { AccesoriosView } from "./components/AccesoriosView";
import { EnMantenimientoView } from "./components/EnMantenimientoView";

import { BrandsProvider } from "@/context/brands/marcaContext";

export const metadata: Metadata = {
  title: {
    default: "Accesorios Originales",
    template: "",
  },
};

export default function AccesoriosPage() {
  return (
    <BrandsProvider>
      {/* <EnMantenimientoView /> */}
      <AccesoriosView />
    </BrandsProvider>
  );
}
