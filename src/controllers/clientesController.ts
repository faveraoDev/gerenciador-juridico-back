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

    let enderecoID: string | null = null;

    // Criação ou reutilização de endereço (opcional)
    if (endereco) {
      const existente = await prisma.endereco.findFirst({
        where: {
          CEP_endereco: endereco.cep,
          LGDR_endereco: endereco.lgdr,
          NOME_endereco: endereco.nome,
          UF_endereco: endereco.uf,
          BAIRRO_endereco: endereco.bairro,
          CIDADE_endereco: endereco.cidade,
        },
      });

      if (existente) {
        enderecoID = existente.ID_endereco;
      } else {
        const novoEnd = await prisma.endereco.create({
          data: {
            CEP_endereco: endereco.cep ?? null,
            LGDR_endereco: endereco.lgdr ?? null,
            NOME_endereco: endereco.nome ?? null,
            UF_endereco: endereco.uf ?? null,
            BAIRRO_endereco: endereco.bairro ?? null,
            CIDADE_endereco: endereco.cidade ?? null,
          },
        });
        enderecoID = novoEnd.ID_endereco;
      }
    }

    const dataNascimento = dtnsc ? new Date(dtnsc) : null;

    // 🔹 Montagem dinâmica dos campos
    const data: any = {
      NOME_cliente: nome,
      ...(rg && { RG_cliente: rg }),
      ...(cpf && { CPF_cliente: cpf }),
      ...(dataNascimento && { DTNSC_cliente: dataNascimento }),
      ...(email && { EMAIL_cliente: email }),
      ...(tel && { TEL_cliente: tel }),
      ...(ocupacao && { OCUPACAO_cliente: ocupacao }),
      ...(justgrat !== undefined && { JUSTGRAT_cliente: justgrat }),
      ...(nmrend && { NMREND_cliente: nmrend }),
      ...(compl && { COMPL_cliente: compl }),
      ...(enderecoID && { Enderecos_ID_endereco: enderecoID }),
    };

    const novoCliente = await prisma.cliente.create({
      data,
      include: { endereco: true },
    });

    res.status(201).json(novoCliente);
  } catch (err: any) {
    console.error(err);
    res.status(400).json({ error: err.message });
  }
};

export const updateCliente = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const {
      nome,
      rg,
      cpf,
      dtnsc,
      email,
      tel,
      ocupacao,
      justgrat,
      nmrend,
      compl,
      endereco,
    } = req.body;

    let enderecoID: string | null = null;

    if (endereco) {
      const existente = await prisma.endereco.findFirst({
        where: {
          CEP_endereco: endereco.cep,
          LGDR_endereco: endereco.lgdr,
          NOME_endereco: endereco.nome,
          UF_endereco: endereco.uf,
          BAIRRO_endereco: endereco.bairro,
          CIDADE_endereco: endereco.cidade,
        },
      });

      if (existente) {
        enderecoID = existente.ID_endereco;
      } else {
        const novoEnd = await prisma.endereco.create({
          data: {
            CEP_endereco: endereco.cep ?? null,
            LGDR_endereco: endereco.lgdr ?? null,
            NOME_endereco: endereco.nome ?? null,
            UF_endereco: endereco.uf ?? null,
            BAIRRO_endereco: endereco.bairro ?? null,
            CIDADE_endereco: endereco.cidade ?? null,
          },
        });
        enderecoID = novoEnd.ID_endereco;
      }
    }

    const dataNascimento = dtnsc ? new Date(dtnsc) : null;

    // 🔹 Montagem dinâmica
    const data: any = {
      ...(nome && { NOME_cliente: nome }),
      ...(rg && { RG_cliente: rg }),
      ...(cpf && { CPF_cliente: cpf }),
      ...(dataNascimento && { DTNSC_cliente: dataNascimento }),
      ...(email && { EMAIL_cliente: email }),
      ...(tel && { TEL_cliente: tel }),
      ...(ocupacao && { OCUPACAO_cliente: ocupacao }),
      ...(justgrat !== undefined && { JUSTGRAT_cliente: justgrat }),
      ...(nmrend && { NMREND_cliente: nmrend }),
      ...(compl && { COMPL_cliente: compl }),
      ...(enderecoID && { Enderecos_ID_endereco: enderecoID }),
    };

    const updatedCliente = await prisma.cliente.update({
      where: { ID_cliente: id },
      data,
      include: { endereco: true },
    });

    res.json(updatedCliente);
  } catch (err: any) {
    console.error(err);
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