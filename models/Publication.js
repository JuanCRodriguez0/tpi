import { Model, DataTypes } from "sequelize";
import sequelize from "../db/config.js";

class Publication extends Model { }

Publication.init(
    {
        idPublication: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        title: {
            type: DataTypes.STRING,
        },
        description: {
            type: DataTypes.TEXT,
        },
        commentsOpen: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
        },
        status: {
            type: DataTypes.STRING,
            defaultValue: 'Activa' //Activa, eliminada, revision
        },
        idUser: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    },
    {
        sequelize,
        tableName: 'publications',
        timestamps: true,
    },
);


export default Publication;