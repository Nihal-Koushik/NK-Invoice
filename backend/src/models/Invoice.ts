import sequelize from '..\db';
import { Model, DataTypes } from 'sequelize';

class Invoice extends Model {
    public id!: number;
    public invoiceNumber!: string;
    public dueDate!: string;
    public clientId!: number;

    static associate(models: any) {
        Invoice.belongsTo(models.Clients, {
            foreignKey: 'clientId',
            as: 'client',
        });
    }
}
Invoice.init({
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
    },
    invoiceNumber: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    dueDate: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    clientId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
            model: 'clients',
            key: 'id',
        },
    },
},
    {
        sequelize,
        tableName: 'invoices',
        timestamps: true,
    }
);
export default Invoice;