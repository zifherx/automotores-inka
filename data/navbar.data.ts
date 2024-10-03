import {
  BadgeDollarSign,
  Cable,
  Car,
  CarFront,
  Cog,
  House,
  Images,
  MapPin,
  Scale,
  SquareGanttChart,
  Truck,
  Users,
  Wrench,
} from "lucide-react";

import { iMenuDashboard, iMenuMobile, iServicioPosventa } from "@/interfaces";

export const listServiciosPosventa: iServicioPosventa[] = [
  {
    id: 1,
    title: "Separa tu cita",
    href: "/posventa/mantenimiento",
    description:
      "Ofrecemos mantenimientos preventivos y correctivos para tu vehículo.",
  },
];

export const listItemMenuMobile: iMenuMobile[] = [
  {
    id: 1,
    title: "Inicio",
    href: "/",
    icon: House,
  },
  {
    id: 2,
    title: "Catálogo de Ligeros",
    href: "/ligeros/catalogo",
    icon: Car,
  },
  {
    id: 3,
    title: "Quiénes Somos",
    href: "/nosotros/quienes-somos",
    icon: Users,
  },
  {
    id: 4,
    title: "Ubícanos",
    href: "/nosotros/ubicanos",
    icon: MapPin,
  },
];

export const listItemMenuGeneral: iMenuDashboard[] = [
  {
    id: 1,
    icon: Images,
    label: "Gestión de Portadas",
    href: "/dashboard/admin/covers",
  },
  {
    id: 2,
    icon: Cable,
    label: "Gestión de Carrocería",
    href: "/dashboard/admin/chasis",
  },
  {
    id: 3,
    icon: BadgeDollarSign,
    label: "Gestión de Tipo Cambio",
    href: "/dashboard/admin/tipo-cambio",
  },
  {
    id: 4,
    icon: MapPin,
    label: "Gestión de Sucursales",
    href: "/dashboard/admin/sucursal",
  },
];

export const listItemMenuLegal: iMenuDashboard[] = [
  {
    id: 1,
    icon: Scale,
    label: "Gestión de Reclamos",
    href: "/dashboard/admin/claims",
  },
];

export const listItemMenuADV: iMenuDashboard[] = [
  {
    id: 1,
    icon: SquareGanttChart,
    label: "Gestión de Marcas",
    href: "/dashboard/admin/brands",
  },
  {
    id: 2,
    icon: CarFront,
    label: "Gestión de Ligeros",
    href: "/dashboard/admin/models",
  },
  {
    id: 3,
    icon: Truck,
    label: "Gestión de Camiones",
    href: "/dashboard/admin/trucks",
  },
];

export const listItemMenuVentas: iMenuDashboard[] = [
  {
    id: 1,
    icon: BadgeDollarSign,
    label: "Gestión de Cotizaciones",
    href: "/dashboard/admin/quotes",
  },
];

export const listItemMenuPosventa: iMenuDashboard[] = [
  {
    id: 1,
    icon: Wrench,
    label: "Gestión de Citas",
    href: "/dashboard/admin/appointments",
  },
];

export const listItemMenuSistema: iMenuDashboard[] = [
  {
    id: 1,
    icon: Cog,
    label: "Variables del Sistema",
    href: "/dashboard/admin/parameters",
  },
  {
    id: 2,
    icon: Users,
    label: "Gestión de Usuarios",
    href: "/dashboard/admin/users",
  },
];
