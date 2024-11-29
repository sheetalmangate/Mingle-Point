import type { Request } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import JwtPayload from "../interfaces/JwtPayload";
import { Types } from "mongoose";
dotenv.config();

export const authenticateToken = ({ req }: { req: Request }) => {
  let token = req.body.token || req.query.token || req.headers.authorization;

  if (req.headers.authorization) {
    token = token.split(" ").pop().trim();
  }

  if (!token) {
    return req;
  }

  try {
    const { data }: any = jwt.verify(token, process.env.JWT_SECRET_KEY || "", {
      maxAge: "48hr",
    });
    req.user = data satisfies JwtPayload;
  } catch (err) {
    console.log("Invalid token");
  }

  return req;
};

export const signToken = (
  username: string,
  email: string,
  _id: Types.ObjectId
) => {
  const payload = { username, email, _id };
  const secretKey: any = process.env.JWT_SECRET_KEY;

  return jwt.sign({ data: payload }, secretKey, { expiresIn: "2h" });
};
