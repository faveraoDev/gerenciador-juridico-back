/*
  Warnings:

  - You are about to drop the column `BAIRRO` on the `enderecos` table. All the data in the column will be lost.
  - You are about to drop the column `CIDADE` on the `enderecos` table. All the data in the column will be lost.
  - You are about to drop the column `ESTADO` on the `enderecos` table. All the data in the column will be lost.
  - You are about to drop the column `RUA` on the `enderecos` table. All the data in the column will be lost.
  - Added the required column `BAIRRO_endereco` to the `enderecos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `CEP_endereco` to the `enderecos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `CIDADE_endereco` to the `enderecos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `LGDR_endereco` to the `enderecos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `NOME_endereco` to the `enderecos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `UF_endereco` to the `enderecos` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `enderecos` DROP COLUMN `BAIRRO`,
    DROP COLUMN `CIDADE`,
    DROP COLUMN `ESTADO`,
    DROP COLUMN `RUA`,
    ADD COLUMN `BAIRRO_endereco` VARCHAR(191) NOT NULL,
    ADD COLUMN `CEP_endereco` VARCHAR(191) NOT NULL,
    ADD COLUMN `CIDADE_endereco` VARCHAR(191) NOT NULL,
    ADD COLUMN `LGDR_endereco` VARCHAR(191) NOT NULL,
    ADD COLUMN `NOME_endereco` VARCHAR(191) NOT NULL,
    ADD COLUMN `UF_endereco` VARCHAR(191) NOT NULL;
