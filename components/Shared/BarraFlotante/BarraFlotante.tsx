"use client";

import { useState } from "react";
import { FlotanteCotizador } from "../FlotanteCotizador";
import { FlotanteWhatsapp } from "../FlotanteWhatsapp";

export function BarraFlotante() {
  const [hoveredBtn, setHoveredBtn] = useState<string | null>(null);


  return (
    <div
      className="fixed top-1/2 right-0 transform -translate-y-1/2 flex flex-col items-end overflow-hidden"
      onMouseLeave={() => setHoveredBtn(null)}
    >
      <FlotanteCotizador hovered={hoveredBtn} setHovered={setHoveredBtn} />

      {/* <FlotanteWhatsapp hovered={hoveredBtn} setHovered={setHoveredBtn} /> */}
    </div>
  );
}
