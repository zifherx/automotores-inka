import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import { iMigajas } from "@/types";

export function Migajas(props: iMigajas) {
  const { marca, modelo } = props;

  return (
    <Breadcrumb className=" mb-8 md:mb-0">
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
            className="capitalize"
          >
            {marca}
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage className="capitalize">
            {modelo?.replace(/-/g, " ")}
          </BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}
