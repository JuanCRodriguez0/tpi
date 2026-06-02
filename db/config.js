import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const sequelize = new Sequelize({
    dialect: 'postgres',
    host:process.env.DB_HOST,
    username:process.env.DB_USER,
    database:process.env.DB_NAME,
    password:process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
})

export default sequelize;