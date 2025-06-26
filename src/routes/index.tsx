// src/routes/index.tsx
import { createFileRoute, useRouter } from "@tanstack/react-router";
import { getCounter, incrementCounter } from "@/presentation/controllers";

export const Route = createFileRoute("/")({
  component: Home,
  loader: async () => await getCounter(),
});

function Home() {
  const router = useRouter();
  const state = Route.useLoaderData();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4">
      <h1 className="text-4xl font-bold">Clean Architecture Counter</h1>
      <div className="text-2xl">Current count: {state}</div>
      <button
        type="button"
        className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        onClick={() => {
          incrementCounter({ data: 1 }).then(() => {
            router.invalidate();
          });
        }}
      >
        Add 1
      </button>
    </div>
  );
}
