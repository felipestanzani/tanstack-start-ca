import { vi, describe, it, expect, beforeEach, afterEach } from "vitest";
import {
  getCounterHandler,
  incrementCounterHandler,
} from "@/presentation/controllers/counter.handlers";
import { container } from "@/infrastructure/di";
import { Counter } from "@/core/domain/entities/counter.entity";
import type {
  IGetCounterUseCase,
  IIncrementCounterUseCase,
} from "@/core/application/use-cases/counter";

// Helper to create a mock Counter
function createMockCounter(value = 0) {
  return new Counter({
    id: "test-id",
    value,
    createdAt: new Date(),
    updatedAt: new Date(),
  });
}

describe("counter.controller", () => {
  let getCounterUseCaseMock: IGetCounterUseCase;
  let incrementCounterUseCaseMock: IIncrementCounterUseCase;
  let originalGetCounterUseCase: () => IGetCounterUseCase;
  let originalIncrementCounterUseCase: () => IIncrementCounterUseCase;

  beforeEach(() => {
    getCounterUseCaseMock = {
      execute: vi.fn(),
    } as unknown as IGetCounterUseCase;
    incrementCounterUseCaseMock = {
      execute: vi.fn(),
    } as unknown as IIncrementCounterUseCase;
    // Save originals
    originalGetCounterUseCase = container.getCounterUseCase;
    originalIncrementCounterUseCase = container.getIncrementCounterUseCase;
    // Mock DI container methods
    container.getCounterUseCase = vi.fn(() => getCounterUseCaseMock);
    container.getIncrementCounterUseCase = vi.fn(
      () => incrementCounterUseCaseMock,
    );
  });

  afterEach(() => {
    // Restore originals
    container.getCounterUseCase = originalGetCounterUseCase;
    container.getIncrementCounterUseCase = originalIncrementCounterUseCase;
    vi.clearAllMocks();
  });

  describe("getCounterHandler", () => {
    it("returns the counter value on success", async () => {
      const mockCounter = createMockCounter(42);
      (
        getCounterUseCaseMock.execute as unknown as ReturnType<typeof vi.fn>
      ).mockResolvedValue({ counter: mockCounter });
      const result = await getCounterHandler();
      expect(result).toBe(42);
      expect(getCounterUseCaseMock.execute).toHaveBeenCalledWith();
    });

    it("throws if use case throws", async () => {
      (
        getCounterUseCaseMock.execute as unknown as ReturnType<typeof vi.fn>
      ).mockRejectedValue(new Error("fail"));
      await expect(getCounterHandler()).rejects.toThrow("fail");
    });
  });

  describe("incrementCounterHandler", () => {
    it("returns the incremented counter value on success", async () => {
      const mockCounter = createMockCounter(100);
      (
        incrementCounterUseCaseMock.execute as unknown as ReturnType<
          typeof vi.fn
        >
      ).mockResolvedValue({ counter: mockCounter });
      const result = await incrementCounterHandler(5);
      expect(result).toBe(100);
      expect(incrementCounterUseCaseMock.execute).toHaveBeenCalledWith({
        amount: 5,
      });
    });

    it("throws if use case throws", async () => {
      (
        incrementCounterUseCaseMock.execute as unknown as ReturnType<
          typeof vi.fn
        >
      ).mockRejectedValue(new Error("fail"));
      await expect(incrementCounterHandler(1)).rejects.toThrow("fail");
    });
  });
});
