/*
  Warnings:

  - You are about to drop the column `NUMERO` on the `enderecos` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[CPF_cliente]` on the table `clientes` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `clientes` ADD COLUMN `DTNSC_cliente` DATETIME(3) NULL,
    ADD COLUMN `JUSTGRAT_cliente` BOOLEAN NULL DEFAULT false,
    ADD COLUMN `NMREND_cliente` VARCHAR(191) NULL,
    ADD COLUMN `OCUPACAO_cliente` VARCHAR(191) NULL,
    ADD COLUMN `RG_cliente` VARCHAR(191) NULL,
    ADD COLUMN `TEL_cliente` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `enderecos` DROP COLUMN `NUMERO`;

-- CreateIndex
CREATE UNIQUE INDEX `clientes_CPF_cliente_key` ON `clientes`(`CPF_cliente`);
