import User from "../models/User.js";
import Publication from "../models/Publication.js";
import Follower from "../models/Follower.js";
import Image from "../models/Image.js";

export async function home(req, res) {
    const userId = req.session.user.id;
    console.log('userId:', userId, typeof userId);

    const following = await Follower.findAll({
        where: { 
            idFollower: userId 
        },
        attributes: ['idFollowed']
    });

    // Pasa de [{idFollowed: ID}, {...}] a [ID1,ID2,...]
    const followingIds = following.map( f => 
        f.idFollowed
    );

    followingIds.push(Number(userId));

    console.log('followingIds:', followingIds);
    console.log('userId:', userId, typeof userId);

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
            }
        ],
        order: [
            ['createdAt', 'DESC']
        ]
    });

    console.log('publicaciones encontradas:', publications.length);

    res.render('home', { 
        publications,
        currentUser: req.session.user
    });
}