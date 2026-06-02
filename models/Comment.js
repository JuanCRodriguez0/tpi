import { Model, DataTypes } from "sequelize";
import sequelize from "../db/config.js";

class Comment extends Model { }

Comment.init(
    {
        idComment: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        content: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        idUser: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        idPublication: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    },
    {
        sequelize,
        tableName: 'comments',
        timestamps: true,
    }
);

export default Comment;