import { describe, it, expect, vi, beforeEach } from "vitest";
import { IncrementCounterUseCase } from "@/core/application/use-cases/counter/increment-counter.use-case";
import { Counter } from "@/core/domain/entities";
import { CounterRepository } from "@/core/domain/repositories";

describe("IncrementCounterUseCase", () => {
  let mockRepository: CounterRepository;
  let useCase: IncrementCounterUseCase;

  beforeEach(() => {
    mockRepository = {
      getById: vi.fn(),
      save: vi.fn(),
      getDefault: vi.fn(),
    };
    useCase = new IncrementCounterUseCase(mockRepository);
  });

  it("should increment the default counter when no id is provided", async () => {
    const defaultCounter = new Counter({ id: "default", value: 10 });
    vi.mocked(mockRepository.getDefault).mockResolvedValue(defaultCounter);
    vi.mocked(mockRepository.save).mockResolvedValue();

    const result = await useCase.execute();

    expect(result.counter.value).toBe(11);
    expect(result.counter.id).toBe("default");
    expect(mockRepository.getDefault).toHaveBeenCalledOnce();
    expect(mockRepository.save).toHaveBeenCalledWith(result.counter);
  });

  it("should increment a specific counter by id", async () => {
    const customCounter = new Counter({ id: "custom", value: 5 });
    vi.mocked(mockRepository.getById).mockResolvedValue(customCounter);
    vi.mocked(mockRepository.save).mockResolvedValue();

    const result = await useCase.execute({ counterId: "custom" });

    expect(result.counter.value).toBe(6);
    expect(result.counter.id).toBe("custom");
    expect(mockRepository.getById).toHaveBeenCalledWith("custom");
    expect(mockRepository.save).toHaveBeenCalledWith(result.counter);
  });

  it("should increment by a custom amount", async () => {
    const customCounter = new Counter({ id: "custom", value: 7 });
    vi.mocked(mockRepository.getById).mockResolvedValue(customCounter);
    vi.mocked(mockRepository.save).mockResolvedValue();

    const result = await useCase.execute({ counterId: "custom", amount: 3 });

    expect(result.counter.value).toBe(10);
    expect(result.counter.id).toBe("custom");
    expect(mockRepository.getById).toHaveBeenCalledWith("custom");
    expect(mockRepository.save).toHaveBeenCalledWith(result.counter);
  });

  it("should throw error when counter not found", async () => {
    vi.mocked(mockRepository.getById).mockResolvedValue(null);

    await expect(
      useCase.execute({ counterId: "non-existent" }),
    ).rejects.toThrow("Counter with id non-existent not found");

    expect(mockRepository.getById).toHaveBeenCalledWith("non-existent");
    expect(mockRepository.save).not.toHaveBeenCalled();
  });
});
