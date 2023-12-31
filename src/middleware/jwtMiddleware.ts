import jwt from "jsonwebtoken";

import { JWT_EXPIRATION, JWT_SECRET } from "../config/env";
import { NextFunction, Response, Request } from "express";

export default function jwtVerif(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (req.header("Authorization") === undefined) {
    console.log("no header");
    return res.status(401).json({ error: "Authorization denied." });
  }
  const token = req.header("Authorization")?.split(" ")[1];
  if (!token) {
    console.log("invalid token");
    return res.status(401).json({ error: "Access denied." });
  }
  jwt.verify(
    token,
    // @ts-ignore
    JWT_SECRET,
    {
      maxAge: JWT_EXPIRATION,
    },
    (err, _) => {
      if (err) {
        console.log("expired token");
        return res.status(401).json({ error: "Access denied." });
      }
      next();
    }
  );
}
