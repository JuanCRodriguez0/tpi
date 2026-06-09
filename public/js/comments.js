document.querySelectorAll('.comments-btn').forEach(btn => {

    btn.addEventListener('click', async () => {

        const idPublication = btn.dataset.publication;
        const isOpen = btn.dataset.open === 'true';

        const url = isOpen
            ? `/post/closeComments/${idPublication}`
            : `/post/openComments/${idPublication}`;

        try {

            const response = await fetch(url);

            const data = await response.json();

            if (!data.success) return;

            if (data.commentsOpen) {

                btn.textContent = '✉️ Cerrar comentarios';
                btn.dataset.open = 'true';

            } else {

                btn.textContent = '📩 Abrir comentarios';
                btn.dataset.open = 'false';

            }

        } catch (error) {

            console.error(error);

        }

    });

});