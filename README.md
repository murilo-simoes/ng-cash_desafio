# NG-CASH Desafio

Meu nome é Murilo Rodrigues Simões e este é o teste para vaga de desenvolvedor front-end junior no NG-CASH

## Instalação do Projeto

Para a instalação projeto é necessário ter o Docker instalado no computador.

Para começar a Instalação, execute o seguinte comando no seu terminal localizado na pasta raiz do projeto.

Esse comando abrirá o terminal na pasta server.

```bash
  cd server
```

Depois de entrar na pasta server, execute o seguinte comando para criar os containers no Docker:

```bash
  docker-compose up
```

Depois de terminar a instalação dos containers, navegue até o Docker e verifique o container dockerized-prisma-postgres-api em execução.

Em seguida, passe o mouse sobre o prisma-postgres-api e abra a API integrada do Docker.

Isso iniciará uma CLI interativa para executar seus comandos de API. Nesse caso, você deverá executar o seguinte comando para sincronizar o banco de dados com o esquema que você criou:

```bash
  npx prisma migrate dev
```

Esse comando irá instalar tudo que é necessário para o projeto funcionar perfeitamente.

Depois de terminar a instalação, abra a URL http://localhost:3000 para vizualizar a aplicação.
