[![SonarCloud](https://sonarcloud.io/images/project_badges/sonarcloud-orange.svg)](https://sonarcloud.io/dashboard?id=waproject)

[![Bugs](https://sonarcloud.io/api/project_badges/measure?project=waproject&metric=bugs)](https://sonarcloud.io/dashboard?id=waproject)
[![Code Smells](https://sonarcloud.io/api/project_badges/measure?project=waproject&metric=code_smells)](https://sonarcloud.io/dashboard?id=waproject)
[![Coverage](https://sonarcloud.io/api/project_badges/measure?project=waproject&metric=coverage)](https://sonarcloud.io/dashboard?id=waproject)


### Implementações realizadas

  - Adicionei um controller no módulo App chamado Order, juntamente com seu respectivo service e validators
  - Adicionei um endpoint para criação de novo pedido POST(/api/app/order)
  - Configurei rotas para iniciarem com /app
  - Criei novas models para criação de orders e consequentemente suas respectivas migrations seeds e interfaces
  - Criei arquivo de tests para o novo service (order.spec.ts)
  - Configurei o endpoint /api/app/profile para trazer os pedidos do usuário logado (eager load)
  - Adicionei configurações do sonar-qube ao projeto
  - Adicionei as bibliotecas commitzen e cz-conventional-changelog para padronização das mensagens de commit e geração automátizada do CHANGELOG.md

### Modelo ER implementado

![modeloER](https://github.com/DavidMoura07/waproject-backend/blob/master/docs/ER-WA-Project.png)

Criei uma tabela Order que armazena os pedidos feitos pelos usuários, esta tabela esta ligada a uma tabela ItemOrder que correlaciona o produto com o pedido, registrando seu preço de venda e quantidade que são independentes dos preços dos produtos, visto que estes podem mudar. 
Além disso cada pedido possui um status que é definido através de um enum.




WaProject Api Base
==================

[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/f109c9a8c09dd5e648dd)

Utilize o VSCode, já está configurado com sugestão de extensões e debug.

### Tecnologias

* Node/Typescript
* NestJs (Framework)
* Docker
* Objection (ORM) / Knex (Query builder e migrations)
* Mailgun (envio de email)
* AWS (envio de email/s3)
* JWT (tokens)
* Bcrypt (criptografia para senhas)
* Sentry.io (log de erros)
* Pug (templates de email)

### Iniciando um novo projeto

```bash
# install docker https://docs.docker.com/install

git clone git@bitbucket.org:waprojectbase/waproject-base-api.git
yarn install # ou npm install

node ./init.js

[sudo] docker-componse up
# levantará o docker com o banco de dados e a aplicação.
# Ele aplicará as migrations/seeds do banco e depois dará watch nos arquivos
# e iniciará o node com a api
```

### Para mais informações veja a pasta ./docs
