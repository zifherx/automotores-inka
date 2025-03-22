import { QuotesProvider } from "@/context/quotes/quotesContext";
import { CotizacionesView } from "./components/CotizacionesView";

export default function CotizacionesDashboardPage() {
  return (
    <QuotesProvider>
      <CotizacionesView />
    </QuotesProvider>
  );
}
