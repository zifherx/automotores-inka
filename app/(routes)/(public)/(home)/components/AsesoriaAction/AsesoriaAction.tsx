import { Button } from "@/components/ui/button";

export function AsesoriaAction() {
  return (
    <div className="bg-black text-white">
      <div className="max-w-6xl mx-auto p-6 lg:py-14 grid grid-cols-1 md:grid-cols-[60%,1fr]">
        <div className="flex flex-col gap-y-5">
          <h2 className="uppercase font-bold text-xl">¿Necesitas asesoría?</h2>
          <p className="leading-tight font-light">
            Contáctate con nuestra agencia más cercana, y solicita una cita para
            experimentar la tecnología y potencia multimarca.
          </p>
        </div>
        <div className="flex items-center mx-auto mt-5">
          <Button
            className="bg-redInka hover:bg-redDarkInka uppercase rounded-xl font-bold"
            size="lg"
          >
            Contáctanos
          </Button>
        </div>
      </div>
    </div>
  );
}
