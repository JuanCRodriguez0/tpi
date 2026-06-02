import { Model, DataTypes } from "sequelize";
import sequelize from "../db/config.js";

class Image extends Model { }

Image.init(
    {
        idImage: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        image: {
            type: DataTypes.BLOB,
        },
        copyright: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        watermark: {
            type: DataTypes.STRING,
            defaultValue: '',
        },
        idPublication: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    },
    {
        sequelize,
        tableName: 'images',
        timestamps: true,
    }
);

export default Image;