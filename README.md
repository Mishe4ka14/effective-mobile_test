# User Service API

RESTful API сервис для управления пользователями с аутентификацией и авторизацией. Разработан в рамках тестового задания.

## Содержание
- [Технологии](#технологии)
- [Функциональность](#функциональность)
- [Установка и запуск](#установка-и-запуск)
- [Переменные окружения](#переменные-окружения)

## Технологии

- **Node.js** (v18+)
- **Express** — веб-фреймворк
- **TypeScript** — типизация
- **PostgreSQL** — база данных
- **TypeORM** — ORM для работы с БД
- **JWT** — аутентификация
- **Bcrypt** — хеширование паролей

## Функциональность

- Регистрация нового пользователя (с выдачей JWT токена)
- Авторизация (логин) с получением JWT токена
- Получение информации о пользователе по ID (доступ: админ или сам пользователь)
- Получение списка всех пользователей (только для админа)
- Блокировка пользователя (доступ: админ или сам пользователь)
- Разблокировка пользователя (только для админа)
- Централизованная обработка ошибок
- Валидация входных данных
- Защита маршрутов middleware

## Установка и запуск

### Предварительные требования
- Node.js v18 или выше
- PostgreSQL 12 или выше
- npm или yarn

### Пошаговая установка

1. **Клонировать репозиторий**

git clone https://github.com/Mishe4ka14/effective-mobile_test.git
cd effective-mobile_test

2. **Установить зависимости**
npm install

3. **Создать базу данных**
```SQL
CREATE DATABASE user_service_db;
```
4. **Настроить подключение к БД**

    Отредактируйте src/data-source.ts под ваши параметры:
```TypeScript
username: "postgres",
password: "ваш_пароль",
database: "user_service_db",
```
5. **Запустить в редиме разработки**

npm run dev

6. **Создать файл .env в корне проекта**

```env

# Server
PORT=3000
NODE_ENV=development

# JWT
JWT_SECRET=your-super-secret-key-change-this
JWT_EXPIRES_IN=24h

# Database
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_NAME=user_service_db
```

## Скрипты

    npm run dev — запуск в режиме разработки (с hot-reload)

    npm run build — компиляция TypeScript в JavaScript

    npm start — запуск скомпилированной версии

    npm run typeorm — запуск TypeORM CLI