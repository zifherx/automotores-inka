import type { Metadata } from "next";
import { SideForm } from "./components/SideForm";

export const metadata: Metadata = {
  title: {
    default: "Separa tu cita",
    template: "",
  },
};

export default function SeparaTuCitaPage() {
  return (
    <>
      <SideForm />
    </>
  );
}
