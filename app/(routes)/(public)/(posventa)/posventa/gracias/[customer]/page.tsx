import type { Metadata } from "next";
import { MainGracias } from "./components/MainGracias";

export const metadata: Metadata = {
  title: {
    default: "Gracias por tu cita",
    template: "",
  },
};

export default function GraciasServicePage() {
  return (
    <>
      <MainGracias />
    </>
  );
}
