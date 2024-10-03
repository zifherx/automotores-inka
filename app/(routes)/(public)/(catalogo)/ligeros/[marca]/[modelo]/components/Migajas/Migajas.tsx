import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { cn } from "@/lib";

import { iMigajas } from "@/types";

export function Migajas(props: iMigajas) {
  const { marca, modelo } = props;

  return (
    <Breadcrumb className="mb-8 md:mb-5">
      <BreadcrumbList className="headRegular text-lg">
        <BreadcrumbItem>
          <BreadcrumbLink href="/" className="text-grisInka hover:text-black">
            Inicio
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="/ligeros/catalogo">
            Catalogo Ligeros
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink
            href={`/ligeros/catalogo?marca=${marca}`}
            className={cn(
              marca === "dfsk" || marca === "jmc" ? "uppercase" : "capitalize"
            )}
          >
            {marca}
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage className="capitalize">
            {/* {modelo?.replace(/-/g, " ")} */}
            {modelo}
          </BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}
