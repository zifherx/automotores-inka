import { Metadata } from "next";

import { CatalogoVehicular } from "./components/CatalogoVehicular";

import { BrandsProvider } from "@/context/brands/marcaContext";
import { ModelosProvider } from "@/context/modelos/modeloContext";

export const metadata: Metadata = {
  title: {
    template: "",
    default: "Catálogo",
  },
};

export default async function CatalogoPage() {
  return (
    <BrandsProvider>
      <ModelosProvider>
        <CatalogoVehicular />
      </ModelosProvider>
    </BrandsProvider>
  );
}
