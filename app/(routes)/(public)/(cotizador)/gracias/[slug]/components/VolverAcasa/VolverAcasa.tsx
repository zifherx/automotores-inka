import { Home } from "lucide-react";
import Link from "next/link";

export function VolverAcasa() {
  return (
    <Link href="/" className="flex mt-5 hover:underline hover:text-redDarkInka">
      Volver a la página principal
      <Home className="w-6 h-6 ml-2"/>
    </Link>
  )
}
