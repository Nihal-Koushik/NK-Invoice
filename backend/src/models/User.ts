import sequelize from '../db';
import { Model, DataTypes } from 'sequelize';

class User extends Model {
    public id!: number;
    public username!: string;
    public password!: string;
    public email!: string;
    public mobileNumber!: string;
    public isActive!: boolean;
}

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        mobileNumber: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        isActive: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true,
        }
    },
    {
        sequelize,
        tableName: 'users',
        timestamps: true,
    }
);
export default User;