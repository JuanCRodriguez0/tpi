import Ratingg from "../models/Ratingg.js";
import Image from "../models/Image.js";
import Publication from "../models/Publication.js";

export async function rate(req, res) {
    const { idPublication } = req.params;
    const { score, idImage } = req.body;
    const userId = req.session.user.id;

    try {
        const publication = await Publication.findByPk(idPublication);

        if (publication.idUser === userId) {
            return res.redirect('/home');
        }

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
    } catch (error) {
        console.error('[!] Error al calificar:', error);
        res.redirect('/home');
    }
}

