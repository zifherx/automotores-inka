export const formatPENPrice = (price: number) => {
  return Intl.NumberFormat("es-PE", {
    style: "currency",
    currency: "PEN",
    maximumFractionDigits: 0,
    roundingIncrement: 10,
  }).format(price);
};

export const formatUSDPrice = (price: number) => {
  return Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
    roundingIncrement: 10,
  }).format(price);
};

export const formatPENTipoCambio = (price: number) => {
  return Intl.NumberFormat("es-PE", {
    style: "currency",
    currency: "PEN",
    maximumFractionDigits: 2,
  }).format(price);
};
