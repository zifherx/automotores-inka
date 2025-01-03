import Image from "next/image";
import Link from "next/link";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function BtnWhatsapp() {
  const urlWhatsapp =
    "https://api.whatsapp.com/send/?phone=51972051479&text=Hola+%2AAutomotores+Inka%2A%21+Necesito+informaci%C3%B3n+de+Automotores+Inka+https%3A%2F%2Fautomotoresinka.pe&type=phone_number&app_absent=0";

  return (
    <div className="fixed bottom-20 right-10 z-50 inline-flex items-center justify-center w-fit">
      <div className="absolute z-10 top-0 left-0 w-full h-full rounded-full bg-[#25d366] animate-ping"></div>
      <div className="relative z-20">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link href={urlWhatsapp} target="_blank">
                <Image
                  src="/images/whatsapp.png"
                  alt="Whataspp Logo"
                  width={50}
                  height={50}
                />
              </Link>
            </TooltipTrigger>
            <TooltipContent side="left">
              <p>¡Compra tu unidad ya!</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
}
