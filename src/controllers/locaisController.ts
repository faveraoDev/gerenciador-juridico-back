// CORRIGIR LOCAIS

import { Request, Response } from 'express';
import prisma from '../prismaClient';

export const listLocais = async (req: Request, res: Response) => {
  const locais = await prisma.locais.findMany({ include: { processos: true } });
  res.json(locais);
};

export const getLocal = async (req: Request, res: Response) => {
  const id = req.params.id;
  const local = await prisma.locais.findUnique({ where: { ID_local: id }, include: { processos: true } });
  if (!local) return res.status(404).json({ error: 'Local não encontrado' });
  res.json(local);
};

export const createLocal = async (req: Request, res: Response) => {
  const { nome, capacidade } = req.body;
  
  try {
    const novoLocal = await prisma.locais.create({
      data: {
        NOME_local: nome
      },
    });
    res.json(novoLocal);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

export const updateLocal = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const updated = await prisma.locais.update({ where: { ID_local: id }, data: req.body });
    res.json(updated);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

export const deleteLocal = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    await prisma.locais.delete({ where: { ID_local: id } });
    res.status(204).send();
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};