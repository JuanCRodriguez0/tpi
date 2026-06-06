import Comment from "../models/Comment.js";
import User from "../models/User.js";
import Publication from "../models/Publication.js";

export async function commentsView(req, res) {
    const { idPublication } = req.params;

    const publication = await Publication.findByPk(idPublication);

    const comments = await Comment.findAll({
        where: { idPublication },
        include: [{ model: User, attributes: ['userName'] }],
        order: [['createdAt', 'ASC']]
    });

    res.render('comments', { 
        comments, 
        publicationId: idPublication,
        pub: publication,
        publicationAuthorId: publication.idUser,
        currentUser: req.session.user
    });

}

export async function addComment(req, res) {
    const { idPublication } = req.params;
    const { content } = req.body;
    const userId = req.session.user.id;

    const publication = await Publication.findByPk(idPublication);
    if (!publication.commentsOpen) {
        return res.redirect(`/comments/${idPublication}`);
    }

    await Comment.create({
        content,
        idUser: userId,
        idPublication,
    });

    res.redirect(`/comments/${idPublication}`);
}


export async function deleteComment(req, res) {
    const { idComment } = req.params;
    const userId = req.session.user.id;

    const comment = await Comment.findByPk(idComment);
    const publication = await Publication.findByPk(comment.idPublication);

    if (comment.idUser === userId || publication.idUser === userId) {
        await comment.destroy();
    }

    res.redirect(`/comments/${comment.idPublication}`);
}