const input = document.getElementById('searchInput');
const dropdown = document.getElementById('searchDropdown');

if (input && dropdown) {
    input.addEventListener('input', async function() {
        const q = this.value.trim();
        dropdown.innerHTML = '';

        if (!q) {
            dropdown.style.display = 'none';
            return;
        }

        if (q.startsWith('#')) {
            const tagQuery = q.slice(1);
            if (!tagQuery) return;

            const res = await fetch(`/search/tags?search=${encodeURIComponent(tagQuery)}`);
            const tags = await res.json();

            if (tags.length === 0) { dropdown.style.display = 'none'; return; }

            tags.forEach(tag => {
                const item = document.createElement('a');
                item.href = `/search?type=tag&search=${encodeURIComponent(tag.name)}`;
                item.className = 'd-block px-3 py-2 text-dark text-decoration-none border-bottom';
                item.textContent = `#${tag.name}`;
                item.addEventListener('mouseenter', () => item.style.background = '#f0f0f0');
                item.addEventListener('mouseleave', () => item.style.background = '');
                dropdown.appendChild(item);
            });

            dropdown.style.display = 'block';

        } else {
            const res = await fetch(`/search/users?search=${encodeURIComponent(q)}`);
            const users = await res.json();

            if (users.length === 0) { dropdown.style.display = 'none'; return; }

            users.forEach(user => {
                const item = document.createElement('a');
                item.href = `/profile/${user.idUser}`;
                item.className = 'd-block px-3 py-2 text-dark text-decoration-none border-bottom';
                item.textContent = `@${user.userName} — ${user.name} ${user.lastName}`;
                item.addEventListener('mouseenter', () => item.style.background = '#f0f0f0');
                item.addEventListener('mouseleave', () => item.style.background = '');
                dropdown.appendChild(item);
            });

            dropdown.style.display = 'block';
        }
    });

    document.addEventListener('click', function(e) {
        if (!input.contains(e.target) && !dropdown.contains(e.target)) {
            dropdown.style.display = 'none';
        }
    });
}