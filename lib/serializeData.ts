import { Document } from "mongoose";

export function serializeDocument(doc: Document) {
  const plainObject = doc.toObject();

  // Convertir ObjectId a string
  if (plainObject._id) {
    plainObject._id = plainObject._id.toString();
  }

  // Convertir fechas a strings ISO
  for (const [key, value] of Object.entries(plainObject)) {
    if (value instanceof Date) {
      plainObject[key] = value.toISOString();
    }
  }

  return plainObject;
}
