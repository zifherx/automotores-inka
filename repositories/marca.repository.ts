import { iBrand } from "@/types";
import { iBaseRepository } from "./base.repository";

export interface iMarcaRepository extends iBaseRepository<iBrand> {
  findByName(name: string): Promise<iBrand | null>;
  findActive(): Promise<iBrand[]>;
}
