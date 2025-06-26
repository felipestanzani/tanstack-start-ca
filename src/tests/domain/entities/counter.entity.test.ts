import { describe, it, expect } from "vitest";
import { Counter } from "@/core/domain/entities";

describe("Counter Entity", () => {
  it("should create a counter with initial value", () => {
    const counter = new Counter({
      id: "test-id",
      value: 5,
    });

    expect(counter.id).toBe("test-id");
    expect(counter.value).toBe(5);
    expect(counter.createdAt).toBeInstanceOf(Date);
    expect(counter.updatedAt).toBeInstanceOf(Date);
  });

  it("should increment counter value", async () => {
    const counter = new Counter({
      id: "test-id",
      value: 5,
    });

    // Small delay to ensure different timestamps
    await new Promise((resolve) => setTimeout(resolve, 1));

    const incremented = counter.increment(3);

    expect(incremented.value).toBe(8);
    expect(incremented.id).toBe("test-id");
    expect(incremented.createdAt).toEqual(counter.createdAt);
    expect(incremented.updatedAt.getTime()).toBeGreaterThan(
      counter.updatedAt.getTime(),
    );
  });

  it("should decrement counter value", () => {
    const counter = new Counter({
      id: "test-id",
      value: 5,
    });

    const decremented = counter.decrement(2);

    expect(decremented.value).toBe(3);
    expect(decremented.id).toBe("test-id");
  });

  it("should not allow negative values when decrementing", () => {
    const counter = new Counter({
      id: "test-id",
      value: 3,
    });

    const decremented = counter.decrement(5);

    expect(decremented.value).toBe(0);
  });

  it("should reset counter to zero", () => {
    const counter = new Counter({
      id: "test-id",
      value: 42,
    });

    const reset = counter.reset();

    expect(reset.value).toBe(0);
    expect(reset.id).toBe("test-id");
  });

  it("should maintain immutability", () => {
    const counter = new Counter({
      id: "test-id",
      value: 5,
    });

    const incremented = counter.increment(1);

    expect(counter.value).toBe(5); // Original unchanged
    expect(incremented.value).toBe(6); // New instance
    expect(counter).not.toBe(incremented); // Different objects
  });
});
