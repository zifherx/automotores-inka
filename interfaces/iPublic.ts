import {
  IconProp,
  IntencionCompraType,
  ProductCategory,
  TipoDocumentoType,
} from "@/types";
import { LucideIcon } from "lucide-react";

export interface iServicioSVG {
  id: number;
  title: string;
  imageUrl: string;
}

export interface iObjetivosEmpresa {
  id: number;
  title: string;
  description: string;
  bgDescription: string;
  imageUrl: string;
}

export interface iListValores {
  id: number;
  icon: LucideIcon;
  title: string;
  descriptionLight: string;
  descriptionDark: string;
}

export interface iListLinkUtiles {
  id: number;
  label: string;
  href: string;
}

export interface iReclamosRS {
  id: number;
  name: string;
  ruta: string;
}

export interface tDepartamento {
  id: number;
  name: string;
  value: string;
  provincias: tProvincia[];
}

export interface tProvincia {
  id: number;
  name: string;
  value: string;
}

export interface iOracion {
  oracion: string;
  linkHref?: string;
  includeTable?: boolean;
}

export interface iCompany {
  razonSocial: string;
  ruc: string;
  nomenclatura: string;
}

export interface iPosition {
  lat: number;
  lng: number;
}

export interface iIconText {
  id: number;
  icon: IconProp;
  text: string;
}

export interface iFiltrosTalleres {
  ciudad: string;
}

export interface iTalleres {
  id: number;
  nombre: string;
  ciudad: string;
  direccion: string;
  telefono: string;
  marcas: iMarcaTaller[];
  horarios: iHorarioTaller;
  imageSource: string;
}

export interface iMarcaTaller {
  id: number;
  title: string;
  imageSource: string;
}

export interface iHorarioTaller {
  semana: string;
  sabado: string;
}

export interface iProduct {
  id: number;
  codigo: string;
  name: string;
  slug: string;
  description: string;
  specifications: string;
  category: ProductCategory;
  brand: string;
  model: string;
  price: number;
  imageSource: string;
  featured: boolean;
  features?: string[];
}

export interface FilterState {
  searchTerm: string;
  selectedCategory: string;
  selectedBrand: string;
  selectedModel: string;
}

export interface ModelsByBrand {
  [key: string]: string[];
}

export interface ProductFilters {
  categories: ProductCategory[];
  brands: string[];
  modelsByBrand: ModelsByBrand;
}

export interface TableFormat {
  tHead: ITableHead[];
  tBody: ITableBody[];
}

export interface ITableCell {
  id: number;
  cell: string;
}

export interface ITableHead extends ITableCell {}
export interface ITableBody {
  id: number;
  marca: string;
  anioModelo: number;
  modelo: string;
  version: string;
  precioUSD: number;
  precioSOLES: number;
  bonoMarca_USD: number;
  bonoRetoma_USD: number;
  bonoFinanciamiento_USD: number;
}

export interface IFlashDealerObjectBD {
  document: string;
  email: string;
  phone_number: string;
  mark: string;
  model: string;
  year: string;
  vehicle: string;
  mileage: string;
  form_id: string;
  form_name: string;
  campaign_id: string;
  page_id: string;
  page_name: string;
  platform: string;
  city: string;
}

export interface IRequestFD {
  numeroDocumento: string;
  correoElectronico: string;
  numeroCelular: string;
  marcaVehiculo: string;
  codigoFlashDealer: string;
  ciudadCotizacion: string;
}

export interface CotizadorPasosFormData {
  nombreCompleto: string;
  tipoDocumento: TipoDocumentoType;
  numeroDocumento: string;
  celular: string;
  email: string;
  intencionCompra: IntencionCompraType;
  aceptaPoliticas: boolean;
  aceptaNewsletter: boolean;
}

export interface StepFormI {
  id: number;
  title: string;
  description: string;
}

export interface FlashDealerRequest {
  numeroDocumento: string;
  nombreCompleto: string;
  correoElectronico: string;
  numeroCelular: string;
  marcaVehiculo: string;
  codigoFlashDealer: string;
  ciudadCotizacion: string;
  plataformaOrigen: string;
}

export interface FlashDealerPayload {
  document: string;
  full_name: string;
  email: string;
  phone_number: string;
  mark: string;
  model: string;
  city: string;
  platform: string;
  form_name: string;
}

export interface NovalyRequest {
  nombreCompleto: string;
  correoElectronico: string;
  numeroCelular: string;
  tipoDocumento: string;
  numeroDocumento: string;
  marcaVehiculo: string;
  modeloVehiculo: string;
  ciudadCotizacion: string;
  plataformaOrigen: string;
  idMarca: number;
  idTienda: number;
  utmTrafico: string;
}

export interface DivisionNombreCompleto {
  nombres: string;
  apellidos: string;
}

export interface NovalyPayload {
  nombres: string;
  apellidos: string;
  celular: string;
  email: string;
  tipo_documento: string;
  numero_documento: string;
  ciudad_origen: string;
  marca: string;
  modelo: string;
  id_marca: number;
  id_tienda: number;
  form_name: string;
  city: string;
  utm: string;
}

export interface BitacoraData {
  request: RequestBitacora;
  response: ResponseBitacora;
  method: string;
  url: string;
}

export interface RequestBitacora {
  body: string;
  authorization?: string;
  accept?: string;
}

export interface ResponseBitacora {
  body: string;
  code: number;
  statusText: string;
}

export interface LogData {
  method: string;
  url: string;
  userAgent?: string;
  ip?: string;
  timestamp: string;
  duration: number;
  status: number;
  error?: string;
}

export interface OptionsLoggerAdvanced {
  logBody?: boolean;
  logHeaders?: boolean;
  excludeHeaders?: string[];
  maxBodyLength?: number;
}

export interface ILegalItem {
  id: number;
  icon: IconProp;
  title: string;
  description: string;
  iconBackground: string;
  iconColor: string;
}

export interface InputControlI {
  id: number;
  icon: IconProp;
  label: string;
  value: string;
}

export interface ContactInfoError {
  message: string;
}
