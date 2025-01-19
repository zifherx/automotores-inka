import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";

import { BtnAddTipoCambio } from "./components/BtnAddTipoCambio";
import { ListTipoCambio } from "./components/ListTipoCambio";

import { isAdministrator } from "@/lib";

export default async function TipoCambioPage() {
  const { userId } = await auth();

  if (!userId || !isAdministrator(userId)) return redirect("/");

  return (
    <>
      <div className="flex justify-between mb-5">
        <h2 className="flex items-center gap-1 text-xl md:text-3xl font-headMedium">
          Gestión de Tipo de Cambio -
        </h2>
        <BtnAddTipoCambio />
      </div>
      <ListTipoCambio />
    </>
  );
}
