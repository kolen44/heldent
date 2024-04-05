
<h1><a href='https://ilyas-organization-8.gitbook.io/untitled'>Читать официальную документацию</a> </h1>
<div align="center">

  <h1 align="center">Документация ниже лишь краткое пособие по запуску контейнеров в Docker</h1>

  <p align="center">
    ### Через контейнеры

Чтобы запустить сервер вместе с клиентом - нужно запустить контейнеры. Сделать это можно таким способом:

```bash
docker compose -f "docker-compose.yml" up -d --build
```

Далее зайдя по этой ссылке - [http://localhost:3000](http://localhost:3000) получаем сайт.

### Запуск в локально сети

Для запуска server + client, нужно вводить команды в разных терминалах и из корневой папки.

Запускаем сервер с помощью npm:

```bash
cd server
npm run start:dev
```

Запускаем клиент с помощью npm:

```bash
cd client
npm run dev
```

Далее заходим по ссылке [http://localhost:3000](http://localhost:3000) и получаем сайт.
  </p>
</div>
