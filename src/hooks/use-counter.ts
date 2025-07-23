import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getCounter, incrementCounter } from "@/presentation/controllers";

export const COUNTER_QUERY_KEY = ["counter"] as const;

export function useCounter() {
  return useQuery({
    queryKey: COUNTER_QUERY_KEY,
    queryFn: () => getCounter(),
    staleTime: 30 * 1000, // 30 seconds
  });
}

export function useIncrementCounter() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (amount: number = 1) => incrementCounter({ data: amount }),
    onMutate: async (amount) => {
      // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries({ queryKey: COUNTER_QUERY_KEY });

      // Snapshot the previous value
      const previousCounter = queryClient.getQueryData(COUNTER_QUERY_KEY);

      // Optimistically update to the new value
      if (typeof previousCounter === "number") {
        queryClient.setQueryData(
          COUNTER_QUERY_KEY,
          previousCounter + (amount ?? 1),
        );
      }

      // Return a context object with the snapshotted value
      return { previousCounter };
    },
    onError: (err, _amount, context) => {
      // If the mutation fails, use the context returned from onMutate to roll back
      if (context?.previousCounter !== undefined) {
        queryClient.setQueryData(COUNTER_QUERY_KEY, context.previousCounter);
      }
    },
    onSettled: () => {
      // Always refetch after error or success to ensure we have the correct server state
      queryClient.invalidateQueries({ queryKey: COUNTER_QUERY_KEY });
    },
  });
}
