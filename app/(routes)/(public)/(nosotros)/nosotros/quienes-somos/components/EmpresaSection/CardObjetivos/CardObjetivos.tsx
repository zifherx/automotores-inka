import { cn } from "@/lib";

import { iCardObjetivo } from "@/types";

export function CardObjetivos(props: iCardObjetivo) {
  const { bgDescription, description, imageUrl, title } = props;

  return (
    <div
      className={cn(
        `relative bg-${bgDescription} p-0 rounded-lg shadow-lg hover:shadow-2xl mt-8 text-white`
      )}
    >
      <img
        src={`/images/nosotros/${imageUrl}`}
        alt={title}
        className="rounded-t-lg w-full md:mx-auto"
      />

      <div className="relative p-3 mb-16">
        <div className="flex flex-col mb-3">
          <p className="text-xl min-h-5 lg:min-h-fit font-bold mb-3">{title}</p>
          <p className="text-sm text-left leading-6">{description}</p>
        </div>
      </div>
    </div>
  );
}
