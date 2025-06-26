import { onToast } from "./toastMessage";

export class AppError extends Error {
  constructor(public statusCode: number, message: string) {
    super(message);
    this.name = "AppError";
  }
}

export class ValidationError extends AppError {
  constructor(message: string) {
    super(400, message);
    this.name = "ValidationError";
  }
}

export class NotFoundError extends AppError {
  constructor(message: string) {
    super(404, message);
    this.name = "NotFoundError";
  }
}

export class UnauthorizedError extends AppError {
  constructor(message: string = "No autorizado") {
    super(401, message);
    this.name = "UnauthorizedError";
  }
}

export class ForbiddenError extends AppError {
  constructor(message: string = "Acceso denegado") {
    super(403, message);
    this.name = "ForbiddenError";
  }
}

export const handleCotizacionError = (err: any) => {
  // Log Detallado
  console.error("Error en función:", {
    message: err.message,
    stack: err.stack,
    response: err.response?.data,
    status: err.response?.status,
    timestamp: new Date().toISOString(),
  });

  // Mensaje específico según el tipo de error
  let userMessage = "Algo salió mal ❌";

  if (err.message.includes("cotización")) {
    userMessage =
      "Error al procesar la cotización. Por favor, intenta nuevamente.";
  } else if (err.message.includes("email")) {
    userMessage =
      "La cotización se procesó pero hubo un error al enviar el email.";
  } else if (err.response?.status === 400) {
    userMessage = "Los datos enviados no son válidos. Revisa el formulario.";
  } else if (err.response?.status >= 500) {
    userMessage = "Error del servidor. Por favor, intenta más tarde.";
  }

  onToast(userMessage, "", true);
};
