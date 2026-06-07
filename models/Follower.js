import { Model, DataTypes } from "sequelize";
import sequelize from "../db/config.js";

class Follower extends Model { }

Follower.init(
    {
        idFollower: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        idFollowed: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        sequelize,
        tableName: 'followers',
        timestamps: true,
    },
);

export default Follower;