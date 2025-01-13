import { LiaFacebookF } from "react-icons/lia";
import { FaInstagram } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";
import { FaTiktok } from "react-icons/fa6";
import {
  BookOpen,
  Briefcase,
  Building,
  Car,
  Cookie,
  Copyright,
  NotebookText,
  Scale,
  Truck,
  Users,
} from "lucide-react";

import { iMenuFooter, iRedesSociales } from "@/interfaces";

export const listRedesSociales: iRedesSociales[] = [
  {
    id: 1,
    icon: LiaFacebookF,
    name: "Facebook",
    href: "https://www.facebook.com/dealer.automotoresinka",
  },
  {
    id: 2,
    icon: FaInstagram,
    name: "Instagram",
    href: "https://www.instagram.com/automotoresinka/",
  },
  {
    id: 3,
    icon: FaLinkedinIn,
    name: "Linkedin",
    href: "https://www.linkedin.com/company/dealerautomotoresinka/",
  },
  {
    id: 4,
    icon: FaTiktok,
    name: "Tiktok",
    href: "https://www.tiktok.com/@automotoresinka",
  },
];

export const listSubmenuFooter: iMenuFooter[] = [
  {
    id: 1,
    title: "Vehículos",
    submenu: [
      {
        id: 1,
        href: "/ligeros/catalogo",
        label: "Catálogo de Ligeros",
        icon: Car,
      },
      // {
      //   id: 2,
      //   href: "/camiones/catalogo",
      //   label: "Catálogo de Camiones",
      //   icon: Truck,
      // },
    ],
  },
  {
    id: 2,
    title: "Posventa",
    submenu: [
      {
        id: 1,
        href: "/posventa/mantenimiento",
        label: "Separa tu cita",
        icon: NotebookText,
      },
    ],
  },
  {
    id: 3,
    title: "Nosotros",
    submenu: [
      {
        id: 1,
        href: "/nosotros/quienes-somos",
        label: "Quiénes somos",
        icon: Users,
      },
      {
        id: 2,
        href: "/nosotros/new-ubicanos",
        label: "Ubícanos",
        icon: Building,
      },
      {
        id: 3,
        href: "https://pe.computrabajo.com/sociedad%20de%20automotores%20inka%20sac/empleos",
        label: "Trabaja con nosotros",
        icon: Briefcase,
      },
      {
        id: 4,
        href: "/nosotros/libro-reclamaciones",
        label: "Libro de reclamaciones",
        icon: BookOpen,
      },
    ],
  },
  {
    id: 4,
    title: "Legal",
    submenu: [
      {
        id: 1,
        href: "/legal/copyright",
        label: "Copyright",
        icon: Copyright,
      },
      {
        id: 2,
        href: "/legal/terminos-condiciones",
        label: "Términos y condiciones",
        icon: Scale,
      },
      {
        id: 3,
        href: "/legal/accesibilidad",
        label: "Accesibilidad",
        icon: Cookie,
      },
    ],
  },
];
