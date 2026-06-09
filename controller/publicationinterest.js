import PublicationInterest from "../models/PublicationInterest.js";

export async function addInterest(req, res) {
    const { idPublication } = req.params;
    const userId = req.session.user.id;

    try {
        const exists = await PublicationInterest.findOne({
            where: {
                idUser: userId,
                idPublication
            }
        });

        if (!exists) {
            await PublicationInterest.create({
                idUser: userId,
                idPublication
            });
        }

        return res.json({
            success: true,
            interested: true
        });
    } catch (error) {
        console.error(error);
        return res.json({
            success: false
        });
    }
}

export async function removeInterest(req, res) {
    const { idPublication } = req.params;
    const userId = req.session.user.id;

    try {
        await PublicationInterest.destroy({
            where: {
                idUser: userId,
                idPublication
            }
        });

        return res.json({
            success: true,
            interested: false
        });

    } catch (error) {
        console.error(error);

        return res.json({
            success: false
        });
    }
}