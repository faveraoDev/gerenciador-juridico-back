import { Request, Response } from 'express';
import prisma from '../prismaClient';

export const listEnderecos = async (req: Request, res: Response) => {
  const ends = await prisma.endereco.findMany({ include: { clientes: true } });
  res.json(ends);
};

export const getEndereco = async (req: Request, res: Response) => {
  const id = req.params.id;
  const e = await prisma.endereco.findUnique({ where: { ID_endereço: id }, include: { clientes: true } });
  if (!e) return res.status(404).json({ error: 'Endereço não encontrado' });
  res.json(e);
};

export const createEndereco = async (req: Request, res: Response) => {
  try {
    const novoEndereco = await prisma.endereco.create({
      data: {
        RUA: req.body.RUA,
        NUMERO: req.body.NUMERO,
        BAIRRO: req.body.BAIRRO,
        CIDADE: req.body.CIDADE,
        ESTADO: req.body.ESTADO,
      },
    });
    res.json(novoEndereco);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

export const updateEndereco = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const updated = await prisma.endereco.update({ where: { ID_endereço: id }, data: req.body });
    res.json(updated);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

export const deleteEndereco = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    await prisma.endereco.delete({ where: { ID_endereço: id } });
    res.status(204).send();
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};