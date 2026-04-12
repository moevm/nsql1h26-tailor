# nosql_template

## Содержание
- [nosql\_template](#nosql_template)
  - [Содержание](#содержание)
  - [Предварительная проверка заданий](#предварительная-проверка-заданий)
  - [Подготовка к запуску](#подготовка-к-запуску)
  - [Запуск приложения](#запуск-приложения)
    - [Запуск приложения с Docker Compose](#запуск-приложения-с-docker-compose)
    - [Запуск приложения без Docker](#запуск-приложения-без-docker)
      - [Подготовка к запуску](#подготовка-к-запуску-1)
      - [Запуск локально в production режиме](#запуск-локально-в-production-режиме)
      - [Запуск локально в development режиме](#запуск-локально-в-development-режиме)
  - [Проверка работоспособности](#проверка-работоспособности)
    - [Docker Compose](#docker-compose)
    - [Локальный запуск](#локальный-запуск)

## Предварительная проверка заданий

<a href=" ./../../../actions/workflows/1_helloworld.yml" >![1. Согласована и сформулирована тема курсовой]( ./../../actions/workflows/1_helloworld.yml/badge.svg)</a>

<a href=" ./../../../actions/workflows/2_usecase.yml" >![2. Usecase]( ./../../actions/workflows/2_usecase.yml/badge.svg)</a>

<a href=" ./../../../actions/workflows/3_data_model.yml" >![3. Модель данных]( ./../../actions/workflows/3_data_model.yml/badge.svg)</a>

<a href=" ./../../../actions/workflows/4_prototype_store_and_view.yml" >![4. Прототип хранение и представление]( ./../../actions/workflows/4_prototype_store_and_view.yml/badge.svg)</a>

<a href=" ./../../../actions/workflows/5_prototype_analysis.yml" >![5. Прототип анализ]( ./../../actions/workflows/5_prototype_analysis.yml/badge.svg)</a> 

<a href=" ./../../../actions/workflows/6_report.yml" >![6. Пояснительная записка]( ./../../actions/workflows/6_report.yml/badge.svg)</a>

<a href=" ./../../../actions/workflows/7_app_is_ready.yml" >![7. App is ready]( ./../../actions/workflows/7_app_is_ready.yml/badge.svg)</a>

## Подготовка к запуску

- Убедитесь, что у вас установлен Docker, Docker Compose и Git.
- Клонируйте репозиторий с помощью команды:

    ```bash
    git clone https://github.com/moevm/nsql1h26-tailor.git
    ```

- Перейдите в директорию проекта:

    ```bash
    cd nsql1h26-tailor
    ```

## Запуск приложения

### Запуск приложения с Docker Compose

- Запустите приложение с помощью Docker Compose (убедитесь, что порты 8080 и 3000 свободны):

    ```bash
    docker compose up --build
    ```

- Перейдите в раздел [Проверка работоспособности](#проверка-работоспособности)

### Запуск приложения без Docker

#### Подготовка к запуску
- Убедитесь, что у вас установлены:
  - [Node.js 24.14.1](https://nodejs.org/en/download/)
  - [Pnpm 10.30.0](https://pnpm.io/installation)
  - [MongoDB 8.2.5](https://www.mongodb.com/try/download/community)

- Установите зависимости для backend и frontend:

    ```bash
    pnpm i
    ```

- Отредактируйте файл `.env` в корне проекта:

    ```env
    MONGO_HOST=localhost
    MONGO_PORT=27017
    ```

- Если авторизация в MongoDB включена, добавьте следующие переменные в `.env` (иначе, уберите):

    ```env
    MONGO_USER=your_username
    MONGO_PASSWORD=your_password
    ```

- Запустите MongoDB в вашей системе

#### Запуск локально в production режиме

- Запустите приложение (убедитесь, что порты 8080 и 3000 свободны):

    ```bash
    pnpm build && pnpm preview
    ```

#### Запуск локально в development режиме

- Запустите приложение в режиме разработки (убедитесь, что порты 8080 и 3000 свободны):

    ```bash
    pnpm dev
    ```

## Проверка работоспособности

### Docker Compose
1. Подождите инициализации всех контейнеров. Зайдите по адресу http://127.0.0.1:8080 в браузере, чтобы увидеть запущенное приложение.
2. Проверьте, что на момент запуска http://127.0.0.1:8080 и http://127.0.0.1:3000 не заняты другими приложениями и контейнерами.

### Локальный запуск
1. Убедитесь, что MongoDB запущен и доступен по адресу, указанному в файле `.env`.
2. Зайдите по адресу http://127.0.0.1:8080 в браузере, чтобы увидеть запущенное приложение.
3. Проверьте, что на момент запуска http://127.0.0.1:8080 и http://127.0.0.1:3000 не заняты другими приложениями.