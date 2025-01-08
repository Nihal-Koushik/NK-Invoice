import sequelize from '../db';
import { Model, DataTypes } from 'sequelize';


class itemsDetails extends Model {
    public id!: number;
    public itemsName!: string;
    public quantity!: number;
    public rate!: number;
    public invoiceId!: number;

    static associate(models: any) {
        itemsDetails.belongsTo(models.Invoice, {
            foreignKey: 'invoiceId',
            as: 'invoice',
        });
    }
}

itemsDetails.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        itemsName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        rate: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        invoiceId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'invoices',
                key: 'id',
            },
        },
    },
    {
        sequelize,
        tableName: 'itemsDetails',
        timestamps: true,
    }

);

export default itemsDetails;