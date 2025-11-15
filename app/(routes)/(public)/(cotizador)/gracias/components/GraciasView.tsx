"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { CustomMessage } from "./CustomMessage";

export function GraciasView() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const nombre = searchParams.get("nombre");
  const celular = searchParams.get("celular");

  return (
    <div className="flex items-center justify-center min-h-screen bg-grisInka/25">
      <CustomMessage
        customer={nombre ? nombre : ""}
        celular={celular ? celular : ""}
        volverInicio={() => router.push("/")}
      />
    </div>
  );
}
