import { getAllTasksByType } from "@/db/tasks";
import { Task } from "@/model/Task";
import {
  useInfiniteQuery,
  infiniteQueryOptions,
  useSuspenseInfiniteQuery,
  InfiniteData,
} from "@tanstack/react-query";
import { SQLiteDatabase, useSQLiteContext } from "expo-sqlite";

export interface GetAllProjectsParams {
  offset?: number;
  limit?: number;
}

export function getAllProjectsInfiniteQueryOptions(
  db: SQLiteDatabase,
  params?: GetAllProjectsParams,
) {
  return infiniteQueryOptions<
    Task[],
    Error,
    InfiniteData<Task[], unknown>,
    unknown[],
    number
  >({
    initialPageParam: params?.offset ?? 0,
    getNextPageParam: (lastPage, pages, lastPageParam) => {
      return lastPageParam + (lastPage.length ?? 0);
    },
    queryKey: ["projects"],
    queryFn: async ({ pageParam = 0 }) =>
      getAllTasksByType(db, "project", pageParam, params?.limit ?? 10),
  });
}

export function useGetAllProjects(params?: GetAllProjectsParams) {
  const db = useSQLiteContext();
  return useInfiniteQuery(getAllProjectsInfiniteQueryOptions(db, params));
}

export function useSuspenseGetAllProjects(params?: GetAllProjectsParams) {
  const db = useSQLiteContext();
  return useSuspenseInfiniteQuery(
    getAllProjectsInfiniteQueryOptions(db, params),
  );
}
