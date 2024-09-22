import { Title } from "@/components/Shared/Title";
import { TabRedAutomotriz } from "./components/TabRedAutomotriz";

import Sucursal from "@/models/Sucursal";
import { dbConnect, serializeDocument } from "@/lib";
import { iSede } from "@/types";

export async function loadSedes() {
  await dbConnect();
  const query = await Sucursal.find({ isActive: true });
  return query.map(serializeDocument) as iSede[];
}

export default async function UbicanosPage() {
  const querySedes = await loadSedes();

  return (
    <div className="p-6 md:p-10">
      <Title
        title="RED AUTOMOTRIZ DE AUTOMOTORES INKA"
        className="text-center text-2xl uppercase font-extrabold text-grisDarkInka"
      />
      <TabRedAutomotriz sedes={querySedes} />
    </div>
  );
}
