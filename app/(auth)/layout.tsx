import { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="grid lg:grid-cols-2 h-full items-center justify-center">
      <div className="flex items-center justify-center">{children}</div>
      <div className="hidden lg:flex lg:bg-slate-100 lg:flex-col h-full justify-center items-center">
        <Image
          src="/images/logo-color.png"
          alt="Logo Automotores Inka"
          width={500}
          height={150}
        />
        <h1 className="text-2xl font-bold">By Ziphonex Tech</h1>
        <Link href="/" className="font-textItalicMedium mt-5 hover:underline">
          Volver a la web
        </Link>
      </div>
    </div>
  );
}
