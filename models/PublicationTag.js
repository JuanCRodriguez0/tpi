import { Model, DataTypes } from "sequelize";
import sequelize from "../db/config.js";

class PublicationTag extends Model { }

PublicationTag.init(
    {
        idTag : {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        idPublication : {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        sequelize,
        tableName: 'publicationTag',
        timestamps: true,
    }
);

export default PublicationTag;