import {
  iIconText,
  iListLinkUtiles,
  iListValores,
  iObjetivosEmpresa,
  iProduct,
  iReclamosRS,
  iServicioSVG,
  iTalleres,
  ModelsByBrand,
  tDepartamento,
} from "@/interfaces/iPublic";
import { iParrafo, iTipoServicio, ProductCategory } from "@/types";

import {
  Blocks,
  Car,
  Clock,
  Handshake,
  MapPin,
  Medal,
  Star,
  Users,
} from "lucide-react";

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
    imageUrl: "seguros_gps.png",
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
    descriptionLight: "Enfrentamos los desafios",
    descriptionDark: "como un solo equipo.",
  },
  {
    id: 5,
    icon: Blocks,
    title: "Integridad",
    descriptionLight: "Generamos confianza",
    descriptionDark: "haciendo lo correcto.",
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

export const listRSReclamos: iReclamosRS[] = [
  {
    id: 1,
    name: "SOCIEDAD AUTOMOTORES INKA S.A.C.",
    ruta: "hr-sai",
  },
  {
    id: 2,
    name: "GRUPO PERAMAS S.A.C.",
    ruta: "hr-gp",
  },
];

export const listDepartamentos: tDepartamento[] = [
  {
    id: 1,
    name: "Amazonas",
    value: "amazonas",
    provincias: [
      {
        id: 1,
        name: "Chachapoyas",
        value: "chachapoyas",
      },
      {
        id: 2,
        name: "Bagua",
        value: "bagua",
      },
      {
        id: 3,
        name: "Bongara",
        value: "bongara",
      },
      {
        id: 4,
        name: "Condorcanqui",
        value: "condorcanqui",
      },
      {
        id: 5,
        name: "Luya",
        value: "luya",
      },
      {
        id: 6,
        name: "Rodriguez de Mendoza",
        value: "rodriguez-de-mendoza",
      },
      {
        id: 7,
        name: "Utcubamba",
        value: "utcubamba",
      },
    ],
  },
  {
    id: 2,
    name: "Ancash",
    value: "ancash",
    provincias: [
      {
        id: 1,
        name: "Huaraz",
        value: "huaraz",
      },
      {
        id: 2,
        name: "Aija",
        value: "aija",
      },
      {
        id: 3,
        name: "Antonio Raymondi",
        value: "antonio-raymondi",
      },
      {
        id: 4,
        name: "Asuncion",
        value: "asuncion",
      },
      {
        id: 5,
        name: "Bolognesi",
        value: "bolognesi",
      },
      {
        id: 6,
        name: "Carhuaz",
        value: "carhuaz",
      },
      {
        id: 7,
        name: "Carlos Fitzcarrald",
        value: "carlos-fitzcarrald",
      },
      {
        id: 8,
        name: "Casma",
        value: "casma",
      },
      {
        id: 9,
        name: "Corongo",
        value: "corongo",
      },
      {
        id: 10,
        name: "Huari",
        value: "huari",
      },
      {
        id: 11,
        name: "Huarmey",
        value: "huarmey",
      },
      {
        id: 12,
        name: "Huaylas",
        value: "huaylas",
      },
      {
        id: 13,
        name: "Mariscal Luzuriaga",
        value: "mariscal-luzuriaga",
      },
      {
        id: 14,
        name: "Ocros",
        value: "ocros",
      },
      {
        id: 15,
        name: "Pallasca",
        value: "pallasca",
      },
      {
        id: 16,
        name: "Pomabamba",
        value: "pomabamba",
      },
      {
        id: 17,
        name: "Recuay",
        value: "recuay",
      },
      {
        id: 18,
        name: "Santa",
        value: "santa",
      },
      {
        id: 19,
        name: "Sihuas",
        value: "Sihuas",
      },
      {
        id: 20,
        name: "Yungay",
        value: "yungay",
      },
    ],
  },
  {
    id: 3,
    name: "Apurimac",
    value: "apurimac",
    provincias: [
      {
        id: 1,
        name: "Abancay",
        value: "abancay",
      },
      {
        id: 2,
        name: "Andahuaylas",
        value: "andahuaylas",
      },
      {
        id: 3,
        name: "Antabamba",
        value: "antabamba",
      },
      {
        id: 4,
        name: "Aymaraes",
        value: "aymaraes",
      },
      {
        id: 5,
        name: "Cotabambas",
        value: "cotabambas",
      },
      {
        id: 6,
        name: "Chincheros",
        value: "chincheros",
      },
      {
        id: 7,
        name: "Grau",
        value: "grau",
      },
    ],
  },
  {
    id: 4,
    name: "Arequipa",
    value: "arequipa",
    provincias: [
      {
        id: 1,
        name: "Arequipa",
        value: "arequipa",
      },
      {
        id: 2,
        name: "Camana",
        value: "camana",
      },
      {
        id: 3,
        name: "Caraveli",
        value: "caraveli",
      },
      {
        id: 4,
        name: "Castilla",
        value: "castilla",
      },
      {
        id: 5,
        name: "Caylloma",
        value: "caylloma",
      },
      {
        id: 6,
        name: "Condesuyos",
        value: "condesuyos",
      },
      {
        id: 7,
        name: "Islay",
        value: "islay",
      },
      {
        id: 8,
        name: "La Union",
        value: "la-union",
      },
    ],
  },
  {
    id: 5,
    name: "Ayacucho",
    value: "ayacucho",
    provincias: [
      {
        id: 1,
        name: "Huamanga",
        value: "huamanga",
      },
      {
        id: 2,
        name: "Cangallo",
        value: "cangallo",
      },
      {
        id: 3,
        name: "Huanca Sancos",
        value: "huanca-sancos",
      },
      {
        id: 4,
        name: "Huanta",
        value: "huanta",
      },
      {
        id: 5,
        name: "La Mar",
        value: "la-mar",
      },
      {
        id: 6,
        name: "Lucanas",
        value: "lucanas",
      },
      {
        id: 7,
        name: "Parinacochas",
        value: "parinacochas",
      },
      {
        id: 8,
        name: "Paucar del Sara Sara",
        value: "paucar-de-sara-sara",
      },
      {
        id: 9,
        name: "Sucre",
        value: "sucre",
      },
      {
        id: 10,
        name: "Victor Fajardo",
        value: "victor-fajardo",
      },
      {
        id: 11,
        name: "Vilcas Huaman",
        value: "vilcas-huaman",
      },
    ],
  },
  {
    id: 6,
    name: "Cajamarca",
    value: "cajamarca",
    provincias: [
      {
        id: 1,
        name: "Cajamarca",
        value: "cajamarca",
      },
      {
        id: 2,
        name: "Cajabamba",
        value: "cajabamba",
      },
      {
        id: 3,
        name: "Celendin",
        value: "celendin",
      },
      {
        id: 4,
        name: "Chota",
        value: "chota",
      },
      {
        id: 5,
        name: "Contumaza",
        value: "contumaza",
      },
      {
        id: 6,
        name: "Cutervo",
        value: "cutervo",
      },
      {
        id: 7,
        name: "Hualgayoc",
        value: "hualgayoc",
      },
      {
        id: 8,
        name: "Jaen",
        value: "jaen",
      },
      {
        id: 9,
        name: "San Ignacio",
        value: "san-ignacio",
      },
      {
        id: 10,
        name: "San Marcos",
        value: "san-marcos",
      },
      {
        id: 11,
        name: "San Miguel",
        value: "san-miguel",
      },
      {
        id: 12,
        name: "San Pablo",
        value: "san-pablo",
      },
      {
        id: 13,
        name: "Santa Cruz",
        value: "santa-cruz",
      },
    ],
  },
  {
    id: 7,
    name: "Callao",
    value: "callao",
    provincias: [],
  },
  {
    id: 8,
    name: "Cusco",
    value: "cusco",
    provincias: [
      {
        id: 1,
        name: "Cusco",
        value: "cusco",
      },
      {
        id: 2,
        name: "Acomayo",
        value: "acomayo",
      },
      {
        id: 3,
        name: "Anta",
        value: "anta",
      },
      {
        id: 4,
        name: "Calca",
        value: "calca",
      },
      {
        id: 5,
        name: "Canas",
        value: "canas",
      },
      {
        id: 6,
        name: "Canchis",
        value: "canchis",
      },
      {
        id: 7,
        name: "Chumbivilcas",
        value: "chumbivilcas",
      },
      {
        id: 8,
        name: "Espinar",
        value: "espinar",
      },
      {
        id: 9,
        name: "La Convencion",
        value: "la-convencion",
      },
      {
        id: 10,
        name: "Paruro",
        value: "paruro",
      },
      {
        id: 11,
        name: "Paucartambo",
        value: "paucartambo",
      },
      {
        id: 12,
        name: "Quispicanchi",
        value: "quispicanchi",
      },
      {
        id: 13,
        name: "Urubamba",
        value: "urubamba",
      },
    ],
  },
  {
    id: 9,
    name: "Huancavelica",
    value: "huancavelica",
    provincias: [
      {
        id: 1,
        name: "Huancavelica",
        value: "huancavelica",
      },
      {
        id: 2,
        name: "Acobamba",
        value: "acobamba",
      },
      {
        id: 3,
        name: "Angaraes",
        value: "angaraes",
      },
      {
        id: 4,
        name: "Castrovirreyna",
        value: "castrovirreyna",
      },
      {
        id: 5,
        name: "Churcampa",
        value: "churcampa",
      },
      {
        id: 6,
        name: "Huaytara",
        value: "huaytara",
      },
      {
        id: 7,
        name: "Tayacaja",
        value: "tayacaja",
      },
    ],
  },
  {
    id: 10,
    name: "Huánuco",
    value: "huanuco",
    provincias: [
      {
        id: 1,
        name: "Huanuco",
        value: "huanuco",
      },
      {
        id: 2,
        name: "Ambo",
        value: "ambo",
      },
      {
        id: 3,
        name: "Dos de Mayo",
        value: "dos-de-mayo",
      },
      {
        id: 4,
        name: "Huacaybamba",
        value: "huacaybamba",
      },
      {
        id: 5,
        name: "Huamalies",
        value: "huamalies",
      },
      {
        id: 6,
        name: "Leoncio Prado",
        value: "leoncio-prado",
      },
      {
        id: 7,
        name: "Marañon",
        value: "maranon",
      },
      {
        id: 8,
        name: "Pachitea",
        value: "pachitea",
      },
      {
        id: 9,
        name: "Puerto Inca",
        value: "puerto-inca",
      },
      {
        id: 10,
        name: "Lauricocha",
        value: "lauricocha",
      },
      {
        id: 11,
        name: "Yarowilca",
        value: "yarowilca",
      },
    ],
  },
  {
    id: 11,
    name: "Ica",
    value: "ica",
    provincias: [
      {
        id: 1,
        name: "Ica",
        value: "ica",
      },
      {
        id: 2,
        name: "Chincha",
        value: "chincha",
      },
      {
        id: 3,
        name: "Nazca",
        value: "nazca",
      },
      {
        id: 4,
        name: "Palpa",
        value: "palpa",
      },
      {
        id: 5,
        name: "Pisco",
        value: "pisco",
      },
    ],
  },
  {
    id: 12,
    name: "Junin",
    value: "junin",
    provincias: [
      {
        id: 1,
        name: "Huancayo",
        value: "huancayo",
      },
      {
        id: 2,
        name: "Concepcion",
        value: "concepcion",
      },
      {
        id: 3,
        name: "Chanchamayo",
        value: "chanchamayo",
      },
      {
        id: 4,
        name: "Jauja",
        value: "jauja",
      },
      {
        id: 5,
        name: "Junin",
        value: "junin",
      },
      {
        id: 6,
        name: "Satipo",
        value: "satipo",
      },
      {
        id: 7,
        name: "Tarma",
        value: "tarma",
      },
      {
        id: 8,
        name: "Yauli",
        value: "yauli",
      },
      {
        id: 9,
        name: "Chupaca",
        value: "chupaca",
      },
    ],
  },
  {
    id: 13,
    name: "La Libertad",
    value: "la-libertad",
    provincias: [
      {
        id: 1,
        name: "Trujillo",
        value: "trujillo",
      },
      {
        id: 2,
        name: "Ascope",
        value: "ascope",
      },
      {
        id: 3,
        name: "Bolivar",
        value: "bolivar",
      },
      {
        id: 4,
        name: "Chepen",
        value: "chepen",
      },
      {
        id: 5,
        name: "Julcan",
        value: "julcan",
      },
      {
        id: 6,
        name: "Otuzco",
        value: "otuzco",
      },
      {
        id: 7,
        name: "Pacasmayo",
        value: "pacasmayo",
      },
      {
        id: 8,
        name: "Pataz",
        value: "pataz",
      },
      {
        id: 9,
        name: "Sanchez Carrion",
        value: "sanchez-carrion",
      },
      {
        id: 10,
        name: "Santiago de Chuco",
        value: "santiago-de-chuco",
      },
      {
        id: 11,
        name: "Gran Chimu",
        value: "gran-chimu",
      },
      {
        id: 12,
        name: "Viru",
        value: "viru",
      },
    ],
  },
  {
    id: 14,
    name: "Lambayeque",
    value: "lambayeque",
    provincias: [
      {
        id: 1,
        name: "Chiclayo",
        value: "chiclayo",
      },
      {
        id: 2,
        name: "Ferreñafe",
        value: "ferreñafe",
      },
      {
        id: 3,
        name: "Lambayeque",
        value: "lambayeque",
      },
    ],
  },
  {
    id: 15,
    name: "Lima",
    value: "lima",
    provincias: [
      {
        id: 1,
        name: "Lima",
        value: "lima",
      },
      {
        id: 2,
        name: "Barranca",
        value: "Barranca",
      },
      {
        id: 3,
        name: "Cajatambo",
        value: "cajatambo",
      },
      {
        id: 4,
        name: "Canta",
        value: "canta",
      },
      {
        id: 5,
        name: "Cañete",
        value: "cañete",
      },
      {
        id: 6,
        name: "Huaral",
        value: "huaral",
      },
      {
        id: 7,
        name: "Huarochiri",
        value: "huarochiri",
      },
      {
        id: 8,
        name: "Huaura",
        value: "huaura",
      },
      {
        id: 9,
        name: "Oyon",
        value: "oyon",
      },
      {
        id: 10,
        name: "Yauyos",
        value: "yauyos",
      },
    ],
  },
  {
    id: 16,
    name: "Loreto",
    value: "loreto",
    provincias: [
      {
        id: 1,
        name: "Maynas",
        value: "maynas",
      },
      {
        id: 2,
        name: "Alto Amazonas",
        value: "alto-amazonas",
      },
      {
        id: 3,
        name: "Loreto",
        value: "loreto",
      },
      {
        id: 4,
        name: "Mariscal Ramon Castilla",
        value: "mariscal-ramon-castilla",
      },
      {
        id: 5,
        name: "Requena",
        value: "requena",
      },
      {
        id: 6,
        name: "Ucayali",
        value: "ucayali",
      },
    ],
  },
  {
    id: 17,
    name: "Madre de Dios",
    value: "madre-de-dios",
    provincias: [
      {
        id: 1,
        name: "Tambopata",
        value: "tambopata",
      },
      {
        id: 2,
        name: "Manu",
        value: "manu",
      },
      {
        id: 3,
        name: "Tahuamanu",
        value: "tahuamanu",
      },
    ],
  },
  {
    id: 18,
    name: "Moquegua",
    value: "moquegua",
    provincias: [
      {
        id: 1,
        name: "Mariscal Nieto",
        value: "mariscal-nieto",
      },
      {
        id: 2,
        name: "General Sanchez Cerro",
        value: "general-sanchez-cerro",
      },
      {
        id: 3,
        name: "Ilo",
        value: "ilo",
      },
    ],
  },
  {
    id: 19,
    name: "Pasco",
    value: "pasco",
    provincias: [
      {
        id: 1,
        name: "Pasco",
        value: "pasco",
      },
      {
        id: 2,
        name: "Daniel Alcides CArrion",
        value: "daniel-alcides-carrion",
      },
      {
        id: 3,
        name: "Oxapampa",
        value: "oxapampa",
      },
    ],
  },
  {
    id: 20,
    name: "Piura",
    value: "piura",
    provincias: [
      {
        id: 1,
        name: "Piura",
        value: "piura",
      },
      {
        id: 2,
        name: "Ayabaca",
        value: "ayabaca",
      },
      {
        id: 3,
        name: "Huancabamba",
        value: "huancabamba",
      },
      {
        id: 4,
        name: "Morropon",
        value: "Paita",
      },
      {
        id: 5,
        name: "Paita",
        value: "paita",
      },
      {
        id: 6,
        name: "Sullana",
        value: "sullana",
      },
      {
        id: 7,
        name: "Talara",
        value: "talara",
      },
      {
        id: 8,
        name: "Sechura",
        value: "sechura",
      },
    ],
  },
  {
    id: 21,
    name: "Puno",
    value: "puno",
    provincias: [
      {
        id: 1,
        name: "Puno",
        value: "puno",
      },
      {
        id: 2,
        name: "Azangaro",
        value: "azangaro",
      },
      {
        id: 3,
        name: "Carabaya",
        value: "carabayo",
      },
      {
        id: 4,
        name: "Chucuito",
        value: "chucuito",
      },
      {
        id: 5,
        name: "El Collao",
        value: "el-collao",
      },
      {
        id: 6,
        name: "Huancane",
        value: "huancane",
      },
      {
        id: 7,
        name: "Lampa",
        value: "lampa",
      },
      {
        id: 8,
        name: "Melgar",
        value: "melgar",
      },
      {
        id: 9,
        name: "Moho",
        value: "moho",
      },
      {
        id: 10,
        name: "San Antonio de Putina",
        value: "san-antonio-de-putina",
      },
      {
        id: 11,
        name: "San Roman",
        value: "san-roman",
      },
      {
        id: 12,
        name: "Sandia",
        value: "sandia",
      },
      {
        id: 13,
        name: "Yunguyo",
        value: "yunguyo",
      },
    ],
  },
  {
    id: 22,
    name: "San Martín",
    value: "san-martin",
    provincias: [
      {
        id: 1,
        name: "Moyobamba",
        value: "moyobamba",
      },
      {
        id: 2,
        name: "Bellavista",
        value: "bellavista",
      },
      {
        id: 3,
        name: "El Dorado",
        value: "el-dorado",
      },
      {
        id: 4,
        name: "Huallaga",
        value: "huallaga",
      },
      {
        id: 5,
        name: "Lamas",
        value: "lamas",
      },
      {
        id: 6,
        name: "Mariscal Caceres",
        value: "mariscal-caceres",
      },
      {
        id: 7,
        name: "Picota",
        value: "picota",
      },
      {
        id: 8,
        name: "Rioja",
        value: "rioja",
      },
      {
        id: 9,
        name: "San Martin",
        value: "san-martin",
      },
      {
        id: 10,
        name: "Tocache",
        value: "tocache",
      },
    ],
  },
  {
    id: 23,
    name: "Tacna",
    value: "tacna",
    provincias: [
      {
        id: 1,
        name: "Tacna",
        value: "tacna",
      },
      {
        id: 2,
        name: "Candarave",
        value: "candarave",
      },
      {
        id: 3,
        name: "Jorge Basadre",
        value: "jorge-basadre",
      },
      {
        id: 4,
        name: "Tarata",
        value: "tarata",
      },
    ],
  },
  {
    id: 24,
    name: "Tumbes",
    value: "tumbes",
    provincias: [
      {
        id: 1,
        name: "Tumbes",
        value: "tumbes",
      },
      {
        id: 2,
        name: "Contralmirante Villar",
        value: "contralmirante-villar",
      },
      {
        id: 3,
        name: "Zarumilla",
        value: "zarumilla",
      },
    ],
  },
  {
    id: 25,
    name: "Ucayali",
    value: "ucayali",
    provincias: [
      {
        id: 1,
        name: "Coronel Portillo",
        value: "coronel-portillo",
      },
      {
        id: 2,
        name: "Atalaya",
        value: "atalaya",
      },
      {
        id: 3,
        name: "Padre Abad",
        value: "padre-abad",
      },
      {
        id: 4,
        name: "Purus",
        value: "purus",
      },
    ],
  },
];

export const listAccesibilidad: iParrafo[] = [
  {
    id: 1,
    title: "A.- ¿Qué es la accesibilidad web?",
    parrafos: [
      {
        oracion:
          "Se entiende por accesibilidad web, el acceso universal a la web, independiente de las circunstancias sociales y demográficas, los dispositivos involucrados y las capacidades de los propios usuarios/visitantes a la hora de acceder a la información.",
      },
      {
        oracion:
          "Bajo este contexto, el Consorcio World Wide Web (W3C) dio forma a la Iniciativa de Accesibilidad Web (WAI), entidad encargada de unificar los conocimientos tecnológicos e investigaciones en temas referentes a la accesibilidad, con el fin de generar pautas de accesibilidad en la web para facilitar el acceso a ésta por parte de personas con algún grado de discapacidad.",
      },
      {
        oracion:
          "Dichas pautas de accesibilidad, están estructuradas en 14 temas que atienden a una cierta cantidad de puntos de verificación que permiten detectar posibles errores en el diseño de una página web, otorgando de esta manera las directrices necesarias para el desarrollo de un sitio web que garantice el total acceso a la información bajo diferentes circunstancias.",
      },
    ],
  },
  {
    id: 2,
    title:
      "B.- Política de accesibilidad de TTI Group Comunicaciones Informáticas y Afines Limitada",
    parrafos: [
      {
        oracion:
          "Para que la información contenida en el presente sitio web sea accesible para todas las personas, TTI Group Comunicaciones Informáticas y Afines Limitada ha llevado a cabo la implementación de las directrices de accesibilidad establecidas por la WAI, así como también, se han aplicado los estándares del W3C en sus niveles más estrictos.",
      },
      {
        oracion:
          "El desarrollo y el contenido de este sitio web han sido validados por el Test de Accesibilidad Web (TAW) cumpliendo el nivel AAA. Además, cumple con los estándares de programación establecidos por el W3C respecto a la utilización del lenguaje XHTML 1.0 estricto.",
      },
      {
        oracion:
          "Asimismo, se han utilizado hojas de estilo en cascada (CSS) para el formateo visual de la información y se ha separado el contenido del despliegue gráfico de la información contenida en el sitio web, con el fin de permitir el acceso y la correcta visualización de la información bajo distintos ambientes.",
      },
      {
        oracion:
          "Los textos que se presentan en el sitio web, poseen tamaños de fuentes configurables por los usuarios/visitantes y también por las opciones de texto de los distintos navegadores. Asimismo, se ha comprobado la correcta visualización del sitio en las diferentes versiones de los principales navegadores tales como Internet Explorer 8, Mozilla Firefox, Google Chrome, Opera y Safari.",
      },
    ],
  },
  {
    id: 3,
    title: "C.- Uso de Cookies",
    parrafos: [
      {
        oracion:
          "Este sitio web puede utilizar cookies para identificar a los usuarios/visitantes que acceden al presente sitio, para recordar las preferencias de los usuarios/visitantes, para proporcionar servicios personalizados, así como también, para hacer un seguimiento de la utilización del sitio web.",
      },
      {
        oracion:
          "La navegación por este sitio web con las cookies activadas en el navegador utilizado por los usuarios/visitantes implica de manera imprescindible la aceptación del uso de las mismas conforme las presentes condiciones. De no aceptar el uso de cookies, el usuario/visitante puede bloquearlas, desactivarlas y/o eliminarlas de acuerdo a los sistemas de desactivación y borrado de cookies del navegador utilizado.",
      },
    ],
  },
];

export const listCopyright: iParrafo[] = [
  {
    id: 1,
    title: "",
    parrafos: [
      {
        oracion:
          "Los contenidos, textos, videos, documentos, material publicitario, dibujos, material técnico de productos y servicios o de cualquier otro orden, bases de datos, sonidos, programas de software, distintivos corporativos, signos distintivos, marcas, diseños gráficos, combinaciones de elementos, logotipos e imágenes, publicadas en este sitio web están protegidos por derechos de propiedad intelectual y son de propiedad de Automotores Inka.",
      },
      {
        oracion:
          "Todos los derechos, incluidos los de propiedad intelectual respecto de las páginas web de este sitio pertenecen a Automotores Inka; los usuarios/visitantes al acceder a dicho sitio, tienen derecho a revisar toda la información que requieran y sólo podrán copiarla o almacenarla en su computador y/o dispositivo, para fines estrictamente personales.",
      },
      {
        oracion:
          "En virtud de lo anterior queda absolutamente prohibido a los usuarios/visitantes copiar, duplicar, emitir, modificar, transformar, adaptar y/o cambiar en cualquier forma y por cualquier medio, el contenido de las páginas web de Subaru, códigos fuentes diseño, selección y forma de presentación de los materiales y, en general, respecto de la información contenida en el sitio web de AUTOMOTORES INKA.",
      },
    ],
  },
];

export const listTerminosCondiciones: iParrafo[] = [
  {
    id: 1,
    title: "",
    parrafos: [
      {
        oracion:
          "La presente página web tiene por objeto facilitar al público en general el conocimiento de las actividades que realiza y de los servicios que prestará SOCIEDAD DE AUTOMOTORES INKA S.A.C. (en adelante la “EMPRESA”) a través de las marcas que representan importa y comercializa, transmitiendo publicidad relativa a nuestras actividades y oferta comercial a las personas que se registren mediante esta página web u otro canal autorizado.",
      },
      {
        oracion:
          "El acceso a la web de la EMPRESA, atribuye a quien lo efectúa la condición de visitante e implica la aceptación plena y sin reservas de todos los términos y condiciones incluidos en este documento según se encuentren vigentes en el momento mismo en que el visitante acceda a la web de DERCO. En consecuencia, el visitante debe leer atentamente el presente documento en cada una de las ocasiones en que se proponga utilizar esta página web, ya que aquél puede sufrir modificaciones.",
      },
      {
        oracion:
          "En caso el visitante registre sus datos en nuestra página web y brinde su respectivo consentimiento según corresponda, adquirirá la condición de usuario, aceptando plena y sin reservas no solo los términos y condiciones incluidos en este documento, sino también nuestra Política de Privacidad.",
      },
      {
        oracion:
          "Recomendamos a cada visitante y usuario leer detenidamente cada nota, información legal y advertencia antes de acceder, adquirir y utilizar los productos y servicios prestados por DERCO.",
      },
    ],
  },
];

export const listTipoServicio: iTipoServicio[] = [
  {
    id: 1,
    label: "Mantenimiento Preventivo",
    value: "mantenimiento-preventivo",
  },
  {
    id: 2,
    label: "Mantenimiento Correctivo",
    value: "mantenimiento-correctivo",
  },
  {
    id: 3,
    label: "Diagnostico Gratuito",
    value: "diagnostico-gratuito",
  },
  {
    id: 4,
    label: "Otros",
    value: "otros",
  },
];

export const LegalPromocionesData: iParrafo[] = [
  {
    id: 1,
    title: "¡Frena seguro con Automotores Inka!",
    parrafos: [
      {
        oracion:
          "Promoción válida solo para el modelo y códigos de repuestos de frenos especificados. El precio corresponde al servicio estándar e incluye únicamente lo detallado en la promoción; no aplica para trabajos adicionales. No acumulable con otras promociones o descuentos especiales.",
      },
      {
        oracion: "Vigencia del 12 de mayo al 31 de julio.",
      },
    ],
  },
  {
    id: 2,
    title: "¡Campaña Discos y Pastillas de Freno - Hyundai",
    parrafos: [
      {
        oracion:
          "Promoción válida solo para el modelo y códigos de repuestos de frenos especificados. El precio corresponde al servicio estándar e incluye únicamente lo detallado en la promoción; no aplica para trabajos adicionales. No acumulable con otras promociones o descuentos especiales.",
      },
      {
        oracion: "Vigencia del 12 de mayo al 31 de julio.",
      },
    ],
  },
  {
    id: 3,
    title: "¡Campaña de Lubricación!",
    parrafos: [
      {
        oracion:
          "El servicio incluye cambio de aceite de motor, filtro de aceite y arandela. El precio corresponde al servicio estándar e incluye únicamente lo detallado en la promoción; no aplica para trabajos adicionales. No acumulable con otras promociones o descuentos especiales. Imagen referencial.",
      },
      {
        oracion: "Vigencia del 15 de mayo al 31 de mayo.",
      },
    ],
  },
];

export const IconTextTalleresData: iIconText[] = [
  {
    id: 1,
    icon: Clock,
    text: "Horarios Extendidos",
  },
  {
    id: 2,
    icon: Car,
    text: "Múltiples Marcas",
  },
  {
    id: 3,
    icon: MapPin,
    text: "4 Ubicaciones",
  },
];

export const CiudadesTalleresData = [
  "Todas",
  "Chiclayo",
  "Chimbote",
  "Trujillo",
];

export const TalleresData: iTalleres[] = [
  {
    id: 1,
    nombre: "Cluster",
    ciudad: "Trujillo",
    direccion:
      "Las Casuarinas Predio B, Victor Larco Herrera (Frente a Tecsup)",
    telefono: "943882585",
    marcas: [
      {
        id: 1,
        title: "GWM",
        imageSource:
          "https://ccio0a34q5.ufs.sh/f/DvD6I6Zej8uOLsOPOAafoP4DpcYeZVGiOFgHRhQ6wI3fqznB",
      },
      {
        id: 2,
        title: "JAC",
        imageSource:
          "https://ccio0a34q5.ufs.sh/f/DvD6I6Zej8uOP2CreHQVXueBARj3742ygwQDrMoCHZldahqb",
      },
      {
        id: 3,
        title: "JAC Camiones",
        imageSource:
          "https://ccio0a34q5.ufs.sh/f/DvD6I6Zej8uOuoNAAHKRNb37Tw0naGzlX1AQVyMx4YRqLUvP",
      },
      {
        id: 4,
        title: "Mazda",
        imageSource:
          "https://ccio0a34q5.ufs.sh/f/DvD6I6Zej8uO5CqzbbJkpBWN3vh240yqOdjsEADxHYaGFug8",
      },
      {
        id: 5,
        title: "Renault",
        imageSource:
          "https://ccio0a34q5.ufs.sh/f/DvD6I6Zej8uOQ0fsyFYXJ63FR8o9VAEKiI2UaDk7fsYxnyed",
      },
      {
        id: 6,
        title: "DFSK",
        imageSource:
          "https://ccio0a34q5.ufs.sh/f/DvD6I6Zej8uO6excwEQ9Bc5OSTXZuIjiFChPnWJwY4gNadsp",
      },
      {
        id: 7,
        title: "Subaru",
        imageSource:
          "https://ccio0a34q5.ufs.sh/f/DvD6I6Zej8uOELSJSSDefj9uCIXgaldKRkJNSxinPm263Tp5",
      },
    ],
    horarios: {
      semana: "Lunes a Viernes de 8:00 am a 5:45 pm",
      sabado: "Sábado de 8:00 am a 12:15 pm",
    },
    imageSource:
      "https://ccio0a34q5.ufs.sh/f/DvD6I6Zej8uOS8CFS7Nofij75n2UTAxSLhBMb0aDo4HsvJdr",
  },
  {
    id: 2,
    nombre: "Píerola",
    ciudad: "Trujillo",
    direccion: "Av. Nicolas de Piérola N° 1830 (Pan Norte km 562-B)",
    telefono: "943882810",
    marcas: [
      {
        id: 1,
        title: "Hyundai",
        imageSource:
          "https://ccio0a34q5.ufs.sh/f/DvD6I6Zej8uOtlliS4kcOqxX2R1Wm6ukViLC8zKaje7GyESh",
      },
      {
        id: 2,
        title: "Geely",
        imageSource:
          "https://ccio0a34q5.ufs.sh/f/DvD6I6Zej8uOS8CjNWeofij75n2UTAxSLhBMb0aDo4HsvJdr",
      },
      {
        id: 3,
        title: "JMC",
        imageSource:
          "https://ccio0a34q5.ufs.sh/f/DvD6I6Zej8uOxcUoVR4uScOlVJi5KCg138pyo6xjtsrWdweE",
      },
    ],
    horarios: {
      semana: "Lunes a Viernes de 8:00 am a 5:45 pm",
      sabado: "Sábado de 8:00 am a 12:15 pm",
    },
    imageSource:
      "https://ccio0a34q5.ufs.sh/f/DvD6I6Zej8uOpYZOJqLRb6QUFrH4dsYzehL2GKVtMvBxjN0A",
  },
  {
    id: 3,
    nombre: "Chiclayo",
    ciudad: "Chiclayo",
    direccion: "Av. Panamericana N° 4200 (Ex fundo iris)",
    telefono: "987103383",
    marcas: [
      {
        id: 1,
        title: "Hyundai",
        imageSource:
          "https://ccio0a34q5.ufs.sh/f/DvD6I6Zej8uOtlliS4kcOqxX2R1Wm6ukViLC8zKaje7GyESh",
      },
      {
        id: 2,
        title: "Geely",
        imageSource:
          "https://ccio0a34q5.ufs.sh/f/DvD6I6Zej8uOS8CjNWeofij75n2UTAxSLhBMb0aDo4HsvJdr",
      },
      {
        id: 3,
        title: "JMC",
        imageSource:
          "https://ccio0a34q5.ufs.sh/f/DvD6I6Zej8uOxcUoVR4uScOlVJi5KCg138pyo6xjtsrWdweE",
      },
    ],
    horarios: {
      semana: "Lunes a Viernes de 8:00 am a 5:45 pm",
      sabado: "Sábado de 8:00 am a 12:15 pm",
    },
    imageSource:
      "https://ccio0a34q5.ufs.sh/f/DvD6I6Zej8uO80Lpz0cEgOfKoyeu0JP1iQAtzpnGFdXD8RwT",
  },
  {
    id: 4,
    nombre: "Chimbote",
    ciudad: "Chimbote",
    direccion: "Av. Enrique Meiggs N° 1144",
    telefono: "994152130",
    marcas: [
      {
        id: 1,
        title: "Changan",
        imageSource:
          "https://ccio0a34q5.ufs.sh/f/DvD6I6Zej8uOuoHoOaSRNb37Tw0naGzlX1AQVyMx4YRqLUvP",
      },
      {
        id: 2,
        title: "GWM",
        imageSource:
          "https://ccio0a34q5.ufs.sh/f/DvD6I6Zej8uOLsOPOAafoP4DpcYeZVGiOFgHRhQ6wI3fqznB",
      },
      {
        id: 3,
        title: "JAC",
        imageSource:
          "https://ccio0a34q5.ufs.sh/f/DvD6I6Zej8uOP2CreHQVXueBARj3742ygwQDrMoCHZldahqb",
      },
      {
        id: 4,
        title: "JAC Camiones",
        imageSource:
          "https://ccio0a34q5.ufs.sh/f/DvD6I6Zej8uOuoNAAHKRNb37Tw0naGzlX1AQVyMx4YRqLUvP",
      },
      {
        id: 5,
        title: "Mazda",
        imageSource:
          "https://ccio0a34q5.ufs.sh/f/DvD6I6Zej8uO5CqzbbJkpBWN3vh240yqOdjsEADxHYaGFug8",
      },
      {
        id: 6,
        title: "Renault",
        imageSource:
          "https://ccio0a34q5.ufs.sh/f/DvD6I6Zej8uOQ0fsyFYXJ63FR8o9VAEKiI2UaDk7fsYxnyed",
      },
      {
        id: 7,
        title: "DFSK",
        imageSource:
          "https://ccio0a34q5.ufs.sh/f/DvD6I6Zej8uO6excwEQ9Bc5OSTXZuIjiFChPnWJwY4gNadsp",
      },
      {
        id: 8,
        title: "Subaru",
        imageSource:
          "https://ccio0a34q5.ufs.sh/f/DvD6I6Zej8uOELSJSSDefj9uCIXgaldKRkJNSxinPm263Tp5",
      },
      {
        id: 9,
        title: "Suzuki",
        imageSource:
          "https://ccio0a34q5.ufs.sh/f/DvD6I6Zej8uOFGtKVmMsCqESdLAKY9QDw4mphTHOc2PgX5ZG",
      },
      {
        id: 10,
        title: "Haval",
        imageSource:
          "https://ccio0a34q5.ufs.sh/f/DvD6I6Zej8uO4ZJctFmksNaVR9rPCLmoSnlWvuTU8fHei1zp",
      },
      {
        id: 11,
        title: "Mitsubishi",
        imageSource:
          "https://ccio0a34q5.ufs.sh/f/DvD6I6Zej8uOJr48Yg9xqRsYE96QUm8jMZfbvecylArHPdt7",
      },
      {
        id: 12,
        title: "Fuso",
        imageSource:
          "https://ccio0a34q5.ufs.sh/f/DvD6I6Zej8uOJLgoZy9xqRsYE96QUm8jMZfbvecylArHPdt7",
      },
    ],
    horarios: {
      semana: "Lunes a Viernes de 8:00 am a 5:45 pm",
      sabado: "Sábado de 8:00 am a 12:15 pm",
    },
    imageSource:
      "https://ccio0a34q5.ufs.sh/f/DvD6I6Zej8uOtdw6CV2kcOqxX2R1Wm6ukViLC8zKaje7GyES",
  },
];

export const categoriesAccesorios: ProductCategory[] = [
  "INTERIOR",
  "EXTERIOR",
  "BATERIA",
  "ADITIVO",
];

export const brandsAccesorios: string[] = [
  "HYUNDAI",
  "GEELY",
  "Powermeister",
  "i3000+",
  "Wynns",
  "GLASSCOAT",
];

export const modelsByBrandAccesorios: ModelsByBrand = {
  HYUNDAI: [
    "SANTA FE de 7 PLAZAS (2018-2023)",
    "TUCSON 2022 hasta el modelo actual",
    "KONA 2018 hasta el modelo actual",
    "TUCSON 2024 /2.0 MPI AT",
    "Grand i10 2018 1.2 MPI",
  ],
  GEELY: ["NEW COOLRAY", "OKAVANGO", "AZKARRA", "NEW COOLRAY/COOLRAY"],
  Powermeister: [
    "TUCSON 2024 /2.0 MPI AT",
    "Grand i10 2018 1.2 MPI",
    "Santa Fe (2010 - 2018)",
    "VENUE 1.6 MPI",
  ],
  "i3000+": ["Aplica para unidades HYUNDAI y es compatible con otras marcas"],
  Wynns: [
    "Todos los modelos de vehículos con motor gasolinero",
    "Todos los modelos de vehículos con motor diesel",
    "H100, H1./TUCSON, SANTA FE",
  ],
  GLASSCOAT: ["Aplica para todos los modelos autos y SUV"],
};

export const AccesoriosData: iProduct[] = [
  {
    id: 1,
    codigo: "S1122ADE07",
    name: "Alfombra Maletera",
    slug: "alfombra-maletera",
    description:
      "Bandeja protectora rígida para el suelo del maletero. Los bordes elevados protegen la moqueta de la suciedad y de la humedad.",
    specifications:
      "Material duradero y de alta calidad se limpia fácilmente. Fabricada a medida.",
    category: "INTERIOR",
    brand: "HYUNDAI",
    model: "SANTA FE de 7 PLAZAS (2018-2023)",
    price: 474,
    imageSource: "https://placehold.co/300x300",
    featured: true,
    features: [
      "Material duradero y resistente",
      "Bordes elevados para máxima protección",
      "Fácil limpieza y mantenimiento",
      "Fabricada a medida para ajuste perfecto",
      "Protección contra suciedad y humedad",
    ],
  },
  {
    id: 2,
    codigo: "CWF46AC000",
    name: "Juego de Escarpines",
    slug: "juego-escarpines",
    description:
      "El juego incluye 4 escarpines en color negro. Incluye MO de instalación.",
    specifications: "Protección exterior completa para tu vehículo.",
    category: "EXTERIOR",
    brand: "HYUNDAI",
    model: "TUCSON 2022 hasta el modelo actual",
    price: 209,
    imageSource: "https://placehold.co/300x300",
    featured: false,
    features: [
      "Juego completo de 4 escarpines",
      "Color negro elegante",
      "Incluye mano de obra de instalación",
      "Protección exterior completa",
      "Compatible con modelo específico",
    ],
  },
  {
    id: 3,
    codigo: "J9211ADE00AL",
    name: "Barra Transversales",
    slug: "barra-transversales",
    description:
      "Fabricada en aluminio con diseño original y con el logo de la marca. Juego de 2 barras con soportes de fijación.",
    specifications: "Incluye MO de instalación. Material de alta resistencia.",
    category: "EXTERIOR",
    brand: "HYUNDAI",
    model: "KONA 2018 hasta el modelo actual",
    price: 1485,
    imageSource: "https://placehold.co/300x300",
    featured: true,
    features: [
      "Material de aluminio de alta calidad",
      "Diseño original con logo de marca",
      "Juego de 2 barras completas",
      "Soportes de fijación incluidos",
      "Instalación profesional incluida",
    ],
  },
  {
    id: 4,
    codigo: "6608195583",
    name: "Pisos de Jebe (3D Full Protección)",
    slug: "pisos-jebe",
    description:
      "Fabricados en jebe, duraderos y resistentes. Color negro. Juego de 3 piezas que incluye protección central de piso posterior.",
    specifications: "Material resistente al desgaste y fácil limpieza.",
    category: "INTERIOR",
    brand: "GEELY",
    model: "NEW COOLRAY",
    price: 251,
    imageSource: "https://placehold.co/300x300",
    featured: false,
    features: [
      "Material de jebe duradero",
      "Protección 3D completa",
      "Juego de 3 piezas",
      "Incluye protección central posterior",
      "Resistente al desgaste",
    ],
  },
  {
    id: 5,
    codigo: "4114110090",
    name: "Estribos Laterales de Aluminio",
    slug: "estribos-laterales",
    description:
      "El juego incluye 2 estribos de aluminio con el logo de la marca. Incluye MO de instalación.",
    specifications: "Diseño robusto y elegante para fácil acceso al vehículo.",
    category: "EXTERIOR",
    brand: "GEELY",
    model: "NEW COOLRAY/COOLRAY",
    price: 1250,
    imageSource: "https://placehold.co/300x300",
    featured: true,
    features: [
      "Material de aluminio de alta calidad",
      "Diseño robusto y elegante",
      "Juego de 2 estribos completos",
      "Logo de marca incluido",
      "Instalación profesional incluida",
    ],
  },
  {
    id: 6,
    codigo: "56077",
    name: "Batería LB2 AH:60",
    slug: "bateria-lb2",
    description:
      "Procedencia: Korea. Grupo: LB2 Voltaje: 12 Amperaje: 60 Capacidad de arranque: 570",
    specifications: "Dimensiones: 242 x 174 x 175 Borne: Grueso N°Placas: 13",
    category: "BATERIA",
    brand: "Powermeister",
    model: "TUCSON 2024 /2.0 MPI AT, TUCSON 2020 1.6 DCT /Elantra",
    price: 438,
    imageSource: "https://placehold.co/300x300",
    featured: false,
    features: [
      "Procedencia coreana de alta calidad",
      "Voltaje: 12V",
      "Amperaje: 60 AH",
      "Capacidad de arranque: 570 CCA",
      "Borne grueso para mejor conexión",
    ],
  },
  {
    id: 7,
    codigo: "080C720023",
    name: "Aditivo de Combustible i3000+",
    slug: "aditivo-combustible",
    description:
      "Procedencia: Koreana. Consiste en un tratamiento limpiador del sistema de combustible.",
    specifications: "Se recomienda su uso cada 5,000 KM.",
    category: "ADITIVO",
    brand: "i3000+",
    model: "Aplica para unidades HYUNDAI y es compatible con otras marcas",
    price: 92,
    imageSource: "https://placehold.co/300x300",
    featured: false,
    features: [
      "Tratamiento limpiador completo",
      "Procedencia coreana",
      "Compatible con múltiples marcas",
      "Uso recomendado cada 5,000 KM",
      "Mejora el rendimiento del combustible",
    ],
  },
  {
    id: 8,
    codigo: "10084",
    name: "Kit Mantenimiento Motor Gasolina",
    slug: "kit-mantenimiento-gasolina",
    description:
      "Se recomienda aplicar cada 5,000 KM. Beneficio: Tratamiento para limpieza interna del motor.",
    specifications:
      "Tratamiento antifricción. La bandeja limpia permite que el nuevo aceite se mantenga limpio más tiempo.",
    category: "ADITIVO",
    brand: "Wynns",
    model: "Todos los modelos de vehículos con motor gasolinero",
    price: 188,
    imageSource: "https://placehold.co/300x300",
    featured: true,
    features: [
      "Limpieza interna completa del motor",
      "Tratamiento antifricción",
      "Mantiene el aceite limpio por más tiempo",
      "Compatible con motores gasolineros",
      "Aplicación cada 5,000 KM",
    ],
  },
];
