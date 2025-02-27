import { FilterQuery, Model } from "mongoose";

import { iMarcaRepository } from "@/repositories/marca.repository";

import { iBrand } from "@/types";
import { AppError } from "@/lib";

export class MongooseMarcaRepositoryImplement implements iMarcaRepository {
  constructor(private readonly model: Model<iBrand>) {}

  async create(data: Partial<iBrand>): Promise<iBrand> {
    try {
      const resource = await this.model.create(data);
      return resource.toObject();
    } catch (err) {
      throw new AppError(500, "Error al crear el recurso en la base de datos");
    }
  }

  async findById(id: string): Promise<iBrand | null> {
    try {
      const resource = await this.model.findById(id);
      return resource ? resource.toObject() : null;
    } catch (err) {
      throw new AppError(500, "Error al buscar el recurso por ID");
    }
  }

  async findAll(filter?: FilterQuery<iBrand>): Promise<iBrand[]> {
    try {
      const resources = await this.model.find(filter || {}).sort({ name: 1 });
      return resources.map((resource) => resource.toObject());
    } catch (err) {
      throw new AppError(500, "Error al listar los recursos");
    }
  }

  async update(id: string, data: Partial<iBrand>): Promise<iBrand | null> {
    try {
      const resource = await this.model.findByIdAndUpdate(id, data, {
        new: true,
      });
      return resource ? resource.toObject() : null;
    } catch (err) {
      throw new AppError(500, "Error al actualizar recursos");
    }
  }

  async delete(id: string): Promise<iBrand | null> {
    try {
      const resource = await this.model.findByIdAndDelete(id);
      return resource ? resource.toObject() : null;
    } catch (err) {
      throw new AppError(500, "Error al eliminar el recurso");
    }
  }

  async findByName(name: string): Promise<iBrand | null> {
    try {
      const resource = await this.model.findOne({ name });
      return resource ? resource.toObject() : null;
    } catch (err) {
      throw new AppError(500, "Error al buscar el recurso por título");
    }
  }

  async findActive(): Promise<iBrand[]> {
    try {
      const resources = await this.model.find({ isActive: true });
      return resources.map((resource) => resource.toObject());
    } catch (err) {
      throw new AppError(500, "Error al listar los recursos activos");
    }
  }
}
