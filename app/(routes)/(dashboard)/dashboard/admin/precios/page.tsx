import { GestionPreciosView } from "./components/GestionPreciosView";

import { ModelosProvider } from "@/context/modelos/modeloContext";

export default function AdminPreciosPage() {
  return (
    <ModelosProvider>
      <GestionPreciosView />
    </ModelosProvider>
  );
}
