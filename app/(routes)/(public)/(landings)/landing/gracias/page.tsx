import { Metadata } from "next";
import { GraciasView } from "./components/GraciasView";

export const metadata: Metadata = {
  title: {
    template: "",
    default: "Gracias",
  },
};

export default function GraciasPage() {
  return (
    <div>
      <GraciasView />
    </div>
  );
}
