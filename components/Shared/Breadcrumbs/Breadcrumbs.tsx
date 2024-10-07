import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import { iMigajas } from "@/types";

export function Breadcrumbs(props: iMigajas) {
  const { marca } = props;

  return (
    <Breadcrumb className="pb-2 px-2">
      <BreadcrumbList className="font-headRegular text-lg">
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Inicio</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>Catálogo</BreadcrumbPage>
        </BreadcrumbItem>
        {marca !== "" && <BreadcrumbSeparator />}

        {marca && (
          <BreadcrumbItem
            className={
              marca == "dfsk" || marca == "jmc" ? "uppercase" : "capitalize"
            }
          >
            <BreadcrumbPage>{marca}</BreadcrumbPage>
          </BreadcrumbItem>
        )}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
