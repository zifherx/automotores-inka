import { iFichaTecnica } from "@/types";
import { Download } from "lucide-react";
import Link from "next/link";

export function FichaTecnica(props: iFichaTecnica) {
  const { link } = props;

  return (
    <div className="max-w-4xl mx-auto">
      <Link
        href={link}
        target="_blank"
        className="py-3 px-5 rounded-lg bg-[#f1f4f9] flex items-center w-fit mx-auto font-headRegular text-black text-xl hover:bg-redInka hover:text-white"
      >
        Ficha técnica
        <Download className="w-5 h-5 ml-2" strokeWidth={2} />
      </Link>
    </div>
  );
}
