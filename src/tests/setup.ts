// Test setup configuration
import { vi } from "vitest";

// Mock console.log to reduce noise during tests
global.console = {
  ...console,
  log: vi.fn(),
  debug: vi.fn(),
  info: vi.fn(),
  warn: vi.fn(),
  error: vi.fn(),
};

// Note: For controller tests, consider mocking the DI container globally if needed.
