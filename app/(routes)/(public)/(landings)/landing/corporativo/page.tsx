import { Metadata } from "next";
import { CorporativoView } from "./components/Corporativo-View";
import { BrandsProvider } from "@/context/brands/marcaContext";

export const metadata: Metadata = {
  title: {
    default: "Landing Corporativo",
    template: "",
  },
};

export default function CorporativoPage() {
  return (
    <BrandsProvider>
      <CorporativoView />;
    </BrandsProvider>
  );
}
