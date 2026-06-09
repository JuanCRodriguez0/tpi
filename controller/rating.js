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

        const allRatings = await Ratingg.findAll({
            where: { idImage }
        });

        const total = allRatings.length;

        const avg = total > 0
            ? (
                allRatings.reduce((sum, r) => sum + Number(r.score), 0)
                / total
            ).toFixed(1)
            : null;

        return res.json({
            success: true,
            score: Number(score),
            avg,
            total
        });
        
    } catch (error) {
        console.error('[!] Error al calificar:', error);
        return res.json({
            success: false
        });
    }
}

