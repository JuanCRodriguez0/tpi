document.querySelectorAll('.interest-btn').forEach(btn => {

    btn.addEventListener('click', async () => {

        const idPublication = btn.dataset.publication;
        const interested = btn.dataset.interested === 'true';

        const url = interested
            ? `/interest/remove/${idPublication}`
            : `/interest/add/${idPublication}`;

        try {
            const response = await fetch(url, {
                method: 'POST'
            });

            const data = await response.json();

            if (!data.success) return;

            if (data.interested) {
                btn.textContent = '💔 Ya no me interesa';
                btn.classList.remove('btn-outline-dark');
                btn.classList.add('btn-dark');
                btn.dataset.interested = 'true';
            } else {
                btn.textContent = '❤️ Me interesa';
                btn.classList.remove('btn-dark');
                btn.classList.add('btn-outline-dark');
                btn.dataset.interested = 'false';
            }

        } catch (error) {
            console.error(error);
        }

    });

});