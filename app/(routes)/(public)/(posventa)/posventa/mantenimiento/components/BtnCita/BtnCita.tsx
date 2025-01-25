import Link from "next/link";

import { CustomIconTitle } from "@/components/Shared/CustomIconTitle";

import { Calendar, CalendarCheck } from "lucide-react";

export function BtnCita() {
  return (
    <div className="max-w-6xl mx-auto p-2">
      <div className="flex items-center justify-between gap-5 md:mb-20">
        <div className="shadow-[0_0_13px_0_rgba(0,0,0,0.5)] hover:shadow-[0_0_9px_0_rgba(0,0,0,0.5)] transition flex flex-col p-6">
          <CustomIconTitle
            icon={CalendarCheck}
            titleDark="Agenda"
            titleLight="tu cita"
            className="text-blueInka"
          />

          <div className="grid grid-cols-2 items-center mt-5">
            <p className="max-w-xs">
              Ubica el taller más cercano y agenda tu cita indicando fecha y
              hora aquí.
            </p>

            <Link
              href="/posventa/separa-tu-cita"
              className="px-3 py-2 rounded-lg flex flex-row border-2 border-blueInka text-blueInka bg-white w-fit items-center justify-center mx-auto hover:shadow-lg hover:bg-blueDarkInka hover:text-white uppercase font-bold"
            >
              Agenda aquí
              <Calendar className="w-5 h-5 ml-2" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
