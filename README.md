# GAJ – Gerenciador de Arquivos Jurídicos ⚖️📂

## Backend API – Node.js & TypeScript

## Developed by faveraoDev 🧑🏻‍💻

---

## EN 🇺🇸

## Overview 🌐

GAJ (Gerenciador de Arquivos Jurídicos) is a REST backend API designed to support
a legal document management system used exclusively by lawyers.

The system focuses on organizing and managing **clients, legal cases, documents, and related data**,
providing a secure and structured backend foundation for legal workflows.

## Main Features 📌

- User authentication and authorization using JWT
- Management of lawyers and clients
- Legal case (process) registration and tracking
- Document management associated with cases
- Address and location management
- Protected API endpoints with authentication middleware
- API documentation via Swagger

## Architecture 🏗️

The project follows a **layered and responsibility-oriented architecture**, separating concerns clearly:

- **Routes**: HTTP endpoints and route grouping
- **Controllers**: Request handling and business logic
- **Middleware**: Authentication and request validation
- **Database Layer**: Prisma ORM for data access
- **Configuration**: Environment variables and server setup

This structure improves maintainability, readability, and scalability.

## Authentication & Security 🔐

- JWT-based authentication
- Public routes limited to user registration and login
- All internal API routes protected by authentication middleware
- Secure access to sensitive legal data
- Environment-based configuration for secrets and credentials

## Data Model 📊

The backend models a real-world legal domain, including:

- Users
- Lawyers
- Clients
- Addresses
- Legal Cases
- Documents
- Locations

All relationships are defined using **Prisma Schema**, with full migration history maintained.

## API Documentation 📖

The API is documented using **Swagger**, providing an interactive interface to explore endpoints.

- Swagger UI available at:  
  `/api-docs`

## Getting Started 🚀

### Prerequisites

- Node.js (LTS recommended)
- MySQL
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
3. Configure environment variables:
   ```bash
   cp .env.example .env
4. Configure database credentials in .env
5. Run database migrations:
   ```bash
   npx prisma migrate dev
6. Start the development server:
   ```bash
   npm run dev

The API will be available at:  
`http://localhost:4000`

## Stack

![Badge com logo Node.js](https://img.shields.io/badge/Node.js-339933?logo=node.js&logoColor=white)  – Node.js  
![Badge com logo TypeScript](https://shields.io/badge/TypeScript-3178C6?logo=TypeScript&logoColor=FFF)  – TypeScript  
![Badge com logo Swagger](https://img.shields.io/badge/-Swagger-85EA2D?style=flat&logo=swagger&logoColor=white)  – Swagger OpenAPI  
![Badge com logo JWT](https://img.shields.io/badge/JWT-black?style=plastic&logo=JSON%20web%20tokens)  – JWT (JSON Web Token)  
![Badge com logo Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)  – Prisma ORM  

---

## PT-BR 🇧🇷

## Visão Geral 🌐

O GAJ (Gerenciador de Arquivos Jurídicos) é uma API REST desenvolvida para dar suporte
a um sistema de gestão jurídica utilizado exclusivamente por advogados.

O sistema tem como foco a **organização e o gerenciamento de clientes, processos,
documentos e dados relacionados**, oferecendo uma base backend segura e estruturada
para fluxos de trabalho jurídicos.

## Funcionalidades Principais 📌

- Autenticação e autorização de usuários via JWT
- Gerenciamento de advogados e clientes
- Cadastro e acompanhamento de processos jurídicos
- Gerenciamento de documentos vinculados a processos
- Gerenciamento de endereços e locais
- Rotas protegidas por middleware de autenticação
- Documentação da API via Swagger

## Arquitetura 🏗️

O projeto segue uma arquitetura **em camadas e orientada à separação de responsabilidades**:

- **Routes**: Definição das rotas HTTP
- **Controllers**: Lógica de negócio e tratamento das requisições
- **Middleware**: Autenticação e validações
- **Camada de Dados**: Prisma ORM
- **Configuração**: Variáveis de ambiente e configuração do servidor

Essa abordagem facilita a manutenção, evolução e escalabilidade do sistema.

## Autenticação & Segurança 🔐

- Autenticação baseada em JWT
- Rotas públicas restritas ao cadastro e login de usuários
- Todas as rotas internas protegidas por middleware de autenticação
- Acesso seguro a dados jurídicos sensíveis
- Informações sensíveis isoladas em variáveis de ambiente

## Modelo de Dados 📊

O backend representa um domínio jurídico real, incluindo as seguintes entidades:

- Usuários
- Advogados
- Clientes
- Endereços
- Processos
- Documentos
- Locais

Os relacionamentos são definidos por meio do **Prisma Schema**, com histórico completo
de migrations para controle de evolução do banco de dados.

## Documentação da API 📖

A API conta com documentação interativa utilizando **Swagger**, permitindo explorar
todos os endpoints disponíveis.

- Swagger disponível em:  
  `/api-docs`

## Primeiros Passos 🚀

### Pré-requisitos

- Node.js (versão LTS recomendada)
- MySQL
- npm ou yarn

### Instalação

1. Clone o repositório
2. Instale as dependências:
   ```bash
   npm install
3. Configure as variáveis de ambiente:
   ```bash
   cp .env.example .env
4. Ajuste as credenciais do banco de dados no arquivo .env
5. Execute as migrations:
   ```bash
   npx prisma migrate dev
6. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev

A API estará disponível em:  
`http://localhost:4000`

## Stack

![Badge com logo Node.js](https://img.shields.io/badge/Node.js-339933?logo=node.js&logoColor=white)  – Node.js  
![Badge com logo TypeScript](https://shields.io/badge/TypeScript-3178C6?logo=TypeScript&logoColor=FFF)  – TypeScript  
![Badge com logo Swagger](https://img.shields.io/badge/-Swagger-85EA2D?style=flat&logo=swagger&logoColor=white)  – Swagger OpenAPI  
![Badge com logo JWT](https://img.shields.io/badge/JWT-black?style=plastic&logo=JSON%20web%20tokens)  – JWT (JSON Web Token)  
![Badge com logo Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)  – Prisma ORM  
