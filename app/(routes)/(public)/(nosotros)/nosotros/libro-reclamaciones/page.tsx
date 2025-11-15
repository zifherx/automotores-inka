import { Metadata } from "next";
import { LibroReclamacionesView } from "./components/LibroReclamacionesView";

export const metadata: Metadata = {
  title: {
    default: "Libro de Reclamaciones",
    template: "",
  },
};

export default function LibroReclamosPage() {
  return (
    <>
      <LibroReclamacionesView />
    </>
  );
}
