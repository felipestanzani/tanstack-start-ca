import { PrismaClient } from "@prisma/client";
import { Counter } from "@/core/domain/entities";
import { CounterRepository } from "@/core/domain/repositories";

export class PrismaCounterRepository implements CounterRepository {
  private readonly prisma: PrismaClient;
  private readonly defaultCounterId = "default";

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async getById(id: string): Promise<Counter | null> {
    const counterRecord = await this.prisma.counter.findUnique({
      where: { id },
    });

    if (!counterRecord) {
      return null;
    }

    return new Counter({
      id: counterRecord.id,
      value: counterRecord.value,
      createdAt: counterRecord.createdAt,
      updatedAt: counterRecord.updatedAt,
    });
  }

  async getDefault(): Promise<Counter> {
    let counterRecord = await this.prisma.counter.findUnique({
      where: { id: this.defaultCounterId },
    });

    if (!counterRecord) {
      // Create default counter if it doesn't exist
      counterRecord = await this.prisma.counter.create({
        data: {
          id: this.defaultCounterId,
          value: 0,
        },
      });
    }

    return new Counter({
      id: counterRecord.id,
      value: counterRecord.value,
      createdAt: counterRecord.createdAt,
      updatedAt: counterRecord.updatedAt,
    });
  }

  async save(counter: Counter): Promise<void> {
    await this.prisma.counter.upsert({
      where: { id: counter.id },
      update: {
        value: counter.value,
        updatedAt: counter.updatedAt || new Date(),
      },
      create: {
        id: counter.id,
        value: counter.value,
        createdAt: counter.createdAt || new Date(),
        updatedAt: counter.updatedAt || new Date(),
      },
    });
  }
}
