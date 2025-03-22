import { FilterQuery } from "mongoose";

import { iPresupuestoRepository } from "@/repositories/presupuesto.repository";

import { NotFoundError, ValidationError } from "@/lib";
import { iBudget } from "@/types";

export class PresupuestoService {
  constructor(private readonly repository: iPresupuestoRepository) {}

  async createResource(data: Partial<iBudget>): Promise<iBudget> {
    if (!data.name) {
      throw new ValidationError(`El nombre es requerido`);
    }

    const existingResource = await this.repository.findByName(data.name);
    if (existingResource) {
      throw new ValidationError("Ya existe un recurso con ese nombre");
    }
    return this.repository.create(data);
  }

  async getResources(filter?: FilterQuery<iBudget>): Promise<iBudget[]> {
    return this.repository.findAll(filter);
  }

  async getResource(id: string): Promise<iBudget> {
    if (!id) {
      throw new ValidationError("Id es requerido");
    }

    const resource = await this.repository.findById(id);
    if (!resource) {
      throw new NotFoundError(`Recurso no encontrado`);
    }
    return resource;
  }

  async updateResource(id: string, data: Partial<iBudget>): Promise<iBudget> {
    if (!id) {
      throw new ValidationError("Id es requerido");
    }

    const updateResource = await this.repository.update(id, data);
    if (!updateResource) {
      throw new NotFoundError(`Recurso no encontrado`);
    }
    return updateResource;
  }

  async deleteResource(id: string): Promise<iBudget> {
    if (!id) {
      throw new ValidationError("Id es requerido");
    }

    const deleteResource = await this.repository.delete(id);
    if (!deleteResource) {
      throw new NotFoundError("Recurso no encontrado");
    }
    return deleteResource;
  }

  async getActiveResources(): Promise<iBudget[]> {
    return this.repository.findActive();
  }
}
