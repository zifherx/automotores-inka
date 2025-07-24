import { Metadata } from "next";

import { SucursalProvider } from "@/context/sucursal/sucursalContext";
import { ReclamoSlugView } from "./components/ReclamoSlugView";

export const metadata: Metadata = {
  title: {
    template: "",
    default: "Libro de Reclamaciones",
  },
};

export default function FormularioRSPage() {
  return (
    <SucursalProvider>
      <ReclamoSlugView />
    </SucursalProvider>
  );
}
