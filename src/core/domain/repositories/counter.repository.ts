import { Counter } from "@/core/domain/entities";

export interface CounterRepository {
  getById(id: string): Promise<Counter | null>;
  save(counter: Counter): Promise<void>;
  getDefault(): Promise<Counter>;
}
