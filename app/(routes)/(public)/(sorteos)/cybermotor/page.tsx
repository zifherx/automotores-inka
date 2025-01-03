import { Metadata } from "next";
import Image from "next/image";

import { SectionForm } from "./components/SectionForm";

export const metadata:Metadata = {
    title: {
        template: "",
        default: "Cybermotor",
      },
}

export default function CyberMotorPage() {
  return (
    <div className="max-w-6xl mx-auto p-4">
        <Image src="/images/logo-cybermotor.gif" alt="Cybermotor - Automotores Inka" height={250} width={500} priority className="object-cover mx-auto"/>
        <SectionForm/>
    </div>
  )
}
