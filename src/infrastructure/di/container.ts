import { CounterRepository } from "@/core/domain/repositories";
import {
  GetCounterUseCase,
  IncrementCounterUseCase,
} from "@/core/application/use-cases";
import type {
  IGetCounterUseCase,
  IIncrementCounterUseCase,
} from "@/core/application/use-cases/counter";
import { PrismaCounterRepository } from "@/infrastructure/repositories";
import { prisma } from "@/infrastructure/prisma/client";

export interface Dependencies {
  counterRepository: CounterRepository;
  getCounterUseCase: IGetCounterUseCase;
  incrementCounterUseCase: IIncrementCounterUseCase;
}

class DIContainer {
  private dependencies: Dependencies;

  constructor() {
    // Infrastructure layer
    const counterRepository = new PrismaCounterRepository(prisma);

    // Application layer
    const getCounterUseCase = new GetCounterUseCase(counterRepository);
    const incrementCounterUseCase = new IncrementCounterUseCase(
      counterRepository,
    );

    this.dependencies = {
      counterRepository,
      getCounterUseCase,
      incrementCounterUseCase,
    };
  }

  getDependencies(): Dependencies {
    return this.dependencies;
  }

  getCounterRepository(): CounterRepository {
    return this.dependencies.counterRepository;
  }

  getCounterUseCase(): IGetCounterUseCase {
    return this.dependencies.getCounterUseCase;
  }

  getIncrementCounterUseCase(): IIncrementCounterUseCase {
    return this.dependencies.incrementCounterUseCase;
  }
}

export const container = new DIContainer();
