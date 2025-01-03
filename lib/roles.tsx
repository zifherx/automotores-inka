export const isAdministrator = (userId: string | null | undefined) => {
  return userId === process.env.NEXT_PUBLIC_ADMINISTRATOR;
};

export const isADV = (userId: string | null | undefined) => {
  return userId === process.env.NEXT_PUBLIC_ADV;
};

export const isComercial = (userId: string | null | undefined) => {
  return userId === process.env.NEXT_PUBLIC_COMERCIAL;
};

export const isPosventa = (userId: string | null | undefined) => {
  return userId === process.env.NEXT_PUBLIC_POSVENTA;
};

export const isLegal = (userId: string | null | undefined) => {
  return userId === process.env.NEXT_PUBLIC_LEGAL;
};
