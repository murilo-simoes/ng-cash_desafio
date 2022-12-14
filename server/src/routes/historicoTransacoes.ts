import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import { prisma } from "../../lib/prisma";

export const historico = async (req: Request, res: Response) => {
  const { idConta, token } = req.body;

  const queryDebited = await prisma.transactions.findMany({
    where: {
      debitedAccountId: idConta,
    },
  });
  const queryCredited = await prisma.transactions.findMany({
    where: {
      creditedAccountId: idConta,
    },
  });
  // const loggedQuery = await prisma.users.findFirst({
  //     where:{
  //         idUser: idConta
  //     }
  // })
  const data = queryDebited.concat(queryCredited);
  return res.json(data);
};
