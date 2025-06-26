import { describe, it, expect, vi, beforeEach } from "vitest";
import { GetCounterUseCase } from "@/core/application/use-cases";
import { Counter } from "@/core/domain/entities";
import { CounterRepository } from "@/core/domain/repositories";

describe("GetCounterUseCase", () => {
  let mockRepository: CounterRepository;
  let useCase: GetCounterUseCase;

  beforeEach(() => {
    mockRepository = {
      getById: vi.fn(),
      save: vi.fn(),
      getDefault: vi.fn(),
    };
    useCase = new GetCounterUseCase(mockRepository);
  });

  it("should get default counter when no id provided", async () => {
    const expectedCounter = new Counter({ id: "default", value: 10 });
    vi.mocked(mockRepository.getDefault).mockResolvedValue(expectedCounter);

    const result = await useCase.execute();

    expect(result.counter).toBe(expectedCounter);
    expect(mockRepository.getDefault).toHaveBeenCalledOnce();
    expect(mockRepository.getById).not.toHaveBeenCalled();
  });

  it("should get counter by id when provided", async () => {
    const expectedCounter = new Counter({ id: "custom", value: 25 });
    vi.mocked(mockRepository.getById).mockResolvedValue(expectedCounter);

    const result = await useCase.execute({ counterId: "custom" });

    expect(result.counter).toBe(expectedCounter);
    expect(mockRepository.getById).toHaveBeenCalledWith("custom");
    expect(mockRepository.getDefault).not.toHaveBeenCalled();
  });

  it("should throw error when counter not found", async () => {
    vi.mocked(mockRepository.getById).mockResolvedValue(null);

    await expect(
      useCase.execute({ counterId: "non-existent" }),
    ).rejects.toThrow("Counter with id non-existent not found");

    expect(mockRepository.getById).toHaveBeenCalledWith("non-existent");
  });
});
