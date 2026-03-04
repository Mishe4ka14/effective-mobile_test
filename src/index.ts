import "reflect-metadata";
import app from "./app.js";
import { AppDataSource } from "./data-source.js";
import { config } from "./config.js";

const PORT = config.port;

AppDataSource.initialize()
    .then(() => {
        app.listen(PORT, () => {});
    })
    .catch((err) => {
        console.error("Ошибка подключения к базе данных:", err);
        process.exit(1);
    });