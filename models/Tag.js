import {DataTypes, Model} from "sequelize";
import sequelize from "../db/config.js";

class Tag extends Model{};

Tag.init(
    {
        idTag: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    },
    {
        sequelize,
        tableName: 'tags',
        timestamps: true,
    }
);


export default Tag;