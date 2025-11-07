/*
  Warnings:

  - A unique constraint covering the columns `[CPF_advogado]` on the table `Advogados` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[OAB_advogado]` on the table `Advogados` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `Advogados` ADD COLUMN `STATUS_advogado` BOOLEAN NULL DEFAULT true,
    ADD COLUMN `TEL_advogado` VARCHAR(191) NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Advogados_CPF_advogado_key` ON `Advogados`(`CPF_advogado`);

-- CreateIndex
CREATE UNIQUE INDEX `Advogados_OAB_advogado_key` ON `Advogados`(`OAB_advogado`);
