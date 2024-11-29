import Image from "next/image";

export function BannerCita() {
  return (
    <div className="max-w-6xl mx-auto p-2">
      <div className="grid grid-cols-1 md:grid-cols-[60%,1fr] gap-1">
        <div className="">
          <Image
            src="/images/banner-servicios.png"
            alt="Separa tu cita"
            width={800}
            height={600}
          />
        </div>
        <div className="bg-blueInka flex items-center">
          <div className="p-10 text-white">
            <div className="flex items-center justify-center flex-col gap-5">
              <h2 className="text-xl md:text-5xl text-center font-bold">
                Gestiona tu Servicio de Taller
              </h2>
              <p className="text-sm md:text-lg leading-3">
                Ahora puedes agendar, reagendar o cancelar tu cita de
                mantenimiento desde tu computador o dispositivo móvil.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
