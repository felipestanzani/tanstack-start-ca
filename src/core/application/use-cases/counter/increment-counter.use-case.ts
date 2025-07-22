import { Counter } from "@/core/domain/entities";
import { CounterRepository } from "@/core/domain/repositories";

export interface IncrementCounterRequest {
  counterId?: string;
  amount?: number;
}

export interface IncrementCounterResponse {
  counter: Counter;
}

export interface IIncrementCounterUseCase {
  execute(request?: IncrementCounterRequest): Promise<IncrementCounterResponse>;
}

export class IncrementCounterUseCase implements IIncrementCounterUseCase {
  constructor(private readonly counterRepository: CounterRepository) {}

  async execute(
    request: IncrementCounterRequest = {},
  ): Promise<IncrementCounterResponse> {
    const { counterId, amount = 1 } = request;

    let counter: Counter;
    if (counterId) {
      const existingCounter = await this.counterRepository.getById(counterId);
      if (!existingCounter) {
        throw new Error(`Counter with id ${counterId} not found`);
      }
      counter = existingCounter;
    } else {
      counter = await this.counterRepository.getDefault();
    }

    const updatedCounter = counter.increment(amount);
    await this.counterRepository.save(updatedCounter);

    return { counter: updatedCounter };
  }
}
