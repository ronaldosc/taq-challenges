import * as jwt from 'jsonwebtoken';
require("dotenv").config();

export const createToken = (payload: any): string => {
  const secret = process.env.SECRET!
  const expiresIn = "1h";
  const token = jwt.sign(payload, secret, { expiresIn });

  return token;
}

export const decodeToken = () => {
  // todo
}
