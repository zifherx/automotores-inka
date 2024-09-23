import type { Metadata } from "next";
import { GraciasTemplate } from "./components/GraciasTemplate";

export const metadata:Metadata = {
  title: {
    template: "",
    default: "Gracias"
  }
}

export default function GraciasPage() {
  return (
    <>
      <GraciasTemplate/>
    </>
  )
}
