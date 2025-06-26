import * as fs from "node:fs";
import { Counter } from "../../core/domain/entities";
import { CounterRepository } from "../../core/domain/repositories";

export class FileCounterRepository implements CounterRepository {
  private readonly filePath: string;
  private readonly defaultCounterId = "default";

  constructor(filePath: string = "count.txt") {
    this.filePath = filePath;
  }

  async getById(id: string): Promise<Counter | null> {
    if (id !== this.defaultCounterId) {
      return null; // Only support default counter for now
    }
    return this.getDefault();
  }

  async getDefault(): Promise<Counter> {
    try {
      const content = await fs.promises.readFile(this.filePath, "utf-8");
      const value = parseInt(content) || 0;
      return new Counter({
        id: this.defaultCounterId,
        value,
      });
    } catch {
      // File doesn't exist, return default counter
      return new Counter({
        id: this.defaultCounterId,
        value: 0,
      });
    }
  }

  async save(counter: Counter): Promise<void> {
    await fs.promises.writeFile(this.filePath, counter.value.toString());
  }
}
