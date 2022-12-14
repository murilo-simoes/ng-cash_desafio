import { NextFunction, Response, Request } from "express";

import jwt, { JwtPayload, Secret } from "jsonwebtoken";

export const SECRET_KEY: Secret = "814f5891eedeb572b699a78ac5fec2c1";

export interface CustomRequest extends Request {
  token: string | JwtPayload;
}

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      throw new Error();
    }

    const decoded = jwt.verify(token, SECRET_KEY);
    (req as CustomRequest).token = decoded;

    next();
  } catch (err) {
    res.status(401).send("Por favor, faça login!");
  }
};
