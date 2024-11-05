import { CondicionesFormularios } from "@/components/Shared/CondicionesFormularios"
import { Metadata } from "next"
import { CotizadorStep } from "./components/CotizadorStep"

export const metadata: Metadata = {
    title: {
        template: "",
        default: "Cotiza tu auto"
    }
}

export default function StepsCotizacionPage() {
  return (
    <div className="bg-plomoInka">
        <div className="max-w-7xl mx-auto">
        <CotizadorStep/>
        </div>
        <CondicionesFormularios/>
    </div>
  )
}
