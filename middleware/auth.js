import User from "../models/User.js";

export async function authMiddleware(req, res, next) {
    const user = req.session.user; // usuario de la sesion solo contiene id
    if (!user) {
        res.redirect('/auth/login');
        return;
    }

    const userId = Number(user.idUser);

    try {
        const user = await User.findByPk(userId, {
            attributes: ['idUser', 'userName', 'name', 'lastName'],
        });

        if (!user) {
            res.redirect('/auth/login');
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