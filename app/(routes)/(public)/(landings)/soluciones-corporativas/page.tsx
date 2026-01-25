import { BrandsProvider } from "@/context/brands/marcaContext";
import { SolucionesCorporativasView } from "./components/SC-View";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Soluciones Corporativas",
    template: "",
  },
};

export default function SolucionesCoporativasPage() {
  return (
    <BrandsProvider>
      <SolucionesCorporativasView />
    </BrandsProvider>
  );
}
