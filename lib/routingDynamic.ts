export const getRouteForModel = (modelo: string) => {
  return modelo.toLowerCase().replace(/\s+/g, "-");
};
