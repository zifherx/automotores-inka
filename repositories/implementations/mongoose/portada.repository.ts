import { FilterQuery, Model } from "mongoose";

import { iPortadaRepository } from "@/repositories/portada.repository";

import { AppError } from "@/lib";
import { iPortada } from "@/types";

export class MongoosePortadaRepositoryImplement implements iPortadaRepository {
  constructor(private readonly model: Model<iPortada>) {}

  async create(data: Partial<iPortada>): Promise<iPortada> {
    try {
      const resource = await this.model.create(data);
      return resource.toObject();
    } catch (err) {
      throw new AppError(500, "Error al crear el recurso en la base de datos");
    }
  }

  async findById(id: string): Promise<iPortada | null> {
    try {
      const resource = await this.model.findById(id);
      return resource ? resource.toObject() : null;
    } catch (err) {
      throw new AppError(500, "Error al buscar el recurso por ID");
    }
  }

  async findAll(filter?: FilterQuery<iPortada>): Promise<iPortada[]> {
    try {
      const resources = await this.model.find(filter || {});
      return resources.map((resource) => resource.toObject());
    } catch (err) {
      throw new AppError(500, "Error al listar los recursos");
    }
  }

  async update(id: string, data: Partial<iPortada>): Promise<iPortada | null> {
    try {
      const resource = await this.model.findByIdAndUpdate(id, data, {
        new: true,
      });
      return resource ? resource.toObject() : null;
    } catch (err) {
      throw new AppError(500, "Error al actualizar recursos");
    }
  }

  async delete(id: string): Promise<iPortada | null> {
    try {
      const resource = await this.model.findByIdAndDelete(id);
      return resource ? resource.toObject() : null;
    } catch (err) {
      throw new AppError(500, "Error al eliminar el recurso");
    }
  }

  async findByName(name: string): Promise<iPortada | null> {
    try {
      const resource = await this.model.findOne({ name });
      return resource ? resource.toObject() : null;
    } catch (err) {
      throw new AppError(500, "Error al buscar el recurso por título");
    }
  }

  async findActive(): Promise<iPortada[]> {
    try {
      const resources = await this.model.find({ isActive: true });
      return resources.map((resource) => resource.toObject());
    } catch (err) {
      throw new AppError(500, "Error al listar los recursos activos");
    }
  }
}
