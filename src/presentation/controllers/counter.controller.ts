import { createServerFn } from "@tanstack/react-start";
import { container } from "@/infrastructure/di";
import type {
  IGetCounterUseCase,
  IIncrementCounterUseCase,
} from "@/core/application/use-cases/counter";

export const getCounter = createServerFn({
  method: "GET",
}).handler(async () => {
  const useCase: IGetCounterUseCase = container.getCounterUseCase();
  const result = await useCase.execute();
  return result.counter.value;
});

export const incrementCounter = createServerFn({ method: "POST" })
  .validator((amount: number) => amount)
  .handler(async ({ data: amount }) => {
    const useCase: IIncrementCounterUseCase =
      container.getIncrementCounterUseCase();
    const result = await useCase.execute({ amount });
    return result.counter.value;
  });
