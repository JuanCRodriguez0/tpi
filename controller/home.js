import User from "../models/User.js";
import Publication from "../models/Publication.js";
import Follower from "../models/Follower.js";

export async function home(req, res) {
    const userId = req.session.user.id;

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

    const publications = await Publication.findAll({
        where: { 
            idUser: followingIds 
        },
        include: [
            { 
                model: User, attributes: ['userName', 'profilePhoto'] 
            }
        ],  
        order: [
            ['createdAt', 'DESC']
        ]
    });

    res.render('home', { 
        publications 
    });
}