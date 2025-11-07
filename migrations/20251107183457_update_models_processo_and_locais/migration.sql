/*
  Warnings:

  - You are about to drop the column `DESCRICAO` on the `Processos` table. All the data in the column will be lost.
  - You are about to drop the column `STATUS` on the `Processos` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Processos` DROP COLUMN `DESCRICAO`,
    DROP COLUMN `STATUS`,
    ADD COLUMN `DATAINICIO_processo` DATETIME(3) NULL,
    ADD COLUMN `STATUS_processo` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `locais` ADD COLUMN `CAPACIDADE_local` INTEGER NULL;
