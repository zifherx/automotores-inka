import { AppError } from "@/lib";
import { iPresupuestoRepository } from "@/repositories/presupuesto.repository";
import { iBudget } from "@/types";
import { FilterQuery, Model } from "mongoose";

export class MongoosePresupuestoRepositoryImplement
  implements iPresupuestoRepository
{
  constructor(private readonly model: Model<iBudget>) {}

  async create(data: Partial<iBudget>): Promise<iBudget> {
    try {
      const resource = await this.model.create(data);
      return resource.toObject();
    } catch (err) {
      throw new AppError(500, "Error al crear el recurso en la base de datos");
    }
  }

  async findById(id: string): Promise<iBudget | null> {
    try {
      const resource = await this.model.findById(id);
      return resource ? resource.toObject() : null;
    } catch (err) {
      throw new AppError(
        500,
        "Error al buscar el recurso por ID en la base de datos"
      );
    }
  }

  async findAll(filter?: FilterQuery<iBudget> | undefined): Promise<iBudget[]> {
    try {
      const resources = await this.model.find(filter || {});
      return resources.map((resource) => resource.toObject());
    } catch (err) {
      throw new AppError(
        500,
        "Error al listar los recursos en la base de datos"
      );
    }
  }

  async update(id: string, data: Partial<iBudget>): Promise<iBudget | null> {
    try {
      const resource = await this.model.findByIdAndUpdate(id, data, {
        new: true,
      });
      return resource ? resource.toObject() : null;
    } catch (err) {
      throw new AppError(500, "Error al actualizar recursos");
    }
  }

  async delete(id: string): Promise<iBudget | null> {
    try {
      const resource = await this.model.findByIdAndDelete(id);
      return resource ? resource.toObject() : null;
    } catch (err) {
      throw new AppError(500, "Error al eliminar el recurso");
    }
  }

  async findByName(name: string): Promise<iBudget | null> {
    try {
      const resource = await this.model.findOne({ name });
      return resource ? resource.toObject() : null;
    } catch (err) {
      throw new AppError(500, "Error al buscar el recurso por nombre");
    }
  }

  async findActive(): Promise<iBudget[]> {
    try {
      const resources = await this.model.find({ isActive: true });
      return resources.map((resource) => resource.toObject());
    } catch (err) {
      throw new AppError(500, "Error al listar los recursos activos");
    }
  }
}
