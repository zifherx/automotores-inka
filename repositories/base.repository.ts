import { FilterQuery } from "mongoose";

export interface iBaseRepository<T> {
  create(data: Partial<T>): Promise<T>;
  findAll(filter?: FilterQuery<T>): Promise<T[]>;
  findById(id: string): Promise<T | null>;
  update(id: string, data: Partial<T>): Promise<T | null>;
  delete(id: string): Promise<T | null>;
}
