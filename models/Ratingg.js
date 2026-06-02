import { Model, DataTypes } from "sequelize";
import sequelize from "../db/config.js";

class Ratingg extends Model {}

Ratingg.init(
    {
        idRating : {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        idImage: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        idUser: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        score: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        sequelize,
        tableName: 'rating',
        timestamps: true,
    },
);

export default Ratingg;