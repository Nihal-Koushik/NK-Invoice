import sequelize from '..\db';
import { Model, DataTypes } from 'sequelize';


class itemsDetails extends Model {
    public id!: number
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
        itemsName: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
        },
        quantity: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
        },
        rate: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
        },
        invoiceId: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            references: {
                model: 'invoices',
                key: 'id'
            },
        },
    },
    {
        sequelize,
        tableName: 'items',
        timestamps: true,
    }

);

export default itemsDetails;