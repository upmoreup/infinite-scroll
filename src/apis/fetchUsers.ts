import axios from "axios";
import { PaginationParams } from "src/common/interfaces/pagination";
import { PaginationResponse, User } from "src/common/utils";

export const fetchUsers = (params: PaginationParams) => {
  return axios.get<PaginationResponse<User>>("/users", { params });
};
