import { FilterQuery } from "mongoose";

import { iNoticiaRepository } from "@/repositories/noticia.repository";

import { iNews } from "@/types";
import { NotFoundError, ValidationError } from "@/lib";

export class NoticiaService {
  constructor(private readonly repository: iNoticiaRepository) {}

  async createResource(data: Partial<iNews>): Promise<iNews> {
    if (!data.title) {
      throw new ValidationError(`El nombre es requerido`);
    }

    const existingResource = await this.repository.findByTitle(data.title);
    if (existingResource) {
      throw new ValidationError("Ya existe un recurso con ese título");
    }
    return this.repository.create(data);
  }

  async getResources(filter?: FilterQuery<iNews>): Promise<iNews[]> {
    return this.repository.findAll(filter);
  }

  async getResource(id: string): Promise<iNews> {
    if (!id) {
      throw new ValidationError("Id es requerido");
    }

    const resource = await this.repository.findById(id);
    if (!resource) {
      throw new NotFoundError(`Recurso no encontrado`);
    }
    return resource;
  }

  async updateResource(id: string, data: Partial<iNews>): Promise<iNews> {
    if (!id) {
      throw new ValidationError("Id es requerido");
    }

    const updateResource = await this.repository.update(id, data);
    if (!updateResource) {
      throw new NotFoundError(`Recurso no encontrado`);
    }
    return updateResource;
  }

  async deleteResource(id: string): Promise<iNews> {
    if (!id) {
      throw new ValidationError("Id es requerido");
    }

    const deleteResource = await this.repository.delete(id);
    if (!deleteResource) {
      throw new NotFoundError("Recurso no encontrado");
    }
    return deleteResource;
  }

  async getActiveResources(): Promise<iNews[]> {
    return this.repository.findActive();
  }
}
