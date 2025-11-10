import { Request, Response } from 'express';
import prisma from '../prismaClient';

export const listAdvogados = async (req: Request, res: Response) => {
  const advs = await prisma.advogado.findMany();
  res.json(advs);
};

export const getAdvogado = async (req: Request, res: Response) => {
  const id = req.params.id;
  const adv = await prisma.advogado.findUnique({ where: { ID_advogado: id } });
  if (!adv) return res.status(404).json({ error: 'Advogado não encontrado' });
  res.json(adv);
};

export const createAdvogado = async (req: Request, res: Response) => {
  try {
    const { nome, cpf, oab, dtnsc, tel, email } = req.body;

    const dataNascimento = dtnsc ? new Date(dtnsc) : null;

    // Valida e converte a data de nascimento
    const created = await prisma.advogado.create({
      data: {
        NOME_advogado: nome,
        CPF_advogado: cpf,
        OAB_advogado: oab,
        DTNSC_advogado: dataNascimento,
        TEL_advogado: tel,
        EMAIL_advogado: email
      },
    });

    res.status(201).json(created);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

export const updateAdvogado = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const updated = await prisma.advogado.update({ where: { ID_advogado: id }, data: req.body });
    res.json(updated);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

export const deleteAdvogado = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    await prisma.advogado.delete({ where: { ID_advogado: id } });
    res.status(204).send();
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};