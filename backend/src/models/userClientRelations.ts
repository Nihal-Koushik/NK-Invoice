import sequelize from '../db';
import { Model, DataTypes } from 'sequelize';

class userClientRelations extends Model {
    public id!: number;
    public userId!: number;
    public clientId!: number;

    static associate(models: any) {
        userClientRelations.belongsTo(models.User, {
            foreignKey: 'userId',
            as: 'user',
        });
        userClientRelations.belongsTo(models.Client, {
            foreignKey: 'clientId',
            as: 'client',
        });
    }
}

userClientRelations.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        userId: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            references: {
                model: 'users',
                key: 'id',
            }
        },
        clientId: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            references: {
                model: 'clients',
                key: 'id',
            }
        },
    },
    {
        sequelize,
        tableName: 'userClientRelations',
        timestamps: true,
    }
);
export default userClientRelations;