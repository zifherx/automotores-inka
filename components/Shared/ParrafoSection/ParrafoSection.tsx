import { cn } from "@/lib";
import { Title } from "../Title";

import { iParrafo } from "@/types";
import { ConditionalTable } from "../ConditionalTable";
import { TableBonoAhorroNunca2025 } from "@/data";

export function ParrafoSection({ parrafos, title }: iParrafo) {
  return (
    <div>
      {title !== "" && (
        <Title
          title={title}
          className={cn(
            "text-blueInka mb-4 text-lg text-left font-extrabold",
            title.includes("\t") ? "whitespace-pre" : "whitespace-normal"
          )}
        />
      )}

      <div>
        {parrafos.map(({ oracion, linkHref, includeTable }, index) => (
          <p
            key={index}
            className={cn(
              "gap-y-4 leading-7 text-grisDarkInka text-justify",
              oracion.includes("\t") ? "ml-5" : "whitespace-normal"
            )}
          >
            {oracion}
            {linkHref ? (
              <a
                href={`/documents/${linkHref}`}
                target="_blank"
                className="text-blueInka hover:underline"
              >
                {" "}
                Más detalles aquí
              </a>
            ) : (
              ""
            )}
            {includeTable && (
              <ConditionalTable
                tHead={TableBonoAhorroNunca2025.tHead}
                tBody={TableBonoAhorroNunca2025.tBody}
              />
            )}
          </p>
        ))}
      </div>
    </div>
  );
}
