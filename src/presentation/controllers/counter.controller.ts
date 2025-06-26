import { createServerFn } from "@tanstack/react-start";
import { container } from "@/infrastructure/di";

export const getCounter = createServerFn({
  method: "GET",
}).handler(async () => {
  const useCase = container.getCounterUseCase();
  const result = await useCase.execute();
  return result.counter.value;
});

export const incrementCounter = createServerFn({ method: "POST" })
  .validator((amount: number) => amount)
  .handler(async ({ data: amount }) => {
    const useCase = container.getIncrementCounterUseCase();
    const result = await useCase.execute({ amount });
    return result.counter.value;
  });
