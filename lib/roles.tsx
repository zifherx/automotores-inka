export const isAdministrator = (userId: string | null | undefined) => {
  return userId === process.env.NEXT_PUBLIC_ADMINISTRATOR;
};

export const isLegal = (userId: string | null | undefined) => {
  return userId === process.env.NEXT_PUBLIC_LEGAL;
};
