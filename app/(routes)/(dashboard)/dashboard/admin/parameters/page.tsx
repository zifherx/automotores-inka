import { dbConnect, serializeDocument } from "@/lib";
import { ModuleEmail } from "./components/Module-Email";
import { SystemEmail } from "@/models";
import { iMailSystem } from "@/types";

const loadSystemMail = async () => {
  await dbConnect();
  const query = await SystemEmail.find({});
  return query.map(serializeDocument) as iMailSystem[];
};

export default async function ParametersPage() {
  const queryMail = await loadSystemMail();
  return (
    <>
      <h2 className="text-xl md:text-3xl font-headMedium mb-5">
        Gestión de Parámetros de Sistema
      </h2>
      <div className="py-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        <ModuleEmail mails={queryMail} />
        <div>Módulo SEO & SEM</div>
      </div>
    </>
  );
}
