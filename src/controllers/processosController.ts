import { Request, Response } from 'express';
import prisma from '../prismaClient';

export const listProcessos = async (req: Request, res: Response) => {
  const processos = await prisma.processo.findMany({
    include: {
      local: true,
      documentos: { include: { documento: true } },
      clientes: { include: { cliente: true, advogados: { include: { advogado: true } } } }
    }
  });
  res.json(processos);
};

export const getProcesso = async (req: Request, res: Response) => {
  const id = req.params.id;
  const processo = await prisma.processo.findUnique({
    where: { ID_processo: id },
    include: {
      local: true,
      documentos: { include: { documento: true } },
      clientes: { include: { cliente: true, advogados: { include: { advogado: true } } } }
    }
  });
  if (!processo) return res.status(404).json({ error: 'Processo não encontrado' });
  res.json(processo);
};

export const createProcesso = async (req: Request, res: Response) => {
  try {
    const novoProcesso = await prisma.processo.create({
      data: {
        NUMERO_processo: req.body.NUMERO_processo,
        DESCRICAO: req.body.DESCRICAO,
        STATUS: req.body.STATUS,
        Locais_ID_local: req.body.Locais_ID_local,
      },
    });
    res.json(novoProcesso);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

export const updateProcesso = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const updated = await prisma.processo.update({ where: { ID_processo: id }, data: req.body });
    res.json(updated);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

export const deleteProcesso = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    await prisma.processo.delete({ where: { ID_processo: id } });
    res.status(204).send();
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};