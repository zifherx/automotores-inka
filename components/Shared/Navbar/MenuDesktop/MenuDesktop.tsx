"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";

import { ListItem } from "../ListItem";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

import { cn } from "@/lib/utils";

import { listServiciosPosventa } from "@/data";
import { iBrand } from "@/types";

export function MenuDesktop() {
  const [listBrands, setListBrands] = useState<iBrand[]>([]);

  const linkBolsaTrabajo =
    "https://pe.computrabajo.com/sociedad%20de%20automotores%20inka%20sac/empleos";

  const getBrands = async () => {
    try {
      const query = await axios.get("/api/marca");
      if (query.status === 200) {
        setListBrands(query.data.obj);
      }
    } catch (err) {
      setListBrands([]);
    }
  };

  useEffect(() => {
    getBrands();
  }, []);

  return (
    <NavigationMenu className="z-50">
      <NavigationMenuList>
        <NavigationMenuItem>
          <Link href="/" legacyBehavior passHref>
            <NavigationMenuLink
              className={cn(
                navigationMenuTriggerStyle(),
                "bg-transparent font-headMedium text-black text-lg"
              )}
            >
              Inicio
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="bg-transparent font-headMedium text-black text-lg">
            Vehículos
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-5 md:w-[500px] lg:grid-cols-2">
              {listBrands.map(
                ({ _id, name, isActive, slug }) =>
                  isActive && (
                    <ListItem
                      key={_id}
                      href={`/ligeros/catalogo?marca=${slug}`}
                      title={name}
                    />
                  )
              )}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="bg-transparent font-headMedium text-black text-lg">
            Nosotros
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-6 md:w-[500px] lg:w-[800px] lg:grid-cols-[.75fr_1fr]">
              <ListItem href="/nosotros/quienes-somos" title="Nuestra Empresa">
                Trabajamos con marcas líderes en el rubro automotriz desde hace
                más de 12 años.
              </ListItem>
              <ListItem href="/nosotros/new-ubicanos" title="Ubícanos">
                Concesionario peruano autorizado con presencia en Chiclayo,
                Trujillo, Chimbote y Lima.
              </ListItem>
              <ListItem href={linkBolsaTrabajo} title="Bolsa de Trabajo">
                Crece con nosotros y haz línea de carrera y evolucionemos
                juntos.
              </ListItem>
              <ListItem
                href="/nosotros/libro-reclamaciones"
                title="Libro de Reclamaciones"
              >
                En Sociedad Automotores Inka SAC y Grupo Peramas SAC, valoramos
                tu opinión. Aquí puedes registrar tus inquietudes y sugerencias
                para mejorar nuestro servicio.
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="bg-transparent font-headMedium text-black text-lg">
            Posventa
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
              {listServiciosPosventa.map(({ id, title, description, href }) => (
                <ListItem key={id} title={title} href={href}>
                  {description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
