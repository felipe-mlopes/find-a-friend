# Find a Friend Api

## Descrição

Inspirado em um desafio da trilha Node do curso da Rocketseat. 
É uma API Rest para adoção de animais que permite fazer um CRUD de organizações que estão colocando animas para adoção e animais para serem adotados utilizando o framework Fastify do Node.

### Tecnologias utilizadas:
- Node.js
- PostgreSQL
- Docker
- Vitest (testes automatizados)

### Conceitos aplicados:
- Arquitetura MVC;
- SOLID;
- Autenticação via JWT (JSON Web Token);
- Testes unitários e e2e;

### Diagrama do projeto:



## Instalação

### Pré-requisitos:
- NodeJS
- NPM
- Docker
 
### Etapas:
1) Faça o clone do repositório e no terminal navegue até a pasta
2) Instale as dependências do projeto com ``npm install`` 
3) Preencha as variáveis de ambiente no arquivo ``.env``
4) Faça o set up do Prisma com ``npx prisma init``
5) Rode o docker compose com ``docker compose up -d ``
6) Rode o servidor de desenvolvimento com ``npm run dev``

## Instrução de Uso

A API está documentada através do Swagger através da rota:

https://find-a-friend-api-970m.onrender.com/api-docs

## Contribuição

Pull requests são bem-vindos. Para maiores alterações, favor abrir uma issue primeiro para argumentar o que gostaria de implementar no projeto.


## Licença

Esse projeto está sob a licença MIT. Veja o arquivo LICENSE para mais detalhes.
