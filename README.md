# Self-documenting-API

Esta aplicação é uma API REST construída com Fastify, que utiliza o Zod para validação de esquemas e geração de documentação automática com Swagger. A estrutura da aplicação é a seguinte:

- src/server.ts: Configura o servidor Fastify, incluindo a configuração de CORS, validação e serialização de esquemas com Zod, e a documentação da API com Swagger. Registra as rotas definidas no arquivo routes.ts e inicia o servidor na porta 3000.

- src/routes.ts: Define as rotas da API, incluindo a obtenção de todos os usuários (GET /users) e a criação de um novo usuário (POST /users). Utiliza o Zod para definir os esquemas de validação das requisições e respostas.

- src/types.ts: Define o tipo FastifyTypedInstance, que é uma instância do Fastify configurada para usar o Zod como provedor de tipos.

O propósito principal da aplicação é fornecer uma API REST auto-documentada para gerenciar usuários, com validação de dados e documentação automática.

## Acesse a documentação [swagger](http://localhost:3000/docs) pelo navegador em `/docs`

## Também é possível obter o swagger em [JSON](http://localhost:3000/docs/json) para o [editor.swagger.io](https://editor.swagger.io) em `/docs/json`
