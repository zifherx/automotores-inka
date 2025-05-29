import { Title } from "../Title";

import { iParrafo } from "@/types";

export function ParrafoSection({parrafos,title}: iParrafo) {
  return (
    <div>
      {title !== "" && (
        <Title
          title={title}
          className="text-blueInka mb-4 text-lg text-left font-extrabold"
        />
      )}

      <div>
        {parrafos.map(({ oracion, linkHref }, index) => (
            <p key={index} className="text-base font-normal gap-y-4 leading-7 text-grisDarkInka text-justify">
              {oracion}
              { linkHref ? (
                <a href={`/documents/${linkHref}`} target="_blank" className="text-blueInka hover:underline">
                  {" "}Más detalles aquí
                </a>
              ) : ""}
            </p>

        ))}
      </div>
    </div>
  );
}
