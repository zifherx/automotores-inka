import { FilterQuery } from "mongoose";

import { iPortadaRepository } from "@/repositories/portada.repository";

import { iPortada } from "@/types";
import { NotFoundError, ValidationError } from "@/lib";

export class PortadaService {
  constructor(private readonly repository: iPortadaRepository) {}

  async createResource(data: Partial<iPortada>): Promise<iPortada> {
    if (!data.name) {
      throw new ValidationError(`El nombre es requerido`);
    }

    const existingResource = await this.repository.findByName(data.name);
    if (existingResource) {
      throw new ValidationError("Ya existe un recurso con ese nombre");
    }
    return this.repository.create(data);
  }

  async getResources(filter?: FilterQuery<iPortada>): Promise<iPortada[]> {
    return await this.repository.findAll(filter);
  }

  async getResource(id: string): Promise<iPortada> {
    if (!id) {
      throw new ValidationError("Id es requerido");
    }

    const resource = await this.repository.findById(id);
    if (!resource) {
      throw new NotFoundError(`Recurso no encontrado`);
    }
    return resource;
  }

  async updateResource(id: string, data: Partial<iPortada>): Promise<iPortada> {
    if (!id) {
      throw new ValidationError("Id es requerido");
    }
    const updateResource = await this.repository.update(id, data);
    if (!updateResource) {
      throw new NotFoundError(`Recurso no encontrado`);
    }
    return updateResource;
  }

  async deleteResource(id: string): Promise<iPortada> {
    if (!id) {
      throw new ValidationError("Id es requerido");
    }
    const deleteResource = await this.repository.delete(id);
    if (!deleteResource) {
      throw new NotFoundError("Recurso no encontrado");
    }
    return deleteResource;
  }

  async getActiveResources(): Promise<iPortada[]> {
    return this.repository.findActive();
  }
}
