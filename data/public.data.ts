import {
  iListLinkUtiles,
  iListValores,
  iObjetivosEmpresa,
  iServicioSVG,
} from "@/interfaces/iPublic";
import { Blocks, Handshake, Medal, Star, Users } from "lucide-react";

export const listServiciosSVG: iServicioSVG[] = [
  {
    id: 1,
    imageUrl: "asesores_personalizados.png",
    title: "Asesores Especializados",
  },
  {
    id: 2,
    imageUrl: "carroceria_pintura.png",
    title: "Servicios de Carrocería y Pintura",
  },
  {
    id: 3,
    imageUrl: "financiamiento.png",
    title: "Opción de Financiamiento",
  },
  {
    id: 4,
    imageUrl: "flotas_camiones.png",
    title: "Flotas y Camiones",
  },
  {
    id: 5,
    imageUrl: "posventa.png",
    title: "Servicio Posventa",
  },
  {
    id: 6,
    imageUrl: "repuestos_accesorios.png",
    title: "Repuestos y Accesorios",
  },
  {
    id: 7,
    imageUrl: "Seguros_gps.png",
    title: "Seguros y GPS",
  },
  {
    id: 8,
    imageUrl: "vehiculos_nuevos.png",
    title: "Vehículos Nuevos",
  },
];

export const listObjetivosEmpresa: iObjetivosEmpresa[] = [
  {
    id: 1,
    title: "Misión",
    description:
      "Brindar soluciones integrales de transporte automotriz, ofreciendo productos y servicios de alta calidad que satisfagan las necesidades y expectativas de nuestros clientes.",
    bgDescription: "redInka",
    imageUrl: "img_mision.jpg",
  },
  {
    id: 2,
    title: "Visión",
    description:
      "Ser reconocidos como el referente y líder indiscutible en el rubro automotriz, destacando por nuestra excelencia en el servicio, calidad de nuestros productos y la satisfacción total de nuestros clientes.",
    bgDescription: "blueInka",
    imageUrl: "img_vision.jpg",
  },
  {
    id: 3,
    title: "Políticas de calidad",
    description:
      "Nuestro compromiso de calidad va dirigido a obtener la satisfacción total de nuestros clientes. En Automotores Inka, nos comprometemos a cumplir con los compromisos adquiridos durante la venta de unidades, repuestos y servicio técnico de los rubros en los que participamos. ",
    bgDescription: "grisInka",
    imageUrl: "img_calidad.jpg",
  },
];

export const listValores: iListValores[] = [
  {
    id: 1,
    icon: Star,
    title: "Pasión",
    descriptionLight: "Trabajamos con ganas,",
    descriptionDark: "disfrutamos lo que hacemos.",
  },
  {
    id: 2,
    icon: Medal,
    title: "Excelencia",
    descriptionLight: "Hacemos las cosas bien,",
    descriptionDark: "y a la primera.",
  },
  {
    id: 3,
    icon: Handshake,
    title: "Respeto",
    descriptionLight: "Vemos y valoramos ",
    descriptionDark: "al otro como persona.",
  },
  {
    id: 4,
    icon: Users,
    title: "Colaboración",
    descriptionLight: "Trabajamos con ganas,",
    descriptionDark: "disfrutamos lo que hacemos.",
  },
  {
    id: 5,
    icon: Blocks,
    title: "Integridad",
    descriptionLight: "Trabajamos con ganas,",
    descriptionDark: "disfrutamos lo que hacemos.",
  },
];

export const listLinkUtiles: iListLinkUtiles[] = [
  {
    id: 1,
    label: "Ubícanos",
    href: "/nosotros/ubicanos",
  },
  {
    id: 2,
    label: "Catálogo de Ligeros",
    href: "/ligeros/catalogo",
  },
  {
    id: 3,
    label: "Cotizador Vehícular",
    href: "/new-cotizacion",
  },
];
