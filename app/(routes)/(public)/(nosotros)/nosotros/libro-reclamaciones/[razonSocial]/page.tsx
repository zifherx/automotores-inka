"use client";

import { useParams } from "next/navigation";
import { Caratula } from "./components/Caratula";
import { HojaReclamo } from "./components/HojaReclamo";

export default function PageRazonSocial() {
  const param = useParams();
  const { razonSocial } = param;

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-8">
      <div className="border border-redInka/20 shadow-md">
        <Caratula slugType={`${razonSocial}`} />
        <HojaReclamo slugType={`${razonSocial}`} />
      </div>
    </div>
  );
}
