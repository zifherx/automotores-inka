import { Metadata } from "next";
import { PromocionLegalView } from "./components/PromocionLegalView";

export const metadata: Metadata = {
  title: {
    default: "Promociones",
    template: "",
  },
};

export default function PromocionesPage() {
  return (
    <>
      <PromocionLegalView />
    </>
  );
}
