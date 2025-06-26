import { CounterRepository } from "@/core/domain/repositories";
import {
  GetCounterUseCase,
  IncrementCounterUseCase,
} from "@/core/application/use-cases";
import { PrismaCounterRepository } from "@/infrastructure/repositories";
import { prisma } from "@/infrastructure/prisma/client";

export interface Dependencies {
  counterRepository: CounterRepository;
  getCounterUseCase: GetCounterUseCase;
  incrementCounterUseCase: IncrementCounterUseCase;
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

  getCounterUseCase(): GetCounterUseCase {
    return this.dependencies.getCounterUseCase;
  }

  getIncrementCounterUseCase(): IncrementCounterUseCase {
    return this.dependencies.incrementCounterUseCase;
  }
}

export const container = new DIContainer();
