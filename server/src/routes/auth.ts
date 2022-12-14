import { Response, Request } from "express";
import { prisma } from "../../lib/prisma";
export const userThings = async (req: Request, res: Response) => {
  const { username } = req.body;

  const response = await prisma.users.findFirst({
    where: {
      username: username,
    },
  });
  const response2 = await prisma.accounts.findFirst({
    where: {
      userId: response?.idUser,
    },
  });

  const response3 = await prisma.transactions.findMany({
    where: {
      debitedAccountId: response2?.idAccount,
    },
  });
  const response4 = await prisma.transactions.findMany({
    where: {
      creditedAccountId: response2?.idAccount,
    },
  });

  return res.json({
    user: response,
    account: response2,
    transactionsDebited: response3,
    transactionsCredited: response4,
  });
};
