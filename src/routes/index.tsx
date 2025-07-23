// src/routes/index.tsx
import { createFileRoute } from "@tanstack/react-router";
import { getCounter } from "@/presentation/controllers";
import { useCounter, useIncrementCounter } from "@/hooks/use-counter";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
  component: Home,
  loader: async () => await getCounter(),
});

function Home() {
  const { data: counter, isLoading, error, isRefetching } = useCounter();
  const incrementMutation = useIncrementCounter();

  const handleIncrement = () => {
    incrementMutation.mutate(1);
  };

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4">
        <h1 className="text-4xl font-bold text-red-600">Error</h1>
        <p className="text-xl">Failed to load counter: {error.message}</p>
        <Button onClick={() => window.location.reload()}>Retry</Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4">
      <h1 className="text-4xl font-bold">Clean Architecture Counter</h1>
      <div className="text-2xl flex items-center gap-2">
        Current count:
        <span className={`font-mono ${isRefetching ? "opacity-50" : ""}`}>
          {isLoading ? "Loading..." : counter}
        </span>
        {isRefetching && (
          <span className="text-sm text-gray-500 animate-pulse">
            Updating...
          </span>
        )}
      </div>
      <Button
        onClick={handleIncrement}
        disabled={incrementMutation.isPending || isLoading}
        className="px-6 py-3 text-lg transition-colors"
      >
        {incrementMutation.isPending ? "Adding..." : "Add 1"}
      </Button>

      {incrementMutation.isError && (
        <p className="text-red-500 text-sm">
          Failed to increment counter: {incrementMutation.error?.message}
        </p>
      )}

      <div className="text-xs text-gray-500 mt-4 text-center max-w-md">
        <p>✨ Powered by TanStack with optimistic updates</p>
        <p>🔄 Auto-refresh • ⚡ Instant feedback • 🚫 Smart error handling</p>
      </div>
    </div>
  );
}
