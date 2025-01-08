import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize({
    dialect: "postgres",
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    port: Number(process.env.DB_PORT) || 5432,
    logging: process.env.NODE_ENV === "test" ? console.log : false,
});

//export const initializeDatabase = async () => {
//  try {
//    await sequelize.authenticate();
//  if (process.env.NODE_ENV !== 'test') {
//    console.log("Database connection established successfully.");
//}
// } catch (err: any) {
//   console.error("Unable to connect to the database.");
//  console.error(err.message);
// }
//};

sequelize.authenticate()
    .then(() => {
        console.log("Database connection established successfully.");
    })
    .catch((err: Error) => {
        console.error("Unable to connect to the database.");
        console.error(err.message);
    });
export default sequelize;

/* sequelize.authenticate()
 .then(() => {
     console.log("Database connection established successfully.");
 })
 .catch((err: Error) => {
     console.error("Unable to connect to the database.");
     console.error(err.message);
 });*/
/*sequelize.sync({ alter: true }) // `alter: true` updates schema without dropping tables
    .then(() => {
        console.log("Database schema synchronized.");
    })
    .catch((err: Error) => {
        console.error("Failed to synchronize the database schema.");
        console.error(err.message);
    });*/

