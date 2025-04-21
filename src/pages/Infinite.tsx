import { Box } from "@mui/material";
import UserCard from "./_components/Card";
import useInfiniteScroll from "src/hooks/useInfiniteScroll";
import { fetchUsers } from "src/apis/fetchUsers";
import Loading from "./_components/Loading";

const Infinite = () => {
  const CARD_SIZE = 1000;
  const PAGE_SIZE = 10 * Math.ceil((visualViewport?.width ?? 1) / CARD_SIZE);

  const { data: users, isFetching } = useInfiniteScroll(fetchUsers, {
    size: PAGE_SIZE,
    onSuccess: () => {},
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
