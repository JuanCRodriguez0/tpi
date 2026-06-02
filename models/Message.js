import { Model, DataTypes } from "sequelize";
import sequelize from "../db/config.js";

class Message extends Model {};

Message.init(
    {
        idMessage: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        idSender: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        idReceiver: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        messageText: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
    },
    {
        sequelize,
        tableName: 'message',
        timestamps: true
    },
);

export default Message;