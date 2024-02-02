import { Sequelize, DataTypes, Model, InferCreationAttributes, InferAttributes, Optional } from "sequelize";
import dataBase from "../db";

type UserAttributes = {
    id: number,
    username: string,
    password: string,
    email: string
}

type UserCreationAttributes = Optional<UserAttributes, 'id'>;

class User extends Model<UserAttributes, UserCreationAttributes> {
    declare id: number;
}

User.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    username: {
        type: "varchar(64)",
        allowNull: false,
        primaryKey: true
    },
    password: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }
}, {
    sequelize: dataBase,
    modelName: 'users'
});

export default User;