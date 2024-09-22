import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { RevealElement } from "@/components/Shared/RevealElement";

import { PencilLine } from "lucide-react";
import { iCardModel } from "@/types";

export function CotizaAhora(props: iCardModel) {
  const { model } = props;
  const { name, imageUrl } = model;

  const params = useParams();

  return (
    <div className="p-0 lg:p-6 max-w-7xl mx-auto my-14 lg:my-24">
      <div className="bg-black rounded-xl p-6 relative lg:p-24">
        <RevealElement
          position="bottom"
          className="flex lg:absolute lg:-right-28 top-0 lg:top-0 "
        >
          <Image
            className="mx-auto"
            src={imageUrl}
            alt={name}
            width={600}
            height={600}
            priority
          />
        </RevealElement>

        <div className="lg:max-w-lg lg:flex gap-x-6 mx-auto lg:mx-0">
          <div className="text-white flex flex-col gap-3 text-center lg:text-left">
            <div className="">
              <p className="text-lg font-textRegular">
                ¿Aún no estás seguro de cotizar?
              </p>
              <h3 className="text-2xl">
                ¡Entérate de información exclusiva sobre este {name}!
              </h3>
            </div>

            <Link
              href={`/cotizacion?modelo=${params.modelo}`}
              className="py-2 px-3 bg-transparent mx-auto lg:mx-0 flex items-center rounded-xl text-lg w-fit font-headMedium border-2 border-white hover:bg-white hover:text-black"
            >
              Cotizar ahora
              <PencilLine className="w-5 h-5 ml-2" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
