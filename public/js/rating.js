document.querySelectorAll('.rating-container').forEach(container => {

    const publicationId = container.dataset.publication;
    const imageId = container.dataset.image;

    container.querySelectorAll('.rating-btn').forEach(btn => {

        btn.addEventListener('click', async () => {

            const score = btn.dataset.score;

            try {

                const response = await fetch(
                    `/rating/${publicationId}`,
                    {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            score,
                            idImage: imageId
                        })
                    }
                );

                const data = await response.json();

                if (!data.success) return;

                container.querySelector('.user-rating').textContent =
                    `Calificaste con ${data.score}`;

                const card = container.closest('.card');

                const stats = card.querySelector('.rating-stats');

                if (stats) {

                    stats.textContent =
                        `⭐ (${data.avg}) ${data.total} ${data.total === 1 ? 'voto' : 'votos'}`;

                }

            } catch (error) {

                console.error(error);

            }

        });

    });

});