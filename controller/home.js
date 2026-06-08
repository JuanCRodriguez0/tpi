import User from "../models/User.js";
import Publication from "../models/Publication.js";
import Follower from "../models/Follower.js";
import Image from "../models/Image.js";
import Ratingg from "../models/Ratingg.js";
import Tag from '../models/Tag.js';
import { Op } from "sequelize";
import sequelize from '../db/config.js';
import Comment from '../models/Comment.js';


export async function home(req, res) {

    const userId = req.session.user.id;

    const following = await Follower.findAll({
        where: {
            idFollower: userId
        },
        attributes: ['idFollowed']
    });

    // Pasa de [{idFollowed: ID}, {...}] a [ID1,ID2,...]
    const followingIds = following.map(f =>
        f.idFollowed
    );

    followingIds.push(Number(userId));


    const publications = await Publication.findAll({
        where: { idUser: followingIds },
        include: [
            { model: User, attributes: ['userName', 'profilePhoto'] },
            { model: Image, attributes: ['idImage', 'image', 'copyright'] },
            { model: Tag, attributes: ['idTag', 'name'] },
            { model: Comment, attributes: ['idComment'] }
        ],
        order: [['createdAt', 'DESC']]
    });


    const ratings = {};
    const ratingsStats = {};

    await Promise.all(
        publications.map(async (pub) => {
            const idImage = pub.Images[0]?.idImage;

            const userRating = await Ratingg.findOne({
                where: { idUser: userId, idImage }
            });
            ratings[pub.idPublication] = userRating ? Number(userRating.score) : null;

            const allRatings = await Ratingg.findAll({
                where: { idImage }
            });
            const total = allRatings.length;
            const avg = total > 0
                ? (allRatings.reduce((sum, r) => sum + r.score, 0) / total).toFixed(1)
                : null;

            ratingsStats[pub.idPublication] = { avg, total };
        })
    );

    res.render('home', {
        publications,
        ratings,
        ratingsStats
    });

}

export async function searchResults(req, res) {

    const search = req.query.search?.trim();
    const type = req.query.type;

    if (!search) return res.redirect('/home');

    let publications = [];
    let users = [];

    if (type === 'tag') {
        publications = await Publication.findAll({
            include: [
                { model: User, attributes: ['idUser', 'userName', 'profilePhoto'] },
                { model: Image, attributes: ['idImage', 'image', 'copyright'] },
                { model: Tag, attributes: ['idTag', 'name'], where: { name: search.toLowerCase() } }
            ],
            order: [['createdAt', 'DESC']]
        });
    } else {
        users = await User.findAll({
            where: { userName: { [Op.like]: `%${search}%` } },
            attributes: ['idUser', 'userName', 'name', 'lastName', 'profilePhoto']
        });
    }

    res.render('search', {
        publications,
        users,
        search
    });
}

export async function searchUsers(req, res) {
    const search = req.query.search?.trim();
    if (!search) return res.json([]);

    const users = await User.findAll({
        where: sequelize.where(
            sequelize.fn('LOWER', sequelize.col('userName')),
            { [Op.like]: `%${search.toLowerCase()}%` }
        ),
        attributes: ['idUser', 'userName', 'name', 'lastName'],
        limit: 5
    });

    res.json(users);
}

export async function searchTags(req, res) {
    const search = req.query.search?.trim();
    if (!search) return res.json([]);

    const tags = await Tag.findAll({
        where: { name: { [Op.like]: `%${search}%` } },
        attributes: ['idTag', 'name'],
        limit: 5
    });

    res.json(tags);
}

export async function guestHome(req, res) {
    const publications = await Publication.findAll({
        include: [
            { model: User, attributes: ['userName'] },
            { model: Image, attributes: ['idImage', 'image', 'copyright'], where: { copyright: false } }
        ],
        order: [['createdAt', 'DESC']]
    });

    res.render('guestHome', { publications });
}