import { Response } from "express";
import { Request } from "express";
import { prisma } from "./../../lib/prisma";
export const filter = async (req: Request, res: Response) => {
  const { id } = req.body;

  const filterDebited = await prisma.transactions.findFirst({
    where: {
      debitedAccountId: id,
    },
    orderBy: {
      debitedAccountId: id,
    },
  });
  const filterCredited = await prisma.transactions.findFirst({
    where: {
      creditedAccountId: id,
    },
    orderBy: {
      creditedAccountId: id,
    },
  });
  //   const filterCreatedAt = await prisma.transactions.findFirst({
  //     where: {
  //       creditedAccountId: id,
  //     },
  //     orderBy: {
  //       createdAt: data,
  //     },
  //   });

  return res.json({ filterCredited, filterDebited });
};
