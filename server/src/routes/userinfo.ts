import jwt from "jsonwebtoken";
import { Response, Request } from "express";
export const userInfo = async (req: Request, res: Response) => {
  const { token } = req.body;

  if (!token) {
    return res.json("Token Inválido.");
  }

  const id = jwt.decode(token);

  return res.json(id);
};
