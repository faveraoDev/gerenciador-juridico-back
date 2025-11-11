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
  const { 
    numeroProcesso, 
    dataInicio, 
    cpfCliente, 
    oabAdvogado, 
    status, 
    nomeLocal
  } = req.body;
  
  try {
    // Validar se já existe processo com esse número
    const processoExistente = await prisma.processo.findFirst({
      where: { NUMERO_processo: numeroProcesso }
    });

    if (processoExistente) {
      return res.status(400).json({ 
        error: 'Processo já cadastrado',
        message: `Já existe um processo com o número: ${numeroProcesso}` 
      });
    }

    // Buscar o cliente pelo CPF
    const cliente = await prisma.cliente.findUnique({
      where: { CPF_cliente: cpfCliente }
    });

    if (!cliente) {
      return res.status(404).json({ 
        error: 'Cliente não encontrado',
        message: `Nenhum cliente encontrado com o CPF: ${cpfCliente}` 
      });
    }

    // Buscar o advogado pela OAB
    const advogado = await prisma.advogado.findUnique({
      where: { OAB_advogado: oabAdvogado }
    });

    if (!advogado) {
      return res.status(404).json({ 
        error: 'Advogado não encontrado',
        message: `Nenhum advogado encontrado com a OAB: ${oabAdvogado}` 
      });
    }

    // Buscar o local (pasta física) pelo nome
    const local = await prisma.locais.findFirst({
      where: { NOME_local: nomeLocal }
    });

    if (!local) {
      return res.status(404).json({ 
        error: 'Local não encontrado',
        message: `Nenhum local encontrado com o nome: ${nomeLocal}` 
      });
    }

    // Valida e converte a data de início
    const dataValidada = dataInicio ? new Date(dataInicio) : null;

    // Criar o processo com todas as associações
    const novoProcesso = await prisma.processo.create({
      data: {
        NUMERO_processo: numeroProcesso,
        STATUS_processo: status,
        DATAINICIO_processo: dataValidada,
        Locais_ID_local: local.ID_local,
        // Associar cliente
        clientes: {
          create: {
            Clientes_ID_cliente: cliente.ID_cliente,
            // Associar advogado ao cliente no processo
            advogados: {
              create: {
                Advogados_ID_advogado: advogado.ID_advogado
              }
            }
          }
        }
      },
      // Retornar com todos os dados relacionados
      include: {
        local: true,
        clientes: {
          include: {
            cliente: true,
            advogados: {
              include: {
                advogado: true
              }
            }
          }
        }
      }
    });
    
    res.status(201).json({
      message: 'Processo criado com sucesso',
      processo: novoProcesso
    });

  } catch (err: any) {
    console.error('Erro ao criar processo:', err);
    res.status(500).json({ 
      error: 'Erro ao criar processo',
      message: err.message 
    });
  }
};

export const updateProcesso = async (req: Request, res: Response) => {
  const { CPF_cliente, OAB_advogado, NOME_local, NUMERO_processo, STATUS_processo, DATAINICIO_processo } = req.body;
  const id = req.params.id;

  try {
    const dataToUpdate: any = {};

    if (NUMERO_processo) dataToUpdate.NUMERO_processo = NUMERO_processo;
    if (STATUS_processo) dataToUpdate.STATUS_processo = STATUS_processo;
    if (DATAINICIO_processo) dataToUpdate.DATAINICIO_processo = new Date(DATAINICIO_processo);

    // Atualizar local, se informado
    if (NOME_local) {
      const local = await prisma.locais.findFirst({ where: { NOME_local } });
      if (!local) return res.status(404).json({ error: 'Local não encontrado' });
      dataToUpdate.Locais_ID_local = local.ID_local;
    }

    // Atualizar cliente e advogado (relacionamento)
    if (CPF_cliente || OAB_advogado) {
      const cliente = CPF_cliente ? await prisma.cliente.findUnique({ where: { CPF_cliente } }) : null;
      const advogado = OAB_advogado ? await prisma.advogado.findUnique({ where: { OAB_advogado } }) : null;

      if (CPF_cliente && !cliente)
        return res.status(404).json({ error: 'Cliente não encontrado' });
      if (OAB_advogado && !advogado)
        return res.status(404).json({ error: 'Advogado não encontrado' });

      // Remove os vínculos antigos e recria com os novos (garantindo consistência)
      await prisma.processosHasClientes.deleteMany({ where: { Processos_ID_processo: id } });

      if (cliente) {
        await prisma.processosHasClientes.create({
          data: {
            Processos_ID_processo: id,
            Clientes_ID_cliente: cliente.ID_cliente,
            advogados: advogado
              ? {
                  create: { Advogados_ID_advogado: advogado.ID_advogado }
                }
              : undefined
          }
        });
      }
    }

    const processoAtualizado = await prisma.processo.update({
      where: { ID_processo: id },
      data: dataToUpdate,
      include: {
        local: true,
        clientes: {
          include: {
            cliente: true,
            advogados: { include: { advogado: true } }
          }
        }
      }
    });

    res.status(200).json({
      message: 'Processo atualizado com sucesso',
      processo: processoAtualizado
    });
  } catch (err: any) {
    console.error('Erro ao atualizar processo:', err);
    res.status(500).json({ error: err.message });
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