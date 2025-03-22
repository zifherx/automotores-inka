import { PresupuestoProvider } from "@/context/presupuestos/presupuestoContext";
import { PresupuestosView } from "./components/PresupuestosView";

export default function PresupuestosPage() {
  return (
    <PresupuestoProvider>
      <PresupuestosView />
    </PresupuestoProvider>
  );
}
