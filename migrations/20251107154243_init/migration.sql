/*
  Warnings:

  - You are about to drop the column `Enderecos_ID_endereço` on the `clientes` table. All the data in the column will be lost.
  - The primary key for the `enderecos` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `ID_endereço` on the `enderecos` table. All the data in the column will be lost.
  - You are about to drop the column `Enderecos_ID_endereço` on the `locais` table. All the data in the column will be lost.
  - The required column `ID_endereco` was added to the `enderecos` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- DropForeignKey
ALTER TABLE `clientes` DROP FOREIGN KEY `clientes_Enderecos_ID_endereço_fkey`;

-- DropForeignKey
ALTER TABLE `locais` DROP FOREIGN KEY `locais_Enderecos_ID_endereço_fkey`;

-- AlterTable
ALTER TABLE `clientes` DROP COLUMN `Enderecos_ID_endereço`,
    ADD COLUMN `Enderecos_ID_endereco` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `enderecos` DROP PRIMARY KEY,
    DROP COLUMN `ID_endereço`,
    ADD COLUMN `ID_endereco` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`ID_endereco`);

-- AlterTable
ALTER TABLE `locais` DROP COLUMN `Enderecos_ID_endereço`;

-- AddForeignKey
ALTER TABLE `clientes` ADD CONSTRAINT `clientes_Enderecos_ID_endereco_fkey` FOREIGN KEY (`Enderecos_ID_endereco`) REFERENCES `enderecos`(`ID_endereco`) ON DELETE SET NULL ON UPDATE CASCADE;
