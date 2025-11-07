import { Router } from "express";
import { register, login, trocarSenha } from "../controllers/usuariosController";
import { autenticar } from "../middleware/authMiddleware";

const router = Router();

// Rotas públicas
router.post("/register", register);
router.post("/login", login);

// Rota protegida - requer autenticação
router.patch("/trocar-senha", autenticar, trocarSenha);

export default router;