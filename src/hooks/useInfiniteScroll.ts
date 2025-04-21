import { AxiosResponse } from "axios";
import { useCallback, useEffect, useState } from "react";
import { PaginationParams } from "src/common/interfaces/pagination";
import { PaginationResponse, throttle } from "src/common/utils";

interface InfiniteScrollOptions {
  size: number;
  onSuccess: () => void;
  onError?: (err: unknown) => void;
}

const useInfiniteScroll = <T>(
  fetcher: (
    params: PaginationParams
  ) => Promise<AxiosResponse<PaginationResponse<T>>>,
  { size, onSuccess, onError }: InfiniteScrollOptions
) => {
  const [page, setPage] = useState<number>(0);
  const [data, setData] = useState<T[]>([]);
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [hasNextPage, setHasNextPage] = useState<boolean>(true);

  const executeFetch = useCallback(async () => {
    try {
      const {
        data: { contents, pageNumber, isLastPage },
      } = await fetcher({ page, size });
      setData((prev) => prev.concat(contents));
      setPage(pageNumber + 1);
      setHasNextPage(!isLastPage);
      setIsFetching(false);
      onSuccess?.();
    } catch (err) {
      onError?.(err);
    }
  }, [page]);

  useEffect(() => {
    const handleScroll = throttle(() => {
      const { scrollTop, offsetHeight } = document.documentElement;
      if (window.innerHeight + scrollTop >= offsetHeight) {
        setIsFetching(true);
      }
    });

    setIsFetching(true);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isFetching && hasNextPage) executeFetch();
    else if (!hasNextPage) setIsFetching(false);
  }, [isFetching]);

  return { page, data, isFetching, hasNextPage };
};

export default useInfiniteScroll;
