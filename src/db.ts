import { Sequelize } from "sequelize";

const dataBase = new Sequelize('authservice', 'root', 'password', {
    host: 'localhost',
    dialect: 'mysql',
    port: 3307
});

export default dataBase;