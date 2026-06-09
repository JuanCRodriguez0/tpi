import Publication from "../models/Publication.js";
import Image from "../models/Image.js";
import Tag from "../models/Tag.js";
import PublicationTag from "../models/PublicationTag.js";
import sharp from 'sharp';

export async function createForm(req, res) {
    res.render('post/create');
}

export async function create(req, res) {
    const { title, description, etiquetas } = req.body;
    const userId = req.session.user.id;
    let imagenes = req.body.imagenesBase64;

    if (!title || title.trim() === '') {
        return res.render('post/create', {
            alert: { status: "Error", text: "El título es obligatorio" },
            formValues: req.body
        });
    }

    if (!imagenes) {
        return res.render('post/create', {
            alert: { status: "Error", text: "Debe subir al menos una imagen" },
            formValues: req.body
        });
    }

    if (!etiquetas || etiquetas.trim() === '') {
    return res.render('post/create', {
        alert: {
            status: "Error",
            text: "Debe ingresar al menos una etiqueta."
        },
        formValues: req.body
    });
}

    let copyrights = req.body.copyright;

    if (!Array.isArray(copyrights)) {
        copyrights = [copyrights];
    }

    if (copyrights.some(c => !c || c.trim() === '')) {
        return res.render('post/create', {
            alert: {
                status: "Error",
                text: "Debe seleccionar copyright para todas las imágenes."
            },
            formValues: req.body
        });
    }

    if (!Array.isArray(imagenes)) imagenes = [imagenes];

    try {
        const publication = await Publication.create({
            title,
            description,
            idUser: userId,
        });

        let copyrights = req.body.copyright;
        let watermarks = req.body.watermark;
        if (!Array.isArray(copyrights)) copyrights = [copyrights];
        if (!Array.isArray(watermarks)) watermarks = watermarks ? [watermarks] : [];

        for (let i = 0; i < imagenes.length; i++) {
            const base64 = imagenes[i];
            const base64Data = base64.split(",")[1] || base64;
            let imageBuffer = Buffer.from(base64Data, "base64");

            const imgCopyright = copyrights[i] === 'true';
            const imgWatermark = watermarks[i] || null;

            if (imgCopyright && imgWatermark) {
                const image = sharp(imageBuffer);
                const metadata = await image.metadata();

                const svgText = `
                    <svg width="${metadata.width}" height="${metadata.height}">
                        <text 
                            x="${metadata.width - 20}" 
                            y="${metadata.height - 20}" 
                            font-size="200" 
                            fill="rgba(255,255,255,0.8)" 
                            text-anchor="end" 
                            dominant-baseline="auto"
                            font-family="Arial"
                            stroke="black"
                            stroke-width="2"
                            paint-order="stroke"
                        >${imgWatermark}</text>
                    </svg>`;

                imageBuffer = await image
                    .composite([{ input: Buffer.from(svgText), top: 0, left: 0 }])
                    .jpeg()
                    .toBuffer();
            }

            await Image.create({
                idPublication: publication.idPublication,
                image: imageBuffer,
                copyright: imgCopyright,
                watermark: imgWatermark,
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
            alert: { status: "Error", text: "Error al crear la publicación" },
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

export async function deletePublication(req, res) {
    const { idPublication } = req.params;
    const userId = req.session.user.id;

    try {
        const publication = await Publication.findByPk(idPublication);

        if (!publication) {
            return res.redirect('/home');
        }

        if (publication.idUser !== userId) {
            return res.redirect('/home');
        }

        await publication.destroy();

        res.redirect('/home');
    } catch (error) {
        console.error('[!] Error al eliminar publicación:', error);
        res.redirect('/home');
    }
}

export async function editPublication(req, res) {
    const { idPublication } = req.params;
    const { title, description } = req.body;
    const userId = req.session.user.id;

    try {
        const publication = await Publication.findByPk(idPublication);

        if (!publication || publication.idUser !== userId) {
            return res.redirect('/home');
        }

        await publication.update({ title, description });

        res.redirect('/home');
    } catch (error) {
        console.error('[!] Error al editar publicación:', error);
        res.redirect('/home');
    }
}