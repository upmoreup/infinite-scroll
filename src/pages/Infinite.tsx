import { Box } from "@mui/material";
import UserCard from "./_components/Card";
import useInfiniteScroll from "src/hooks/useInfiniteScroll";
import useFetchUsersQuery from "src/apis/useFetchUsersQuery";
import Loading from "./_components/Loading";
import useIntersectionObserver from "src/hooks/useIntersectionObserver";
import { useMemo } from "react";

const Infinite = () => {
  const CARD_SIZE = 1000;
  const PAGE_SIZE = 10 * Math.ceil((visualViewport?.width ?? 1) / CARD_SIZE);

  // const { data: users, isFetching } = useInfiniteScroll(useFetchUsersQuery, {
  //   size: PAGE_SIZE,
  //   onSuccess: () => {},
  // });
  const { data, hasNextPage, isFetching, fetchNextPage } = useFetchUsersQuery({
    size: PAGE_SIZE,
  });
  const users = useMemo(
    () => (data ? data.pages.flatMap(({ contents }) => contents) : []),
    [data]
  );

  const ref = useIntersectionObserver(async (entry, observer) => {
    observer.unobserve(entry.target);
    if (hasNextPage && !isFetching) {
      fetchNextPage();
    }
  });

  return (
    <Box
      display={"flex"}
      flexDirection={"row"}
      flexWrap={"wrap"}
      gap={3}
      width={"100%"}
      height={"100%"}
    >
      {users.map((data) => (
        <UserCard id={data.id} name={data.name} />
      ))}
      {isFetching && <Loading />}
    </Box>
  );
};

export default Infinite;
