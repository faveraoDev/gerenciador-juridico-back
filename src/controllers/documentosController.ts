import { Request, Response } from 'express';
import prisma from '../prismaClient';

export const listDocumentos = async (req: Request, res: Response) => {
  const docs = await prisma.documento.findMany({ include: { processos: { include: { processo: true } } } });
  res.json(docs);
};

export const getDocumento = async (req: Request, res: Response) => {
  const id = req.params.id;
  const doc = await prisma.documento.findUnique({ where: { ID_documento: id }, include: { processos: { include: { processo: true } } } });
  if (!doc) return res.status(404).json({ error: 'Documento não encontrado' });
  res.json(doc);
};

export const createDocumento = async (req: Request, res: Response) => {
  const { tipo, data, desc, numeroProcesso } = req.body;
  
  try {
    // Busca o processo pelo número que o usuário conhece
    const processo = await prisma.processo.findFirst({
      where: { NUMERO_processo: numeroProcesso }
    });

    // Valida se o processo existe
    if (!processo) {
      return res.status(404).json({ 
        error: 'Processo não encontrado',
        message: `Nenhum processo encontrado com o número: ${numeroProcesso}` 
      });
    }

    // Valida e converte a data do documento
    const dataDocumento = data ? new Date(data) : null;

    // Cria o documento e associa ao processo usando o ID interno
    const novoDoc = await prisma.documento.create({
      data: {
        TIPO_documento: tipo,
        DATA_documento: dataDocumento,
        DESC_documento: desc,
        processos: {
          create: {
            Processos_ID_processo: processo.ID_processo
          }
        }
      },
      // Retorna o documento com os dados do processo inclusos
      include: {
        processos: {
          include: {
            processo: true
          }
        }
      }
    });
    
    res.status(201).json(novoDoc);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

export const updateDocumento = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const { tipo, data, desc, numeroProcesso } = req.body;

    let processoID: string | undefined;

    // Se o número do processo foi informado, buscamos o ID correspondente
    if (numeroProcesso) {
      const processo = await prisma.processo.findFirst({
        where: { NUMERO_processo: numeroProcesso }
      });

      if (!processo) {
        return res.status(404).json({ 
          error: 'Processo não encontrado',
          message: `Nenhum processo encontrado com o número: ${numeroProcesso}`
        });
      }

      processoID = processo.ID_processo;
    }

    // Converte a data, se enviada
    const dataDocumento = data ? new Date(data) : undefined;

    // Atualiza o documento principal
    const updatedDoc = await prisma.documento.update({
      where: { ID_documento: id },
      data: {
        TIPO_documento: tipo,
        DATA_documento: dataDocumento,
        DESC_documento: desc
      },
      include: {
        processos: { include: { processo: true } }
      }
    });

    // Se o processo for alterado, atualiza a associação na tabela intermediária
    if (processoID) {
      await prisma.documentoProcesso.updateMany({
        where: { Documentos_ID_documento: id },
        data: { Processos_ID_processo: processoID }
      });
    }

    // Retorna o documento atualizado com o processo associado
    const documentoFinal = await prisma.documento.findUnique({
      where: { ID_documento: id },
      include: {
        processos: { include: { processo: true } }
      }
    });

    res.json(documentoFinal);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

export const deleteDocumento = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    await prisma.documento.delete({ where: { ID_documento: id } });
    res.status(204).send();
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};