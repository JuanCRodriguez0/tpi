import {DataTypes, Model} from "sequelize";
import sequelize from "../db/config.js";

class PublicationReport extends Model{};

PublicationReport.init(
    {
        idPublicationReport: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        reason: {
            type: DataTypes.STRING,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false
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
        tableName: 'publicationReports',
        timestamps: true,
    }
);


export default PublicationReport;