import { iPortada } from "@/types";
import { iBaseRepository } from "./base.repository";

export interface iPortadaRepository extends iBaseRepository<iPortada> {
  findByName(name: string): Promise<iPortada | null>;
  findActive(): Promise<iPortada[]>;
}
