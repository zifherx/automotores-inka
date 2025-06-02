import { iCompany, iTalleres } from "@/interfaces";

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
