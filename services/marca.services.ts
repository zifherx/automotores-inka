import { FilterQuery } from "mongoose";

import { iMarcaRepository } from "@/repositories/marca.repository";

import { iBrand } from "@/types";
import { NotFoundError, ValidationError } from "@/lib";

export class MarcaService {
  constructor(private readonly repository: iMarcaRepository) {}

  async createResource(data: Partial<iBrand>): Promise<iBrand> {
    if (!data.name) {
      throw new ValidationError(`El nombre es requerido`);
    }

    const existingResource = await this.repository.findByName(data.name);
    if (existingResource) {
      throw new ValidationError("Ya existe un recurso con ese título");
    }

    return this.repository.create(data);
  }

  async getResources(filter?: FilterQuery<iBrand>): Promise<iBrand[]> {
    return this.repository.findAll(filter);
  }

  async getResource(id: string): Promise<iBrand> {
    if (!id) {
      throw new ValidationError("Id es requerido");
    }

    const resource = await this.repository.findById(id);
    if (!resource) {
      throw new NotFoundError(`Recurso no encontrado`);
    }
    return resource;
  }

  async updateResource(id: string, data: Partial<iBrand>): Promise<iBrand> {
    if (!id) {
      throw new ValidationError("Id es requerido");
    }

    const updateResource = await this.repository.update(id, data);
    if (!updateResource) {
      throw new NotFoundError(`Recurso no encontrado`);
    }
    return updateResource;
  }

  async deleteResource(id: string): Promise<iBrand> {
    if (!id) {
      throw new ValidationError("Id es requerido");
    }

    const deleteResource = await this.repository.delete(id);
    if (!deleteResource) {
      throw new NotFoundError("Recurso no encontrado");
    }
    return deleteResource;
  }

  async getActiveResources(): Promise<iBrand[]> {
    return this.repository.findActive();
  }
}
