-- CreateTable
CREATE TABLE `Advogados` (
    `ID_advogado` VARCHAR(191) NOT NULL,
    `NOME_advogado` VARCHAR(191) NULL,
    `CPF_advogado` VARCHAR(191) NULL,
    `OAB_advogado` VARCHAR(191) NULL,
    `DTNSC_advogado` DATETIME(3) NULL,
    `EMAIL_advogado` VARCHAR(191) NULL,

    PRIMARY KEY (`ID_advogado`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `clientes` (
    `ID_cliente` VARCHAR(191) NOT NULL,
    `NOME_cliente` VARCHAR(191) NOT NULL,
    `CPF_cliente` VARCHAR(191) NULL,
    `EMAIL_cliente` VARCHAR(191) NULL,
    `Enderecos_ID_endereço` VARCHAR(191) NULL,

    PRIMARY KEY (`ID_cliente`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Processos` (
    `ID_processo` VARCHAR(191) NOT NULL,
    `NUMERO_processo` VARCHAR(191) NULL,
    `DESCRICAO` VARCHAR(191) NULL,
    `STATUS` VARCHAR(191) NULL,
    `Locais_ID_local` VARCHAR(191) NULL,

    PRIMARY KEY (`ID_processo`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Documentos` (
    `ID_documento` VARCHAR(191) NOT NULL,
    `NOME_documento` VARCHAR(191) NULL,
    `TIPO_documento` VARCHAR(191) NULL,

    PRIMARY KEY (`ID_documento`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Documentos_has_Processos` (
    `Documentos_ID_documento` VARCHAR(191) NOT NULL,
    `Processos_ID_processo` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`Documentos_ID_documento`, `Processos_ID_processo`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Processos_has_Clientes` (
    `Processos_ID_processo` VARCHAR(191) NOT NULL,
    `Clientes_ID_cliente` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`Processos_ID_processo`, `Clientes_ID_cliente`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Advogados_has_Processos_has_Clientes` (
    `Advogados_ID_advogado` VARCHAR(191) NOT NULL,
    `Processos_ID_processo` VARCHAR(191) NOT NULL,
    `Clientes_ID_cliente` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`Advogados_ID_advogado`, `Processos_ID_processo`, `Clientes_ID_cliente`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `enderecos` (
    `ID_endereço` VARCHAR(191) NOT NULL,
    `RUA` VARCHAR(191) NULL,
    `NUMERO` VARCHAR(191) NULL,
    `BAIRRO` VARCHAR(191) NULL,
    `CIDADE` VARCHAR(191) NULL,
    `ESTADO` VARCHAR(191) NULL,

    PRIMARY KEY (`ID_endereço`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `locais` (
    `ID_local` VARCHAR(191) NOT NULL,
    `NOME_local` VARCHAR(191) NULL,
    `Enderecos_ID_endereço` VARCHAR(191) NULL,

    PRIMARY KEY (`ID_local`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `processos_has_locais` (
    `Processos_ID_processo` VARCHAR(191) NOT NULL,
    `Locais_ID_local` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`Processos_ID_processo`, `Locais_ID_local`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `clientes` ADD CONSTRAINT `clientes_Enderecos_ID_endereço_fkey` FOREIGN KEY (`Enderecos_ID_endereço`) REFERENCES `enderecos`(`ID_endereço`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Processos` ADD CONSTRAINT `Processos_Locais_ID_local_fkey` FOREIGN KEY (`Locais_ID_local`) REFERENCES `locais`(`ID_local`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Documentos_has_Processos` ADD CONSTRAINT `Documentos_has_Processos_Documentos_ID_documento_fkey` FOREIGN KEY (`Documentos_ID_documento`) REFERENCES `Documentos`(`ID_documento`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Documentos_has_Processos` ADD CONSTRAINT `Documentos_has_Processos_Processos_ID_processo_fkey` FOREIGN KEY (`Processos_ID_processo`) REFERENCES `Processos`(`ID_processo`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Processos_has_Clientes` ADD CONSTRAINT `Processos_has_Clientes_Processos_ID_processo_fkey` FOREIGN KEY (`Processos_ID_processo`) REFERENCES `Processos`(`ID_processo`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Processos_has_Clientes` ADD CONSTRAINT `Processos_has_Clientes_Clientes_ID_cliente_fkey` FOREIGN KEY (`Clientes_ID_cliente`) REFERENCES `clientes`(`ID_cliente`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Advogados_has_Processos_has_Clientes` ADD CONSTRAINT `Advogados_has_Processos_has_Clientes_Advogados_ID_advogado_fkey` FOREIGN KEY (`Advogados_ID_advogado`) REFERENCES `Advogados`(`ID_advogado`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Advogados_has_Processos_has_Clientes` ADD CONSTRAINT `Advogados_has_Processos_has_Clientes_Processos_ID_processo__fkey` FOREIGN KEY (`Processos_ID_processo`, `Clientes_ID_cliente`) REFERENCES `Processos_has_Clientes`(`Processos_ID_processo`, `Clientes_ID_cliente`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `locais` ADD CONSTRAINT `locais_Enderecos_ID_endereço_fkey` FOREIGN KEY (`Enderecos_ID_endereço`) REFERENCES `enderecos`(`ID_endereço`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `processos_has_locais` ADD CONSTRAINT `processos_has_locais_Processos_ID_processo_fkey` FOREIGN KEY (`Processos_ID_processo`) REFERENCES `Processos`(`ID_processo`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `processos_has_locais` ADD CONSTRAINT `processos_has_locais_Locais_ID_local_fkey` FOREIGN KEY (`Locais_ID_local`) REFERENCES `locais`(`ID_local`) ON DELETE RESTRICT ON UPDATE CASCADE;
