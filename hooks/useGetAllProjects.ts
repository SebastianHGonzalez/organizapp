import { getAllProjects, GetAllProjectsParams } from "@/db/projects";
import { Project } from "@/model/Project";
import {
  useInfiniteQuery,
  infiniteQueryOptions,
  useSuspenseInfiniteQuery,
  InfiniteData,
} from "@tanstack/react-query";
import { SQLiteDatabase, useSQLiteContext } from "expo-sqlite";

export function getAllProjectsInfiniteQueryOptions(
  db: SQLiteDatabase,
  params?: GetAllProjectsParams,
) {
  return infiniteQueryOptions<
    Project[],
    Error,
    InfiniteData<Project[], unknown>,
    unknown[],
    number
  >({
    initialPageParam: 0,
    getNextPageParam: (lastPage, pages, lastPageParam) => {
      return lastPageParam + (lastPage.length ?? 0);
    },
    queryKey: ["projects"],
    queryFn: async ({ pageParam = 0 }) =>
      getAllProjects(db, { ...params, offset: pageParam }),
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
