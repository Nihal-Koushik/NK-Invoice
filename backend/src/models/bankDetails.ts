import sequelize from '../db';
import { Model, DataTypes } from 'sequelize';

class bankDetails extends Model {
    public id!: number;
    public accountNumber!: number;
    public ifsc!: string;
    public bankName!: string;
    public userId!: number;

    static associate(models: any) {
        bankDetails.belongsTo(models.User, {
            foreignKey: 'userId',
            as: 'user',
        });
    }
}

bankDetails.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        accountNumber: {
            type: DataTypes.BIGINT.UNSIGNED,
            allowNull: false,
        },
        ifsc: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        bankName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        userId: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            references: {
                model: 'users',
                key: 'id',
            },
        },
    },
    {
        sequelize,
        tableName: 'bankDetails',
        timestamps: true,
    }
);
export default bankDetails;