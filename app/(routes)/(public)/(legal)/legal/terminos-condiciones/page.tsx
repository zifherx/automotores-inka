import { Metadata } from "next";
import { TerminosArticle } from "./components/TerminosArticle";

export const metadata: Metadata = {
  title: {
    default: "Términos y Condiciones",
    template: "",
  },
};

export default function TerminosCondicionesPage() {
  return (
    <>
      <TerminosArticle />
    </>
  );
}
