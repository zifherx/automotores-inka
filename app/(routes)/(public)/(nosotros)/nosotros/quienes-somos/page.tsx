import { BannerNosotros } from "./components/BannerNosotros";
import { CodigosConducta } from "./components/CodigosConducta";
import { EmpresaSection } from "./components/EmpresaSection";
import { ValoresSection } from "./components/ValoresSection";

export default function QuienesSomosPage() {
  return (
    <>
      <BannerNosotros />
      <EmpresaSection />
      <ValoresSection />
      <CodigosConducta />
      {/* <p>Red multimarca</p> */}
    </>
  );
}
