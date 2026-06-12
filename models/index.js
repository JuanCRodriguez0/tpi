import sequelize from "../db/config.js"

import User from "./User.js";
import Tag from "./Tag.js";
import Publication from "./Publication.js";
import Image from "./Image.js";
import Comment from "./Comment.js";
import Ratingg from "./Ratingg.js";
import PublicationTag from "./PublicationTag.js";
import PublicationReport from "./PublicationReport.js";
import Follower from "./Follower.js";
import Message from "./Message.js";
import PublicationInterest from "./PublicationInterest.js";


// Users tiene 1 o muchas Publication
User.hasMany(Publication, {foreignKey: 'idUser'})
Publication.belongsTo(User, {foreignKey: 'idUser'});


// Publication tiene 1 o muchas etiquetas && Tag tiene muchas Publication
Publication.belongsToMany(Tag, { through: PublicationTag, foreignKey: 'idPublication'});
Tag.belongsToMany(Publication, { through: PublicationTag, foreignKey: 'idTag'});

// Publication tiene 1 o muchas Image
Publication.hasMany(Image, {foreignKey: 'idPublication'});
Image.belongsTo(Publication, {foreignKey: 'idPublication'});

// Publication tiene 0 o muchos Comment
Publication.hasMany(Comment, {foreignKey: 'idPublication'});
Comment.belongsTo(Publication, {foreignKey: 'idPublication'});

// Users escribe 0 o muchos Comment
User.hasMany(Comment, {foreignKey: 'idUser'});
Comment.belongsTo(User, {foreignKey: 'idUser'});

// Image tiene 0 o muchos Rating
Image.hasMany(Ratingg, {foreignKey: 'idImage'});
Ratingg.belongsTo(Image, {foreignKey: 'idImage'});

// Users hace 0 o muchos Rating
User.hasMany(Ratingg, {foreignKey: 'idUser'});
Ratingg.belongsTo(User, {foreignKey: 'idUser'});

// Users puede seguir 0 o muchos users
User.belongsToMany(User, {
    through: Follower,
    as: 'following',
    foreignKey: 'idFollower',
    otherKey: 'idFollowed',
});
User.belongsToMany(User,{
    through: Follower,
    as: 'followers',
    foreignKey: 'idFollowed',
    otherKey: 'idFollower',
});

// User manda Message 
User.hasMany(Message, {foreignKey: 'idSender', as: 'sentMessages'});
Message.belongsTo(User, {foreignKey: 'idSender', as: 'sender'});

// User recibe Message
User.hasMany(Message, {foreignKey: 'idReceiver', as: 'receivedMessages'});
Message.belongsTo(User, {foreignKey: 'idReceiver', as: 'receiver'});

// Publication tiene PublicationReport
Publication.hasMany(PublicationReport, {foreignKey: 'idPublication'});
PublicationReport.belongsTo(Publication, {foreignKey: 'idPublication'});

// Users hace PublicationReport
User.hasMany(PublicationReport, {foreignKey: 'idUser'});
PublicationReport.belongsTo(User, {foreignKey: 'idUser'});

// Users tiene 0 o muchos interest
User.belongsToMany(Publication, {
    through: PublicationInterest,
    foreignKey: "idUser"
});

Publication.belongsToMany(User, {
    through: PublicationInterest,
    foreignKey: "idPublication"
});


