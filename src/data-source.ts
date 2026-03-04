import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./entities/User.js";
import { config } from "./config.js";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: config.db.host,
    port: config.db.port,
    username: config.db.username,
    password: config.db.password,
    database: config.db.database,
    synchronize: config.db.synchronize,
    logging: config.nodeEnv === 'development' 
          ? ["error", "warn", "schema"] 
          : ["error"],  
    entities: [User],
    migrations: [],
    subscribers: [],
});