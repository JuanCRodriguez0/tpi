import { Model, DataTypes } from "sequelize";
import sequelize from "../db/config.js";

class PublicationInterest extends Model {}

PublicationInterest.init(
    {
        idInterest: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        idUser: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        idPublication: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        sequelize,
        tableName: "publicationInterests",
        timestamps: true,
    }
);

export default PublicationInterest;