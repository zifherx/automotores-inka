import { Metadata } from "next";

import { StepsCotizacionView } from "./StepsCotizacionView";

import { BrandsProvider } from "@/context/brands/marcaContext";

export const metadata: Metadata = {
  title: {
    template: "",
    default: "Cotiza tu auto",
  },
};

export default function StepsCotizacionPage() {
  return (
    <BrandsProvider>
      <StepsCotizacionView />
    </BrandsProvider>
  );
}
