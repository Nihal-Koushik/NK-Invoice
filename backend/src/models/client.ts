import sequelize from '..\db';
import { Model, DataTypes } from 'sequelize';

class Clients extends Model {
    public id!: number;
    public name!: string;
    public email!: string;
    public address!: string;
    public mobileNumber!: number;
    public GSTIN!: string;
}

Clients.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        address: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        mobileNumber: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
        },
        GSTIN: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    },
    {
        sequelize,
        tableName: 'clients',
        timestamps: true,
    }
);
export default Clients;
