import {
  ChangeEvent,
  Dispatch,
  MutableRefObject,
  ReactNode,
  SetStateAction,
} from "react";
import { LucideIcon } from "lucide-react";
import { Map } from "leaflet";

import { iColor, iGallery } from "@/models";
import {
  iBrand,
  iCardModel,
  iCardSede,
  iChasis,
  iListBrand,
  iListModels,
  iListSede,
  iModelo,
  iSede,
} from "./admin.types";
import {
  FilterState,
  iIconText,
  ILegalItem,
  iOracion,
  iPosition,
  iProduct,
  iReclamosRS,
  iTalleres,
  ModelsByBrand,
  TableFormat,
} from "@/interfaces";
import {
  CotizacionGeneralFormValues,
  HReclamoFormValues,
  NewReclamoFormValues,
} from "@/forms";
import { IconType } from "react-icons/lib";
import { IExcelData, IPriceImportRow } from "@/interfaces/iAdmin";
import {
  FieldErrors,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";

export type iVideosYoutube = {
  src: string;
  title: string;
  className: string;
};

export type iTitle = {
  title: string;
  className: string;
};

export type iSubtitle = {
  subtitle: string;
  className?: string;
};

export type iCardServicios = {
  title: string;
  imageUrl: string;
};

export type iCircleProgress = {
  value: number;
  className?: string;
};

//Catalogo

export type iCatalogoLigeros = {
  brands: iBrand[];
  chasises: iChasis[];
  models: iModelo[];
};

export type iMigajas = {
  marca: string;
  modelo?: string;
};

export type iFiltros = {
  brands: iBrand[];
  chasises: iChasis[];
  setFilter: (filterName: string, filterValue: string) => void;
  clearFilter: () => void;
  filters: {
    marca: string;
    carroceria: string;
  };
};

export type tFilterUbicanos = {
  value: string;
  onChange: (value: string) => void;
};

export type iListVehicle = {
  models: iModelo[];
};

export type iCardProductModel = {
  model: iModelo;
};

export type iCardObjetivo = {
  id?: number;
  title: string;
  description: string;
  imageUrl: string;
  bgDescription: string;
};

export type iBannerHome = {
  imageSource: string;
  imageAlt: string;
  href?: string;
};

export type iCardUbicanos = {
  params: iSede;
};

export type iFichaTecnica = {
  link: string;
};

export type iColores = {
  colores: iColor[];
};

export type iGalleries = {
  galeria: iGallery[];
};

export type iCotizacionMarca = iListModels & {
  listDepartamentos: iSedeDealer[];
};

export type iCotizacionCero = iListBrand & {
  listDepartamentos: iSedeDealer[];
};

export type iSideFormMarca = iCardModel & {
  listDepartamentos: iSedeDealer[];
};

export interface iSedeDealer {
  [key: string]: iConcesionario[];
}

export interface iConcesionario {
  name: string;
  slug: string;
  address: string;
}

export interface iTEmailCotizacion {
  nombres: string;
  tipoDocumento: string;
  numeroDocumento: string;
  email: string;
  celular: string;
  departamento: string;
  concesionario: string;
  intencionCompra: string;
  checkDatosPersonales: boolean;
  checkPromociones: string;
  marca: string;
  modelo: string;
  imageUrl: string;
  precioBase: number;
  tcambio: number;
}

export interface iTEmailReclamo {
  fecha: string;
  hora: string;
  numeroReclamo: string;
  nombres: string;
  apellidos: string;
  sedeCompra: string;
  razonSocial: string;
  direccionSede: string;
}

export type iCustomMessage = {
  customer: string;
  celular: string;
  volverInicio: () => void;
};

export type iCaratulaReclamo = {
  slugType: string;
};

export type iHojaReclamo = {
  slugType: string;
};

export type iParrafo = {
  id?: number;
  title: string;
  parrafos: iOracion[];
};

export type iCustomIconTitle = {
  icon: LucideIcon;
  titleDark: string;
  titleLight: string;
  className: string;
};

export type iTipoServicio = {
  id: number;
  label: string;
  value: string;
};

export type iShowingCar = {
  vehicle: iModelo;
};

export type tClaimAll = HReclamoFormValues & {
  sedeCompra: string;
  tipoBien: string;
  fecha: string;
  hora: string;
  numeroReclamo: string;
  razonSocial: string;
  rucEmpresa: string;
  direccionCliente: string;
  direccionSede: string;
  sedeCodexHR: string;
};

export type tTimelineStep = {
  number: number;
  title: string;
  isActive: boolean;
};

export type ConcursoDice = {
  guardarRuedo: () => void;
  resultado: number;
  setResultado: Dispatch<SetStateAction<number>>;
  premio: string;
  setPremio: Dispatch<SetStateAction<string>>;
};

export type tBrandGrid = {
  brands: iBrand[];
  selectedBrand: iBrand | null;
  onSelect: (brand: iBrand) => void;
};

export type tCustomvideo = {
  title: string;
  parrafo: string | string[];
  uriVideoYoutube: string;
  bgSection: string;
};

export type tMarkerLocation = iCardSede & {
  selectionMarker?: (position: iPosition, fn: fnType) => void;
  markersRef: MutableRefObject<{ [key: string]: L.Marker }>;
};

type fnType = Map;

export type tsidebarLocation = iListSede & {
  onSelectDealer: (dealer: iSede) => void;
};

export type tLocationMap = iListSede & {
  mapCenter: [number, number];
  openPopupId: string | null;
  markersRef: MutableRefObject<{ [key: string]: L.Marker }>;
};

export type deleteFnProps = {
  deleteItem: () => Promise<void>;
};

export type PaginationType = {
  paginaAnterior: () => void;
  paginaSiguiente: () => void;
  getPaginaAnterior: () => void;
  getPaginaSiguiente: () => void;
};

export type ErrorResponse = {
  success: false;
  message: string;
  error?: string;
};

export type SuccessResponse<T> = {
  success: true;
  message: string;
  data: T;
};

export type APIResponse<T> = ErrorResponse | SuccessResponse<T>;

export type IconProp = LucideIcon | IconType;

export type IconTextProp = iIconText;

export type FilterTalleresProp = {
  ciudadSeleccionada: string;
  setCiudadSeleccionada: Dispatch<SetStateAction<string>>;
  marcaSeleccionada: string;
  setMarcaSeleccionada: Dispatch<SetStateAction<string>>;
};

export type TalleresProp = {
  talleres: iTalleres[];
};

export type CardTallerProp = {
  taller: iTalleres;
};

export type ProductCategory = "INTERIOR" | "EXTERIOR" | "BATERIA" | "ADITIVO";

export type FeatureProductsProps = {
  products: iProduct[];
};

export type CardProduct = {
  product: iProduct;
  featured?: boolean;
  showDetailButton?: boolean;
};

export type SearchFilterProps = {
  filters: FilterState;
  onFiltersChange: (filters: Partial<FilterState>) => void;
  categories: ProductCategory[];
  brands: string[];
  modelsByBrand: ModelsByBrand;
  showFilters: boolean;
  onToggleFilters: () => void;
};

export type TableConditionalProps = TableFormat;

export type CotizacionForm = CotizacionGeneralFormValues & {
  slugConcesionario: string;
  carroceria: string;
  slugModelo: string;
  imageUrl: string;
  precioBase: number;
};

export type ReclamoDataBuildedType = NewReclamoFormValues & {
  sedeCodexHR: string;
  fecha: string;
  hora: string;
  numeroReclamo: string;
  razonSocial: string;
  rucEmpresa: string;
  direccionCliente: string;
  direccionSede: string;
};

export type UploadStatusType =
  | "inactivo"
  | "en proceso"
  | "completado"
  | "error";

export type UploadSectionProp = {
  uploadStatus: UploadStatusType;
  isProcessing: boolean;
  handleFile: (event: ChangeEvent<HTMLInputElement>) => Promise<void>;
  preview: IExcelData;
  rowsMatched: number;
  rowsTotal: number;
  onClearData: () => void;
};

export type ExcelPreviewProp = IExcelData;

export type ExcelRowStatus = "pending" | "matched" | "not-found" | "updated";

export type CardStatProp = {
  title: string;
  value: number;
  icon: IconProp;
  tienePorcentaje?: boolean;
};

export type ResultsTableSectionProp = {
  importedData: IPriceImportRow[];
  isProcessing: boolean;
  matchedCount: number;
  onSaveUpdates: () => void;
};

export type StatisticsSectionProp = {
  totalImportados: number;
  matchImportados: number;
};

export type TipoDocumentoType = "dni" | "ruc" | "pasaporte" | "ce";
export type IntencionCompraType =
  | "esta-semana"
  | "este-mes"
  | "proximo-mes"
  | "mas-adelante";

export type StepContentProp = {
  currentStep: number;
  previous: () => void;
  next: () => void;
  selectedBrand: iBrand | null;
  setSelectedBrand: Dispatch<SetStateAction<iBrand | null>>;
  selectedModel: iModelo | null;
  setSelectedModel: Dispatch<SetStateAction<iModelo | null>>;
  selectedLocation: iSede | null;
  setSelectedLocation: Dispatch<SetStateAction<iSede | null>>;
};

export type BrandSelectionProp = {
  onSelect: (marca: iBrand) => void;
};

export type ModelSelectionProp = {
  selectedBrand: iBrand | null;
  onSelect: (model: iModelo) => void;
  onBack: () => void;
};

export type LocationSelectionProp = {
  selectedBrand: iBrand | null;
  onSelect: (location: iSede) => void;
  onBack: () => void;
};

export type ContactFormProp = {
  selectedBrand: iBrand | null;
  selectedModel: iModelo | null;
  selectedLocation: iSede | null;
  onBack: () => void;
};

export type LegalItemProp = {
  legalProps: ILegalItem;
};

export type FormHeaderProp = {
  razonSocial: iReclamosRS;
  fecha: string;
  hora: string;
  codigoReclamo: string;
  codexReclamo: string;
  setCodigoReclamo: Dispatch<SetStateAction<string>>;
};

export type SectionHeaderProp = {
  icon: IconProp;
  title: string;
  BgColor: string;
  iconBgColor: string;
  iconColor: string;
};

export type FormFieldProp = {
  label: string;
  required?: boolean;
  optional?: boolean;
  error?: string;
  children: ReactNode;
};

export type ConsumerSectionProp = {
  register: UseFormRegister<NewReclamoFormValues>;
  setValue: UseFormSetValue<NewReclamoFormValues>;
  watch: UseFormWatch<NewReclamoFormValues>;
  errors: FieldErrors<NewReclamoFormValues>;
  numeroDocumentoDisabled: boolean;
};

export type ProductSectionProp = {
  register: UseFormRegister<NewReclamoFormValues>;
  setValue: UseFormSetValue<NewReclamoFormValues>;
  watch: UseFormWatch<NewReclamoFormValues>;
  errors: FieldErrors<NewReclamoFormValues>;
  sedeSelected: iSede | undefined;
  setSedeSelected: Dispatch<SetStateAction<iSede | undefined>>;
};

export type ComplaintSectionProp = {
  register: UseFormRegister<NewReclamoFormValues>;
  setValue: UseFormSetValue<NewReclamoFormValues>;
  watch: UseFormWatch<NewReclamoFormValues>;
  errors: FieldErrors<NewReclamoFormValues>;
  isLoading: boolean;
};

export type CharacterCounterProp = {
  current: number;
  max: number;
  label?: string;
};
