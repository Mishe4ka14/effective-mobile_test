import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./entities/User.js";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres", 
  password: "admin",
  database: "user_test", 
  synchronize: true,
  logging: ["error", "warn", "schema"],
  entities: [User], 
  migrations: [],
  subscribers: [],
});