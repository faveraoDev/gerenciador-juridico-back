-- CreateTable
CREATE TABLE `Usuarios` (
    `ID_usuario` VARCHAR(191) NOT NULL,
    `NOME_usuario` VARCHAR(191) NOT NULL,
    `EMAIL_usuario` VARCHAR(191) NOT NULL,
    `SENHA_usuario` VARCHAR(191) NOT NULL,
    `criado_em` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `atualizado_em` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Usuarios_EMAIL_usuario_key`(`EMAIL_usuario`),
    PRIMARY KEY (`ID_usuario`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
