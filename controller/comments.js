import Comment from "../models/Comment.js";
import User from "../models/User.js";
import Publication from "../models/Publication.js";

export async function commentsView(req, res) {
    const { idPublication } = req.params;

    const comments = await Comment.findAll({
        where: { idPublication },
        include: [{ model: User, attributes: ['userName'] }],
        order: [['createdAt', 'ASC']]
    });

    res.render('comments', { 
        comments, 
        publicationId: idPublication 
    });
}

export async function addComment(req, res) {
    const { idPublication } = req.params;
    const { content } = req.body;
    const userId = req.session.user.id;

    await Comment.create({
        content,
        idUser: userId,
        idPublication,
    });

    res.redirect(`/comments/${idPublication}`);
}