import { filter } from "./filters";
import { userThings } from "./auth";
import { userInfo } from "./userinfo";
import { transferUser } from "./transferencias";
import { Router } from "express";
import { login } from "./login";
import { registerUser } from "./register";
import { historico } from "./historicoTransacoes";

const router = Router();

// rotas para as requisições
router.post("/register", registerUser);
router.post("/login", login);
router.post("/transfer", transferUser);
router.post("/user", userInfo);
router.post("/me", userThings);
router.post("/all", historico);
router.post("/filter", filter);

export default router;
