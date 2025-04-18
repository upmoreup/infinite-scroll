import { Box } from "@mui/material";
import axios from "axios";
import { useState, useCallback, useEffect } from "react";
import { PaginationResponse, User } from "src/common/utils/types";
import UserCard from "./_components/Card";

const Infinite = () => {
  const CARD_SIZE = 1000;
  const PAGE_SIZE = 10 * Math.ceil((visualViewport?.width ?? 1) / CARD_SIZE);

  const [page, setPage] = useState(0);
  const [users, setUsers] = useState<User[]>([]);
  const [isFetching, setFetching] = useState(false);
  const [hasNextPage, setNextPage] = useState(true);

  const fetchUsers = useCallback(async () => {
    const { data } = await axios.get<PaginationResponse<User>>("/users", {
      params: { page, size: PAGE_SIZE },
    });
    setUsers(users.concat(data.contents));
    setPage(data.pageNumber + 1);
    setNextPage(!data.isLastPage);
    setFetching(false);
  }, [page]);

  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, offsetHeight } = document.documentElement;
      if (window.innerHeight + scrollTop >= offsetHeight) {
        setFetching(true);
      }
    };
    setFetching(true);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isFetching && hasNextPage) fetchUsers();
    else if (!hasNextPage) setFetching(false);
  }, [isFetching]);

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
    </Box>
  );
};

export default Infinite;
