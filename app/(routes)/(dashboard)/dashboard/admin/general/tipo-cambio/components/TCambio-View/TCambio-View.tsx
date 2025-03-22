import { BtnAddTCambio } from "../BtnAddTCambio";
import { BtnUpdateTable } from "../BtnUpdate-Table";
import { TCambioTable } from "../TCambio-Table";

export function TCambioView() {
  return (
    <div className="p-2">
      <div className="flex justify-between">
        <h2 className="text-xl md:text-3xl font-headMedium">
          Gestión de Tipo de Cambio
        </h2>
        <div className="flex gap-x-2">
          <BtnAddTCambio />
          <BtnUpdateTable />
        </div>
      </div>
      <TCambioTable />
    </div>
  );
}
