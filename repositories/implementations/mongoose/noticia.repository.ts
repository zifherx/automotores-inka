import { FilterQuery, Model } from "mongoose";

import { iNoticiaRepository } from "@/repositories/noticia.repository";

import { iNews } from "@/types";
import { AppError } from "@/lib";

export class MongooseNoticiaRepositoryImplement implements iNoticiaRepository {
  constructor(private readonly model: Model<iNews>) {}

  async create(data: Partial<iNews>): Promise<iNews> {
    try {
      const resource = await this.model.create(data);
      return resource.toObject();
    } catch (err) {
      throw new AppError(500, "Error al crear el recurso en la base de datos");
    }
  }

  async findById(id: string): Promise<iNews | null> {
    try {
      const resource = await this.model.findById(id);
      return resource ? resource.toObject() : null;
    } catch (err) {
      throw new AppError(500, "Error al buscar el recurso por ID");
    }
  }

  async findAll(filter?: FilterQuery<iNews>): Promise<iNews[]> {
    try {
      const resources = await this.model.find(filter || {});
      return resources.map((resource) => resource.toObject());
    } catch (err) {
      throw new AppError(500, "Error al listar los recursos");
    }
  }

  async update(id: string, data: Partial<iNews>): Promise<iNews | null> {
    try {
      const resource = await this.model.findByIdAndUpdate(id, data, {
        new: true,
      });
      return resource ? resource.toObject() : null;
    } catch (err) {
      throw new AppError(500, "Error al actualizar recursos");
    }
  }

  async delete(id: string): Promise<iNews | null> {
    try {
      const resource = await this.model.findByIdAndDelete(id);
      return resource ? resource.toObject() : null;
    } catch (err) {
      throw new AppError(500, "Error al eliminar el recurso");
    }
  }

  async findByTitle(title: string): Promise<iNews | null> {
    try {
      const resource = await this.model.findOne({ title });
      return resource ? resource.toObject() : null;
    } catch (err) {
      throw new AppError(500, "Error al buscar el recurso por título");
    }
  }

  async findActive(): Promise<iNews[]> {
    try {
      const resources = await this.model.find({ isActive: true });
      return resources.map((resource) => resource.toObject());
    } catch (err) {
      throw new AppError(500, "Error al listar los recursos activos");
    }
  }
}
