# 📨 Notification Service

Este é um microserviço desenvolvido em **NestJS** responsável por enviar **notificações via e-mail, SMS e WhatsApp**, integrando com os serviços da **Brevo** e da **WhatsApp Cloud API**. Ele utiliza **RabbitMQ** como sistema de filas para processar mensagens de forma assíncrona e escalável, além de expor métricas e logs com **Winston + Grafana + Loki** para observabilidade.

---

## 🚀 Tecnologias Utilizadas

- **[NestJS](https://nestjs.com/)** – Framework Node.js para aplicações escaláveis.
- **[TypeORM](https://typeorm.io/)** – ORM para TypeScript e JavaScript.
- **[PostgreSQL](https://www.postgresql.org/)** – Banco de dados relacional.
- **[RabbitMQ](https://www.rabbitmq.com/)** – Sistema de mensageria.
- **[Swagger](https://swagger.io/)** – Documentação automática da API REST.
- **[Brevo](https://www.brevo.com/)** – Envio de e-mails e SMS.
- **[WhatsApp Cloud API](https://developers.facebook.com/docs/whatsapp/)** – Envio de mensagens no WhatsApp.
- **[Winston](https://github.com/winstonjs/winston)** – Logger avançado para Node.js.
- **[Grafana + Loki](https://grafana.com/oss/loki/)** – Stack de observabilidade para logs centralizados.

---

## 📐 Arquitetura

O projeto segue uma arquitetura modular e desacoplada, separando as responsabilidades em:

- `Controllers` – Entrada HTTP (REST) para criação de notificações.
- `Services` – Contém a lógica de envio de notificações e orquestração.
- `Queues/Consumers` – Escutam filas RabbitMQ e processam mensagens.
- `Providers` – Integração com APIs externas (Brevo, WhatsApp).
- `Logger` – Centralização de logs com Winston e exportação para Loki.
- `Swagger` – Disponibilização de documentação interativa.

---

## 🧪 Funcionalidades

### ✅ Criação de notificações

Antes de enviar as mensagens, primeiro, é preciso criar as suas contas **Brevo** e **Whatsapp Cloud API** nos endpoints `brevo/create` e `wpp/create`.

- Envio de mensagens via:
  - **E-mail** (Brevo)
  - **SMS** (Brevo)
  - **WhatsApp** (WhatsApp Cloud API)

### ✅ Uso de filas

- Mensagens são publicadas na fila `notifications_queue`.
- Processamento assíncrono com `RabbitMQ`.
- Suporte a prioridades nas mensagens (via `x-max-priority`).

### ✅ Logs estruturados e observabilidade

- Logs formatados com Winston.
- Logs exportados para **Grafana Loki** para visualização centralizada.
- Suporte a labels como `level`, `context`, `timestamp`, etc.
- Integrado com Grafana para visualização dos logs por serviço, tipo de erro, etc.

---

## 📦 Instalação

### Pré-requisitos

- Node.js 18+
- PostgreSQL
- RabbitMQ
- Docker (para Grafana e Loki)

### 1. Clonar o repositório

```bash
git clone https://github.com/seu-usuario/notification-service.git
cd notification-service
```

### 2. Instalar dependências

```bash
yarn install
```

### 3. Criar arquivo .env

```bash
JWT_SECRET=sua_chave_jwt
ENCRYPTION_SECRET="encryption_key"
```

### 5. Execute o projeto

```bash
yarn start:dev
```
