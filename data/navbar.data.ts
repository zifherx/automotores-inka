import {
  BadgeDollarSign,
  Cable,
  Calendar,
  Car,
  CarFront,
  ChartBar,
  Cog,
  House,
  Images,
  MapPin,
  Newspaper,
  NotebookText,
  Scale,
  ShoppingBag,
  ShoppingBasket,
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
    title: "Catálogo de ligeros",
    href: "/ligeros/catalogo",
    icon: Car,
  },
  {
    id: 3,
    title: "Separa tu cita",
    href: "/posventa/mantenimiento",
    icon: NotebookText,
  },
  {
    id: 4,
    title: "Quiénes Somos",
    href: "/nosotros/quienes-somos",
    icon: Users,
  },
  {
    id: 5,
    title: "Ubícanos",
    href: "/nosotros/new-ubicanos",
    icon: MapPin,
  },
];

export const listItemMenuGeneral: iMenuDashboard[] = [
  {
    id: 1,
    icon: Images,
    label: "Gestión de Portadas",
    href: "/dashboard/admin/general/portadas",
  },
  {
    id: 2,
    icon: Cable,
    label: "Gestión de Carrocería",
    href: "/dashboard/admin/general/chasis",
  },
  {
    id: 3,
    icon: BadgeDollarSign,
    label: "Gestión de Tipo Cambio",
    href: "/dashboard/admin/general/tipo-cambio",
  },
  {
    id: 4,
    icon: MapPin,
    label: "Gestión de Sucursales",
    href: "/dashboard/admin/general/sucursal",
  },
  {
    id: 5,
    icon: Newspaper,
    label: "Gestión de Noticias",
    href: "/dashboard/admin/general/noticias",
  },
];

export const listItemMenuLegal: iMenuDashboard[] = [
  {
    id: 1,
    icon: Scale,
    label: "Gestión de Reclamos",
    href: "/dashboard/admin/legal/claims",
  },
];

export const listItemMenuADV: iMenuDashboard[] = [
  {
    id: 1,
    icon: SquareGanttChart,
    label: "Gestión de Marcas",
    href: "/dashboard/admin/adv/brands",
  },
  {
    id: 2,
    icon: CarFront,
    label: "Gestión de Vehículos",
    href: "/dashboard/admin/adv/models",
  },
  // {
  //   id: 3,
  //   icon: Truck,
  //   label: "Gestión de Camiones",
  //   href: "/dashboard/admin/trucks",
  // },
];

export const listItemMenuComercial: iMenuDashboard[] = [
  {
    id: 1,
    icon: BadgeDollarSign,
    label: "Gestión de Cotizaciones",
    href: "/dashboard/admin/comercial/quotes",
  },
  {
    id: 2,
    icon: ShoppingBag,
    label: "Gestión de Concursos",
    href: "/dashboard/admin/comercial/contest",
  },
];

export const listItemMenuPosventa: iMenuDashboard[] = [
  {
    id: 1,
    icon: Wrench,
    label: "Gestión de Citas",
    href: "/dashboard/admin/pos-venta/appointments",
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

export const listItemMenuMarketing: iMenuDashboard[] = [
  {
    id: 1,
    icon: Calendar,
    label: "Presupuestos",
    href: "/dashboard/admin/marketing/presupuestos",
  },
  {
    id: 2,
    icon: ShoppingBasket,
    label: "Proyección de Gastos",
    href: "/dashboard/admin/marketing/proyeccion-gastos",
  },
  {
    id: 3,
    icon: ChartBar,
    label: "Reportes",
    href: "/dashboard/admin/marketing/reportes",
  },
];
