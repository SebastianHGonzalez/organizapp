import { useDBContext } from "@/db/provider";
import { DBContext } from "@/db/provider";
import {
  useInfiniteQuery,
  infiniteQueryOptions,
  useSuspenseInfiniteQuery
} from "@tanstack/react-query";

interface GetAllTasksParams {
  offset?: number;
  limit?: number;
}

export function getAllTasksInfiniteQueryOptions(
  ctx: DBContext,
  params?: Parameters<typeof ctx.db.query.tasks.findMany>[0],
) {
  return infiniteQueryOptions({
    initialPageParam: params?.offset ?? 0,
    getNextPageParam: (lastPage, pages, lastPageParam) => {
      return (lastPageParam as number) + (lastPage.length ?? 0);
    },
    queryKey: ["tasks"],
    queryFn: () => ctx.db.query.tasks.findMany(params),
  });
}

export function useGetAllTasks(params?: GetAllTasksParams) {
  const db = useDBContext();
  return useInfiniteQuery(getAllTasksInfiniteQueryOptions(db, params));
}

export function useSuspenseGetAllTasks(params?: GetAllTasksParams) {
  const db = useDBContext();
  return useSuspenseInfiniteQuery(
    getAllTasksInfiniteQueryOptions(db, params),
  );
}
