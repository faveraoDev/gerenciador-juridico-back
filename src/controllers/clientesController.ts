import { Request, Response } from 'express';
import prisma from '../prismaClient';

export const listClientes = async (req: Request, res: Response) => {
  const clientes = await prisma.cliente.findMany({ include: { endereco: true } });
  res.json(clientes);
};

export const getCliente = async (req: Request, res: Response) => {
  const id = req.params.id;
  const cliente = await prisma.cliente.findUnique({ where: { ID_cliente: id }, include: { endereco: true, processos: true } });
  if (!cliente) return res.status(404).json({ error: 'Cliente não encontrado' });
  res.json(cliente);
};

export const createCliente = async (req: Request, res: Response) => {
  try {
    const novoCliente = await prisma.cliente.create({
      data: {
        NOME_cliente: req.body.NOME_cliente,
        CPF_cliente: req.body.CPF_cliente,
        EMAIL_cliente: req.body.EMAIL_cliente,
        Enderecos_ID_endereco: req.body.Enderecos_ID_endereco
      },
    });
    res.json(novoCliente);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

export const updateCliente = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const updated = await prisma.cliente.update({ where: { ID_cliente: id }, data: req.body });
    res.json(updated);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

export const deleteCliente = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    await prisma.cliente.delete({ where: { ID_cliente: id } });
    res.status(204).send();
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};