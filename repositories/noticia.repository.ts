import { iNews } from "@/types";
import { iBaseRepository } from "./base.repository";

export interface iNoticiaRepository extends iBaseRepository<iNews> {
  findByTitle(title: string): Promise<iNews | null>;
  findActive(): Promise<iNews[]>;
}
