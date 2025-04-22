import { QueryFunctionContext, useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import { PaginationParams } from "src/common/interfaces/pagination";
import { PaginationResponse, User } from "src/common/utils";

const userKeys = {
  all: ["users"] as const,
  lists: () => [...userKeys.all, "list"] as const,
  list: (filters: string) => [...userKeys.lists(), { filters }] as const,
  details: () => [...userKeys.all, "detail"] as const,
  detail: (id: number) => [...userKeys.details(), id] as const,
};

const useFetchUsersQuery = ({ size }: PaginationParams) =>
  useInfiniteQuery({
    queryKey: userKeys.lists(),
    queryFn: async ({ pageParam = 0 }) => {
      const res = await axios.get<PaginationResponse<User>>("/users", {
        params: { page: pageParam, size },
      });
      return res.data;
    },
    getNextPageParam: (lastPage) => {
      return lastPage.isLastPage ? undefined : lastPage.pageNumber + 1;
    },
    initialPageParam: 0,
  });

export default useFetchUsersQuery;
