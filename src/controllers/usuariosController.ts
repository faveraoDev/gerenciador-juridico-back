import { Request, Response } from "express";
import prisma from "../prismaClient";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "segredo_super_secreto"; // ideal guardar em .env

// 📌 Registrar novo usuário
export const register = async (req: Request, res: Response) => {
  try {
    const { nome, email, senha } = req.body;

    if (!nome || !email || !senha) {
      return res.status(400).json({ error: "Nome, email e senha são obrigatórios." });
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

// 📌 Login de usuário
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