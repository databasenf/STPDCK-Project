let items = [];

async function loadData() {
    const res = await fetch('data.json');
    items = await res.json();
    render(items);
}

function render(data) {
    const container = document.getElementById('list');
    container.innerHTML = '';
    data.forEach(item => {
        const el = document.createElement('div');
        el.className = 'bg-white shadow rounded p-4';
        el.innerHTML = `
            <h3 class="text-lg font-semibold mb-2">
                <a href="${item.url}" target="_blank" class="text-blue-500 hover:underline">${item.name}</a>
            </h3>
            <p class="text-gray-700 mb-2">${item.description}</p>
            <div class="text-sm text-gray-500">${item.tags.join(', ')}</div>
        `;
        container.appendChild(el);
    });
}

document.getElementById('search').addEventListener('input', (e) => {
    const keyword = e.target.value.toLowerCase();
    const filtered = items.filter(item =>
        item.name.toLowerCase().includes(keyword) ||
        item.description.toLowerCase().includes(keyword) ||
        item.tags.some(tag => tag.toLowerCase().includes(keyword))
    );
    render(filtered);
});

loadData();
