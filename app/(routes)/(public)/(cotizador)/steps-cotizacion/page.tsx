import { Metadata } from "next";

import { CotizadorPasosView } from "./components/CotizadorPasosView";

import { BrandsProvider } from "@/context/brands/marcaContext";
import { ModelosProvider } from "@/context/modelos/modeloContext";
import { SucursalProvider } from "@/context/sucursal/sucursalContext";

export const metadata: Metadata = {
  title: {
    default: "Cotizador Pasos",
    template: "",
  },
};

export default function CotizadosPasosPage() {
  return (
    <BrandsProvider>
      {/* <ModelosProvider> */}
      {/* <SucursalProvider> */}
      <CotizadorPasosView />
      {/* </SucursalProvider> */}
      {/* </ModelosProvider> */}
    </BrandsProvider>
  );
}
