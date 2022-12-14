import { Request, Response } from "express";
import * as bcrypt from "bcrypt";
import { prisma } from "../../lib/prisma";

//rota de registro

const createAcc = async (uid: number) => {
  const acc = await prisma.accounts.create({
    data: {
      balance: 100,
      userId: uid,
    },
  });

  return acc;
};

export const registerUser = async (req: Request, res: Response) => {
  const { username, pass } = req.body;

  const hash = await bcrypt.hash(pass, 8);
  let acc;
  const query = await prisma.users.findFirst({
    where: {
      username: username,
    },
  });
  // ifs antes da cadastrar
  if (username === "" || pass === "") {
    return res.json("Por favor, preencha os campos corretamente!");
  }
  if (username.length <= 2) {
    return res.json("O nome de usuário deve conter pelo menos 3 caracteres!");
  }

  if (username === query?.username) {
    return res.json("Esse usuário ja existe!");
  }

  if (
    username.length <= 2 ||
    pass.length <= 7 ||
    !pass.match(/[A-Z]/) ||
    !pass.match(/[0-9]/)
  ) {
    return res.json("Requisitos nao preenchidos!");
  }

  const user = await prisma.users.create({
    data: {
      username: username,
      password: hash,
    },
  });

  if (user) {
    acc = await createAcc(user?.idUser);
  }

  return res.json({ user: user, acc: acc });
};
