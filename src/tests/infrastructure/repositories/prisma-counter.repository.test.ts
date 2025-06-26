import { beforeEach, describe, expect, it } from "vitest";
import { PrismaClient } from "@prisma/client";
import { PrismaCounterRepository } from "@/infrastructure/repositories";
import { Counter } from "@/core/domain/entities";

describe("PrismaCounterRepository", () => {
  let prisma: PrismaClient;
  let repository: PrismaCounterRepository;

  beforeEach(async () => {
    prisma = new PrismaClient();
    repository = new PrismaCounterRepository(prisma);

    // Clean up the database before each test
    await prisma.counter.deleteMany();
  });

  describe("getDefault", () => {
    it("should return a default counter with value 0 when no counter exists", async () => {
      const counter = await repository.getDefault();

      expect(counter).toBeInstanceOf(Counter);
      expect(counter.id).toBe("default");
      expect(counter.value).toBe(0);
      expect(counter.createdAt).toBeInstanceOf(Date);
      expect(counter.updatedAt).toBeInstanceOf(Date);
    });

    it("should return existing default counter", async () => {
      // Create a counter first
      await prisma.counter.create({
        data: { id: "default", value: 5 },
      });

      const counter = await repository.getDefault();

      expect(counter.id).toBe("default");
      expect(counter.value).toBe(5);
    });
  });

  describe("getById", () => {
    it("should return null when counter does not exist", async () => {
      const counter = await repository.getById("non-existent");

      expect(counter).toBeNull();
    });

    it("should return counter when it exists", async () => {
      const testId = "test-counter";
      await prisma.counter.create({
        data: { id: testId, value: 10 },
      });

      const counter = await repository.getById(testId);

      expect(counter).toBeInstanceOf(Counter);
      expect(counter!.id).toBe(testId);
      expect(counter!.value).toBe(10);
    });
  });

  describe("save", () => {
    it("should create a new counter when it does not exist", async () => {
      const counter = new Counter({
        id: "new-counter",
        value: 15,
      });

      await repository.save(counter);

      const savedCounter = await prisma.counter.findUnique({
        where: { id: "new-counter" },
      });

      expect(savedCounter).not.toBeNull();
      expect(savedCounter!.value).toBe(15);
    });

    it("should update existing counter", async () => {
      // Create initial counter
      await prisma.counter.create({
        data: { id: "existing-counter", value: 5 },
      });

      const updatedCounter = new Counter({
        id: "existing-counter",
        value: 20,
        updatedAt: new Date(),
      });

      await repository.save(updatedCounter);

      const savedCounter = await prisma.counter.findUnique({
        where: { id: "existing-counter" },
      });

      expect(savedCounter!.value).toBe(20);
    });
  });
});
