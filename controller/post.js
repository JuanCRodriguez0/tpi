import Publication from "../models/Publication.js";
import Image from "../models/Image.js";
import Tag from "../models/Tag.js";
import PublicationTag from "../models/PublicationTag.js";

export async function createForm(req, res) {
    res.render('post/create');
}

export async function create(req, res) {
    const { title, description, imagenesBase64, copyright, watermark, etiquetas } = req.body;
    const userId = req.session.user.id;

    let imagenes = req.body.imagenesBase64;

    if (!title) {
        return res.render('post/create', {
            alert: { 
                status: "Error", 
                text: "El título es obligatorio" 
            },
            formValues: req.body
        });
    }

    if (!imagenes) {
        return res.render('post/create', {
            alert: { 
                status: "Error", 
                text: "Debe subir al menos una imagen" 
            },
            formValues: req.body
        });
    }

    if (!Array.isArray(imagenes)) {
        imagenes = [imagenes];
    }

    try {
        const publication = await Publication.create({
            title,
            description,
            idUser: userId,
        });

        for (const base64 of imagenes) {
            const base64Data = base64.split(",")[1] || base64;
            const imageBuffer = Buffer.from(base64Data, "base64");

            await Image.create({
                idPublication: publication.idPublication,
                image: imageBuffer,
                copyright: copyright === 'true',
                watermark: copyright === 'true' ? watermark : null,
            });
        }

        if (etiquetas) {
            const tags = etiquetas.split(',').map(t => t.trim()).filter(t => t);
            for (const tagName of tags) {
                const [tag] = await Tag.findOrCreate({
                    where: { name: tagName.toLowerCase() }
                });
                await PublicationTag.create({
                    idPublication: publication.idPublication,
                    idTag: tag.idTag,
                });
            }
        }

        res.redirect('/home');
    } catch (error) {
        console.error('[!] Error al crear publicación:', error);
        res.render('post/create', {
            alert: { 
                status: "Error", 
                text: "Error al crear la publicación" 
            },
            formValues: req.body
        });
    }
}

export async function closeComments(req, res) {
    const { idPublication } = req.params;
    const userId = req.session.user.id;

    const publication = await Publication.findByPk(idPublication);

    if (publication.idUser === userId) {
        await publication.update({ commentsOpen: false });
    }

    res.redirect('/home');
}

export async function openComments(req, res) {
    const { idPublication } = req.params;
    const userId = req.session.user.id;

    const publication = await Publication.findByPk(idPublication);

    if (publication.idUser === userId) {
        await publication.update({ commentsOpen: true });
    }

    res.redirect('/home');
}