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
