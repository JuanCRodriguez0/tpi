import Ratingg from "../models/Ratingg.js";

export async function rate(req, res) {
    const { idPublication } = req.params;
    const { score, idImage } = req.body;
    const userId = req.session.user.id;

    const existing = await Ratingg.findOne({
        where: { idUser: userId, idImage }
    });

    if (existing) {
        await existing.update({ score });
    } else {
        await Ratingg.create({
            idUser: userId,
            idImage,
            score,
        });
    }

    res.redirect('/home');
}

