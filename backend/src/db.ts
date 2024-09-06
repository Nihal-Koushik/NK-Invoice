import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();
const sequelize = new Sequelize({
    dialect: 'postgres',
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    port: Number(process.env.DB_PORT) || 5432,
});
sequelize.authenticate()
    .then(() => {
        console.log("Database connection established successfully.");
    })
    .catch((err: Error) => {
        console.error("Unable to connect to the database:", err);
    });
export default sequelize;
