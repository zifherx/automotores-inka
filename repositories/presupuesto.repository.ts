import { iBudget } from "@/types";
import { iBaseRepository } from "./base.repository";

export interface iPresupuestoRepository extends iBaseRepository<iBudget> {
  findByName(name: string): Promise<iBudget | null>;
  findActive(): Promise<iBudget[]>;
}
