import "reflect-metadata";
import app from "./app.js";
import { AppDataSource } from "./data-source.js";

const PORT = process.env.PORT || 3000;

// console.log("⏳ Инициализация подключения к базе данных...");

AppDataSource.initialize()
  .then(() => {
    // console.log("✅ Подключение к базе данных успешно установлено");
    
    app.listen(PORT, () => {
    //   console.log(`🚀 Сервер запущен на http://localhost:${PORT}`);
    //   console.log(`🔍 Health check: http://localhost:${PORT}/health`);
    //   console.log(`📝 Регистрация: POST http://localhost:${PORT}/api/auth/register`);
    });
  })
  .catch((_err) => {
    // console.error("❌ Ошибка подключения к базе данных:", err);
    process.exit(1);
  });