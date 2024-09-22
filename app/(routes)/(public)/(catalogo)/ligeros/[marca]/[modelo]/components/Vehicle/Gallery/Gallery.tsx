import { Title } from "@/components/Shared/Title";

import { iGalleries } from "@/types";

export function Gallery(props: iGalleries) {
  const { galeria } = props;

  return (
    <div className="max-w-6xl mx-auto p-2">
      <Title
        title="Galería"
        className="font-headRegular uppercase text-4xl text-center my-10"
      />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 lg:gap-6">
        {galeria.map(({ imageUrl, name }, index) => (
          <div key={index}>
            <img
              className="rounded-lg transition-all hover:scale-105 lg:hover:scale-125"
              src={imageUrl}
              alt={name}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
