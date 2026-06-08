import User from "../models/User.js";
import Publication from "../models/Publication.js";
import Follower from "../models/Follower.js";
import Image from "../models/Image.js";
import Ratingg from "../models/Ratingg.js";
import Tag from '../models/Tag.js';

export async function myProfile(req, res) {

    try {
        const userId = req.session.user.id;

        const user = await User.findByPk(userId, {
            attributes: ['idUser', 'userName', 'name', 'lastName', 'description', 'profilePhoto'],
            include: [
                {
                    model: User,
                    as: 'followers',
                    attributes: ['idUser', 'userName', 'name', 'lastName', 'profilePhoto']
                },
                {
                    model: User,
                    as: 'following',
                    attributes: ['idUser', 'userName', 'name', 'lastName', 'profilePhoto']
                }
            ]
        });

        const followers = await Follower.count({
            where: {
                idFollowed: userId
            }
        });
        const following = await Follower.count({
            where: {
                idFollower: userId
            }
        });

        const publications = await Publication.findAll({
            where: {
                idUser: userId
            },
            include: [
                { model: Image, attributes: ['idImage', 'image'] },
                { model: Tag, attributes: ['idTag', 'name'] }
            ],
            order: [['createdAt', 'DESC']]
        });

        res.render('profile', {
            user,
            isFollowing: false,
            followers,
            following,
            followersList: user.followers,
            followingList: user.following,
            publications
        });

    } catch (error) {
        console.error("Error en mi perfil:", error);
        res.status(500).send("Error interno");
    }
}

export async function otherProfile(req, res) {

    try {
        const userId = req.params.idUser;
        const loggedInUserId = req.session.user.id;

        if (parseInt(userId) === loggedInUserId) {
            return res.redirect('/profile');
        }

        const user = await User.findByPk(userId, {
            attributes: ['idUser', 'userName', 'name', 'lastName', 'description', 'profilePhoto'],
            include: [
                {
                    model: User,
                    as: 'followers',
                    attributes: ['idUser', 'userName', 'name', 'lastName', 'profilePhoto']
                },
                {
                    model: User,
                    as: 'following',
                    attributes: ['idUser', 'userName', 'name', 'lastName', 'profilePhoto']
                }
            ]
        });

        if (!user) return res.status(404).send("Usuario no encontrado");

        const followers = await Follower.count({
            where: {
                idFollowed: userId
            }
        });
        const following = await Follower.count({
            where: {
                idFollower: userId
            }
        });

        const publications = await Publication.findAll({
            where: {
                idUser: userId
            },
            include: [
                { model: Image, attributes: ['idImage', 'image'] },
                { model: Tag, attributes: ['idTag', 'name'] }
            ],
            order: [['createdAt', 'DESC']]
        });

        const followRecord = await Follower.findOne({
            where: { idFollower: loggedInUserId, idFollowed: Number(userId) }
        });

        const isFollowing = followRecord !== null;

        res.render('profile', {
            user,
            isFollowing,
            followers,
            following,
            followersList: user.followers,
            followingList: user.following,
            publications
        });

    } catch (error) {
        console.error("Error en perfil ajeno:", error);
        res.status(500).send("Error interno");
    }
}

export const followUser = async (req, res) => {
    try {
        const followerId = req.session.user.id;
        const followedId = req.params.idUser;

        if (followerId === parseInt(followedId)) {
            return res.redirect(`/profile/${followedId}`);
        }

        await Follower.create({
            idFollower: followerId,
            idFollowed: followedId
        });

        res.redirect(`/profile/${followedId}`)
    } catch (error) {
        console.error("Error al seguir al usuario: ", error);
        res.status(500).send("Error interlo del servidor");
    }
};

export const unfollowUser = async (req, res) => {
    try {
        const followerId = req.session.user.id;
        const followedId = req.params.idUser;

        await Follower.destroy({
            where: {
                idFollower: followerId,
                idFollowed: followedId
            }
        });

        res.redirect(`/profile/${followedId}`);
    } catch (error) {
        console.error("Error al dejar de seguir:", error);
        res.status(500).send("Error interno del servidor");
    }
};

export const editProfile = async (req, res) => {

    try {
        const userId = req.session.user.id;
        const { name, lastName, description, profilePhoto } = req.body;

        const updateData = { name, lastName, description };

        if (profilePhoto) {
            updateData.profilePhoto = Buffer.from(profilePhoto, 'base64');
        }

        await User.update(updateData, { where: { idUser: userId } });

        req.session.user.name = name;
        req.session.user.lastName = lastName;

        res.redirect('/profile');
    } catch (error) {
        console.error("Error al editar perfil:", error);
        res.status(500).send("Error interno");
    }
};