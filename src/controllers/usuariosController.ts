import { Request, Response } from "express";
import prisma from "../prismaClient";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "segredo_super_secreto";

// Registrar novo usuário
export const register = async (req: Request, res: Response) => {
  try {
    const { nome, email, senha, codigo } = req.body;

    if (!nome || !email || !senha) {
      return res.status(400).json({ error: "Nome, email e senha são obrigatórios." });
    }

    if (!codigo || codigo !== process.env.CODIGO_CADASTRO_USER) {
      return res.status(403).json({ error: "Código de cadastro inválido." });
    }

    const existente = await prisma.usuario.findUnique({
      where: { EMAIL_usuario: email },
    });

    if (existente) {
      return res.status(400).json({ error: "Email já cadastrado." });
    }

    const hash = await bcrypt.hash(senha, 10);

    const usuario = await prisma.usuario.create({
      data: {
        NOME_usuario: nome,
        EMAIL_usuario: email,
        SENHA_usuario: hash,
      },
    });

    res.status(201).json({
      message: "Usuário criado com sucesso!",
      usuario: {
        id: usuario.ID_usuario,
        nome: usuario.NOME_usuario,
        email: usuario.EMAIL_usuario,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao registrar usuário." });
  }
};

// Login de usuário
export const login = async (req: Request, res: Response) => {
  try {
    const { email, senha } = req.body;

    const usuario = await prisma.usuario.findUnique({
      where: { EMAIL_usuario: email },
    });

    if (!usuario) {
      return res.status(400).json({ error: "Usuário não encontrado." });
    }

    const senhaValida = await bcrypt.compare(senha, usuario.SENHA_usuario);

    if (!senhaValida) {
      return res.status(401).json({ error: "Senha incorreta." });
    }

    const token = jwt.sign(
      { id: usuario.ID_usuario, email: usuario.EMAIL_usuario },
      JWT_SECRET,
      { expiresIn: "8h" }
    );

    res.json({
      message: "Login realizado com sucesso!",
      token,
      usuario: {
        id: usuario.ID_usuario,
        nome: usuario.NOME_usuario,
        email: usuario.EMAIL_usuario,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao realizar login." });
  }
};
// Trocar senha do usuário
export const trocarSenha = async (req: Request, res: Response) => {
  try {
    const { senhaAtual, senhaNova } = req.body;
    const usuarioId = req.user?.id; // ID vem do middleware de autenticação

    if (!usuarioId) {
      return res.status(401).json({ error: "Usuário não autenticado." });
    }

    if (!senhaAtual || !senhaNova) {
      return res.status(400).json({ error: "Senha atual e nova senha são obrigatórias." });
    }

    if (senhaNova.length < 8) {
      return res.status(400).json({ error: "A nova senha deve ter no mínimo 8 caracteres." });
    }

    // Buscar usuário no banco
    const usuario = await prisma.usuario.findUnique({
      where: { ID_usuario: usuarioId },
    });

    if (!usuario) {
      return res.status(404).json({ error: "Usuário não encontrado." });
    }

    // Verificar se a senha atual está correta
    const senhaValida = await bcrypt.compare(senhaAtual, usuario.SENHA_usuario);

    if (!senhaValida) {
      return res.status(401).json({ error: "Senha atual incorreta." });
    }

    // Verificar se a nova senha é diferente da atual
    const senhaIgual = await bcrypt.compare(senhaNova, usuario.SENHA_usuario);

    if (senhaIgual) {
      return res.status(400).json({ error: "A nova senha deve ser diferente da atual." });
    }

    // Criar hash da nova senha
    const hashNovaSenha = await bcrypt.hash(senhaNova, 10);

    // Atualizar senha no banco
    await prisma.usuario.update({
      where: { ID_usuario: usuarioId },
      data: { SENHA_usuario: hashNovaSenha },
    });

    res.json({
      message: "Senha alterada com sucesso!",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao trocar senha." });
  }
};