"use client";

import { useRouter, useSearchParams } from "next/navigation";

import { CustomMessage } from "./CustomMessage";

export function GraciasView() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const nombre = searchParams.get("nombre");
  const celular = searchParams.get("celular");

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 flex items-center justify-center p-4">
      <CustomMessage
        customer={nombre ? nombre : ""}
        celular={celular ? celular : ""}
        volverInicio={() => router.push("/")}
      />
    </div>
  );
}
