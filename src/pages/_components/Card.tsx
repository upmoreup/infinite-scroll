import { Card } from "@mui/material";
import { User } from "src/common/utils/types";

const UserCard = ({ id, name }: User) => {
  return (
    <Card
      key={id}
      sx={{ border: "solid red 1px", width: "25%", height: "200px" }}
    >
      {name}
    </Card>
  );
};

export default UserCard;
