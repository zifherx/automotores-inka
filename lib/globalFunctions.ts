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

export const setNomenclaturaLRD = (slug: string) => {
  switch(slug){
    case "hr-sai":
      return "INKA";
    case "hr-gp":
      return "GP";
  }
}

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
