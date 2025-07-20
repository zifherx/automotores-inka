import axios from "axios";

import { iCompany, IRequestFD, iTalleres } from "@/interfaces";

import { CotizacionForm, ReclamoDataBuildedType } from "@/types";

export const switchRS = (rs: string) => {
  switch (rs) {
    case "hr-sai":
      return "Automotores Inka S.A.C.";
    case "hr-gp":
      return "Grupo Peramas S.A.C.";

    default:
      return "Automotores Inka S.A.C.";
  }
};

export const switchRuc = (rs: string) => {
  switch (rs) {
    case "hr-sai":
      return "20480683839";
    case "hr-gp":
      return "20612662071";

    default:
      return "20480683839";
  }
};

export const setNomenclaturaLRD = (slug: string) => {
  switch (slug) {
    case "hr-sai":
      return "INKA";
    case "hr-gp":
      return "GP";
  }
};

export const fechaHoy = (fecha: Date) => {
  return fecha.toLocaleDateString("es-pe", {
    year: "2-digit",
    month: "2-digit",
    day: "2-digit",
  });
};

export const horaHoy = (fecha: Date) => {
  return fecha.toLocaleTimeString("es-pe", {
    hour: "2-digit",
    minute: "2-digit",
  });
};

export const getCurrentDateTime = () => {
  const now = new Date();
  const fecha = now.toLocaleDateString("es-PE");
  const hora = now.toLocaleTimeString("es-PE", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  return { fecha, hora };
};

export const formatNumberToSixDigits = (num: number): string => {
  const numStr = num.toString();
  return numStr.padStart(8, "0");
};

export const getCompanyByCode = (codigo: string): iCompany | null => {
  if (codigo.includes("INKA")) {
    return {
      razonSocial: "Automotores Inka SAC",
      ruc: "20480683839",
      nomenclatura: "hr-sai",
    };
  } else if (codigo.includes("GP")) {
    return {
      razonSocial: "Grupo Peramas SAC",
      ruc: "20612662071",
      nomenclatura: "hr-gp",
    };
  } else {
    return null;
  }
};

export const formatDateToPeru = (date: Date): string => {
  const options: Intl.DateTimeFormatOptions = {
    year: "2-digit",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    timeZone: "America/Lima",
    hour12: true,
  };

  return date.toLocaleDateString("es-PE", options);
};

export const validarItem = (uriDB: string, uriPayload: string): boolean => {
  if (uriDB === uriPayload) {
    return true;
  }
  return false;
};

export const createWhatsAppLinkForTallerContact = (taller: iTalleres) => {
  const message = encodeURIComponent(
    `Hola, vengo desde la página web de Sociedad de Automotores Inka. Estoy interesado en sacar una cita en ${taller.nombre} ubicado en ${taller.ciudad}.`
  );
  return `https://wa.me/51${taller.telefono}?text=${message}`;
};

export const createConversationWhatsapp = (
  messageTo: string,
  message: string
): string => {
  const encodeMessage = encodeURIComponent(`${message}`);
  return `https://wa.me/51${messageTo}?text=${encodeMessage}`;
};

export const buildCotizacionData = (values: CotizacionForm) => {
  return { ...values };
};

export const buildReclamoData = (values: ReclamoDataBuildedType) => {
  return { ...values };
};

export const createCotizacion = async (
  values: CotizacionForm,
  ruta: string
) => {
  try {
    const response = await axios.post(ruta, values);
    if (response.status !== 200) {
      throw new Error(`Error al crear cotización: ${response.status}`);
    }
    return response;
  } catch (err: any) {
    console.error(`Error en createCotizacion:`, {
      message: err.message,
      response: err.response?.data,
      status: err.response?.status,
    });
    throw new Error(`Error al procesar cotización`);
  }
};

export const sendCotizacionEmail = async (
  data: CotizacionForm,
  ruta: string
) => {
  try {
    const response = await axios.post(ruta, data);

    if (response.status !== 200) {
      throw new Error(`Error al enviar email: ${response.status}`);
    }

    return response;
  } catch (err: any) {
    // Log específico para debugging
    console.error("Error en sendCotizacionEmail:", {
      message: err.message,
      response: err.response?.data,
      status: err.response?.status,
    });
    throw new Error("Error al enviar el email de cotización");
  }
};

export const sendCotizacionFlashDealer = async (
  values: IRequestFD,
  ruta: string
) => {
  try {
    const response = await axios.post(ruta, values);

    if (response.status !== 200) {
      throw new Error(`Error al enviar a FD: ${response.status}`);
    }

    return response;
  } catch (err: any) {
    console.error("Error en sendCotizacionFlashDealer:", {
      message: err.message,
      response: err.response?.data,
      status: err.response?.status,
    });
    throw new Error("Error al enviar la cotización a Flashdealer");
  }
};

export const createReclamo = async (
  values: ReclamoDataBuildedType,
  ruta: string
) => {
  try {
    const response = await axios.post(ruta, values);
    if (response.status !== 200) {
      throw new Error(`Error al crear cotización: ${response.status}`);
    }
    return response;
  } catch (err: any) {
    console.error(`Error en createReclamo:`, {
      message: err.message,
      response: err.response?.data,
      status: err.response?.status,
    });
  }
};

export const sendReclamoEmail = async (
  data: ReclamoDataBuildedType,
  ruta: string
) => {
  try {
    const response = await axios.post(ruta, data);

    if (response.status !== 200) {
      throw new Error(`Error al enviar email: ${response.status}`);
    }

    return response;
  } catch (err: any) {
    console.error("Error en sendReclamoEmail:", {
      message: err.message,
      response: err.response?.data,
      status: err.response?.status,
    });
    throw new Error("Error al enviar el email de reclamo");
  }
};

export const getDocumentMaxLength = (documentType: string): number => {
  switch (documentType) {
    case "dni":
      return 8;
    case "ruc":
      return 11;
    case "pasaporte":
      return 15;
    case "ce":
      return 15;
    default:
      return 8;
  }
};

export const createNumeroDeReclamo = (
  razonSocial: string,
  fecha: string,
  numeroUltimoReclamo: number,
  codeSede: string
): string => {
  const nomeclaturaLRD = setNomenclaturaLRD(razonSocial);
  const numLRD = formatNumberToSixDigits(numeroUltimoReclamo + 1);
  const yearLRD = fecha.split("/")[2];
  return `LRD-${nomeclaturaLRD}-${numLRD}-${yearLRD}-${codeSede}`;
};
