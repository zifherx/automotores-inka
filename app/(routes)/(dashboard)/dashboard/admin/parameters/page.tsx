import { ModuleEmail } from "./components/Module-Email";

export default function ParametersPage() {
  return (
    <>
      <h2 className="text-xl md:text-3xl font-headMedium mb-5">
        Gestión de Parámetros de Sistema
      </h2>
      <div className="py-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        <ModuleEmail />
        <div>Módulo SEO & SEM</div>
      </div>
    </>
  );
}
