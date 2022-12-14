import { Request, Response } from "express";
import { prisma } from "../../lib/prisma";

async function searchUser(username: string) {
  const query = await prisma.users.findFirst({
    where: {
      username: username,
    },
  });

  return query;
}

// criar a row na tabela transactions

const createTransaction = async (
  origem: number,
  destino: number,
  valor: number
) => {
  const transaction = await prisma.transactions.create({
    data: {
      debitedAccountId: origem,
      creditedAccountId: destino,
      value: valor,
    },
  });

  return transaction;
};

export const transferUser = async (req: Request, res: Response) => {
  const { val, origin, destiny } = req.body;
  const userOrigin = await searchUser(origin);
  const userDestiny = await searchUser(destiny);
  let transfer;

  //   verificando se o usuário digitado existe
  if (!userDestiny) {
    return res.json("Usuário não existe!");
  }

  //fazendo a query de ambos os usuários da transferência
  const accOrigin = await prisma.accounts.findFirst({
    where: {
      userId: userOrigin?.idUser,
    },
  });

  const accDestiny = await prisma.accounts.findFirst({
    where: {
      userId: userDestiny?.idUser,
    },
  });

  //   verificações antes de fazer a transferencia
  if (!accOrigin || !accDestiny) return res.json("A conta não existe!");

  if (accOrigin?.balance < val) {
    return res.json("Saldo insuficiente!");
  }

  if (val.typeOf === "String") {
    return res.json("Não é um número!");
  }

  if (accOrigin.userId === accDestiny.userId) {
    return res.json("Não é possível realizar uma transferência para si mesmo!");
  }
  //   subtraindo da carteira do usuário logado
  await prisma.accounts.update({
    where: {
      userId: userOrigin?.idUser,
    },
    data: {
      balance: { decrement: val },
    },
  });

  //   adicionando à carteira do usuário digitado
  await prisma.accounts.update({
    where: {
      userId: userDestiny?.idUser,
    },
    data: {
      balance: { increment: val },
    },
  });

  //retornando a resposta do usuário
  const response = await prisma.accounts.findFirst({
    where: {
      userId: userOrigin?.idUser,
    },
  });

  const response2 = await prisma.accounts.findFirst({
    where: {
      userId: userDestiny?.idUser,
    },
  });

  if (response && response2) {
    transfer = await createTransaction(
      response?.idAccount,
      response2?.idAccount,
      val
    );
  }

  return res.json({ origem: response, destino: response2, transfer: transfer });
};
