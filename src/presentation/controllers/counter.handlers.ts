import { container } from "@/infrastructure/di";
import type {
  IGetCounterUseCase,
  IIncrementCounterUseCase,
} from "@/core/application/use-cases/counter";

export async function getCounterHandler() {
  const useCase: IGetCounterUseCase = container.getCounterUseCase();
  const result = await useCase.execute();
  return result.counter.value;
}

export async function incrementCounterHandler(amount: number) {
  const useCase: IIncrementCounterUseCase =
    container.getIncrementCounterUseCase();
  const result = await useCase.execute({ amount });
  return result.counter.value;
}
