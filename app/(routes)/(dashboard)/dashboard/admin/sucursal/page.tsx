import { SucursalModuleView } from "./components/SucursalModuleView";

import { SucursalProvider } from "@/context/sucursal/sucursalContext";

export default async function BrandsPage() {
  return (
    <SucursalProvider>
      <SucursalModuleView />
    </SucursalProvider>
  );
}
