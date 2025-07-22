import { createServerFn } from "@tanstack/react-start";
import { getCounterHandler, incrementCounterHandler } from "./counter.handlers";

export const getCounter = createServerFn({
  method: "GET",
}).handler(getCounterHandler);

export const incrementCounter = createServerFn({ method: "POST" })
  .validator((amount: number) => amount)
  .handler(({ data: amount }) => incrementCounterHandler(amount));
