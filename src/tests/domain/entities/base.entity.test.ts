import { describe, it, expect } from "vitest";

// Minimal concrete class for testing
class TestEntity extends (await import("@/core/domain/entities/base.entity"))
  .BaseEntity {
  constructor(id: string, createdAt?: Date, updatedAt?: Date) {
    super(id, createdAt, updatedAt);
  }
}

describe("BaseEntity", () => {
  it("should set id, createdAt, and updatedAt", () => {
    const now = new Date();
    const entity = new TestEntity("entity-1", now, now);
    expect(entity.id).toBe("entity-1");
    expect(entity.createdAt).toBe(now);
    expect(entity.updatedAt).toBe(now);
  });

  it("should default createdAt and updatedAt to now if not provided", () => {
    const before = new Date();
    const entity = new TestEntity("entity-2");
    const after = new Date();
    expect(entity.createdAt.getTime()).toBeGreaterThanOrEqual(before.getTime());
    expect(entity.createdAt.getTime()).toBeLessThanOrEqual(after.getTime());
    expect(entity.updatedAt.getTime()).toBeGreaterThanOrEqual(before.getTime());
    expect(entity.updatedAt.getTime()).toBeLessThanOrEqual(after.getTime());
  });

  it("should consider entities with the same id as equal", () => {
    const entity1 = new TestEntity("same-id");
    const entity2 = new TestEntity("same-id");
    expect(entity1.equals(entity2)).toBe(true);
  });

  it("should consider entities with different ids as not equal", () => {
    const entity1 = new TestEntity("id-1");
    const entity2 = new TestEntity("id-2");
    expect(entity1.equals(entity2)).toBe(false);
  });
});
