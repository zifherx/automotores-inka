import { CotizadorStep } from "./components/CotizadorStep";
import { CondicionesFormularios } from "@/components/Shared/CondicionesFormularios";

export function StepsCotizacionView() {
  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto">
        <CotizadorStep />
      </div>
      <CondicionesFormularios />
    </div>
  );
}
