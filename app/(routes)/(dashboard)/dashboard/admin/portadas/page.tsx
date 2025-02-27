import { CoverProvider } from "@/context/covers/coverContext";
import { PortadasView } from "./components/PortadasView";

export default function AdminPortadaPage() {
  return (
    <CoverProvider>
      <PortadasView />
    </CoverProvider>
  );
}
