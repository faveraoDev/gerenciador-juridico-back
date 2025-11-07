/*
  Warnings:

  - You are about to drop the column `NOME_documento` on the `Documentos` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Documentos` DROP COLUMN `NOME_documento`,
    ADD COLUMN `DATA_documento` DATETIME(3) NULL,
    ADD COLUMN `DESC_documento` VARCHAR(191) NULL;
