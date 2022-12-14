import { Request, Response } from "express";
import { prisma } from "../../lib/prisma";
import jwt from "jsonwebtoken";
import * as bcrypt from "bcrypt";

//rota de login

export const login = async (req: Request, res: Response) => {
  const { username, pass } = req.body;
  let response;

  const query = await prisma.users.findFirst({
    where: {
      username: username,
    },
  });
  const queryAccount = await prisma.accounts.findFirst({
    where: {
      userId: query?.idUser,
    },
  });

  if (query) {
    if (await bcrypt.compare(pass, query.password)) {
      const token = jwt.sign(
        {
          id: query.idUser,
          username: query?.username,
          balance: queryAccount?.balance,
          idAccount: queryAccount?.idAccount,
        },
        "814f5891eedeb572b699a78ac5fec2c1",
        {
          expiresIn: "1d",
        }
      );

      const data = { id: query.idUser, username: query.username, token: token };
      response = { message: "logado", data };
    } else {
      return res.json("Senha inválida!");
    }
  } else {
    return res.json("Nome de usuário não existe!");
  }

  return res.json({ response, queryAccount });
};
