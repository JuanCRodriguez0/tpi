import User from "../models/User.js";
import Publication from "../models/Publication.js";
import Follower from "../models/Follower.js";
import Image from "../models/Image.js";
import Ratingg from "../models/Ratingg.js";
import Tag from '../models/Tag.js';


export async function home(req, res) {
    if (!req.session.user) {
        return res.redirect('/');
    }

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
        where: {
            idUser: followingIds
        },
        include: [
            {
                model: User,
                attributes: ['userName', 'profilePhoto']
            },
            {
                model: Image,
                attributes: ['idImage', 'image', 'copyright']
            },
            {
                model: Tag,
                model: Tag, attributes: ['idTag', 'name']
            }
        ],
        order: [
            ['createdAt', 'DESC']
        ]
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
        ratingsStats,
        currentUser: req.session.user
    });

}