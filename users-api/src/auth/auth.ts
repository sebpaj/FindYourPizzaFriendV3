import jwt from "jsonwebtoken";

import { User } from "../generated/types";

const SECRET_KEY = "mysecretkey";

export const generateToken = (user: User) => {
  const { _id, username } = user;
  return jwt.sign({ _id, username }, SECRET_KEY, { expiresIn: "1h" });
};
