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

export enum UserROLE {
  ADMNISTRATOR = "ADMINISTRATOR",
  ADV = "ADV",
  COMERCIAL = "COMERCIAL",
  POSVENTA = "POSVENTA",
  LEGAL = "LEGAL",
  CONFIGURATION = "CONFIGURATION",
}

const USER_ROLES_CONFIG = {
  [UserROLE.ADMNISTRATOR]:
    process.env.NEXT_PUBLIC_ADMINISTRATOR?.split(",") || [],
  [UserROLE.ADV]: process.env.NEXT_PUBLIC_ADV?.split(",") || [],
  [UserROLE.COMERCIAL]: process.env.NEXT_PUBLIC_COMERCIAL?.split(",") || [],
  [UserROLE.POSVENTA]: process.env.NEXT_PUBLIC_POSVENTA?.split(",") || [],
  [UserROLE.LEGAL]: process.env.NEXT_PUBLIC_LEGAL?.split(",") || [],
  [UserROLE.CONFIGURATION]:
    process.env.NEXT_PUBLIC_CONFIGURATION?.split(",") || [],
};

/**
 * Valida si un usuario pertenece a un rol específico
 * @param userId - ID del usuario a validar
 * @param role - Rol a verificar
 * @returns boolean - true si el usuario tiene el rol, false en caso contrario
 */
export const hasRole = (
  userId: string | null | undefined,
  role: UserROLE
): boolean => {
  if (!userId || !role) return false;
  const usersInRole = USER_ROLES_CONFIG[role];
  return usersInRole.includes(userId);
};

/**
 * Valida si un usuario tiene alguno de los roles especificados
 * @param userId - ID del usuario a validar
 * @param roles - Array de roles a verificar
 * @returns boolean - true si el usuario tiene al menos uno de los roles
 */
export const hasAnyRole = (
  userId: string | null | undefined,
  roles: UserROLE[]
): boolean => {
  if (!userId || !roles || roles.length === 0) return false;
  return roles.some((role) => hasRole(userId, role));
};

export const canAccessConfigurationPanel = (
  userId: string | null | undefined
): boolean => {
  return hasAnyRole(userId, [UserROLE.ADMNISTRATOR]);
};

export const canAccessADVPanel = (
  userId: string | null | undefined
): boolean => {
  return hasAnyRole(userId, [UserROLE.ADMNISTRATOR, UserROLE.ADV]);
};

export const canAccessComercialPanel = (
  userId: string | null | undefined
): boolean => {
  return hasAnyRole(userId, [UserROLE.ADMNISTRATOR, UserROLE.COMERCIAL]);
};

export const canAccessPosventaPanel = (
  userId: string | null | undefined
): boolean => {
  return hasAnyRole(userId, [UserROLE.ADMNISTRATOR, UserROLE.POSVENTA]);
};

export const canAccessLegalPanel = (
  userId: string | null | undefined
): boolean => {
  return hasAnyRole(userId, [UserROLE.ADMNISTRATOR, UserROLE.LEGAL]);
};
