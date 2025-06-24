import { Metadata } from "next";
import { CitasProvider } from "@/context/citas/citasContext";
import { CitasView } from "./components/CitasView";

export const metadata: Metadata = {
  title: {
    default: "Citas",
    template: "",
  },
};

export default function CitasDashboardPage() {
  return (
    <CitasProvider>
      <CitasView />
    </CitasProvider>
  );
}
