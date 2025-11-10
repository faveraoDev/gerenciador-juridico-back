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
    const { nome, rg, cpf, dtnsc, email, tel, ocupacao, justgrat, nmrend, compl, endereco } = req.body;

    let enderecoID;

    if (endereco) {
      // procura um endereço existente com mesmos dados
      const existente = await prisma.endereco.findFirst({
        where: {
          CEP_endereco: endereco.cep,
          LGDR_endereco: endereco.lgdr,
          NOME_endereco: endereco.nome,
          UF_endereco: endereco.uf,
          BAIRRO_endereco: endereco.bairro,
          CIDADE_endereco: endereco.cidade
        }
      });

      if (existente) {
        enderecoID = existente.ID_endereco;
      } else {
        const novoEnd = await prisma.endereco.create({
          data: {
            CEP_endereco: endereco.cep,
            LGDR_endereco: endereco.lgdr,
            NOME_endereco: endereco.nome,
            UF_endereco: endereco.uf,
            BAIRRO_endereco: endereco.bairro,
            CIDADE_endereco: endereco.cidade
          },
        });
        enderecoID = novoEnd.ID_endereco;
      }
    }

    // Valida e converte a data de nascimento
    const dataNascimento = dtnsc ? new Date(dtnsc) : null;

    const novoCliente = await prisma.cliente.create({
      data: {
        NOME_cliente: nome,
        RG_cliente: rg,
        CPF_cliente: cpf,
        DTNSC_cliente: dataNascimento,
        EMAIL_cliente: email,
        TEL_cliente: tel,
        OCUPACAO_cliente: ocupacao,
        JUSTGRAT_cliente: justgrat,
        NMREND_cliente: nmrend,
        COMPL_cliente: compl,
        Enderecos_ID_endereco: enderecoID
      },
      include: { endereco: true }
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