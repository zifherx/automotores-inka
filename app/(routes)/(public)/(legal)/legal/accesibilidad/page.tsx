import type { Metadata } from "next";

import { AccesibilidadArticle } from "./components/AccesibilidadArticle";

export const metadata: Metadata = {
  title: {
    default: "Accesibilidad",
    template: "",
  },
};

export default function AccesibilidadPage() {
  return (
    <>
      <AccesibilidadArticle />
    </>
  );
}
