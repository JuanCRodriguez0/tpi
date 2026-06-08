import User from "../models/User.js";

export async function authMiddleware(req, res, next) {
    const user = req.session.user;
    if (!user) {
        res.redirect('/login');
        return;
    }

    const userId = Number(user.id);

    try {
        const user = await User.findByPk(userId, {
            attributes: ['idUser', 'userName', 'name', 'lastName'],
        });

        if (!user) {
            res.redirect('/');
            return;
        }

        res.locals.currentUser = {
            idUser: user.idUser,
            userName: user.userName,
            name: user.name,
            lastName: user.lastName
        };
    } catch (error) {
        console.error('[!] Error al autenticar usuario:', error);
    }

    next();
}