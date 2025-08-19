let items = [];
let currentCategory = '全部';

async function loadData() {
    const res = await fetch('data.json');
    items = await res.json();
    renderCategories();
    render(items);
}

function renderCategories() {
    const categories = ['全部', ...new Set(items.map(item => item.category))];
    const container = document.getElementById('categories');
    container.innerHTML = '';
    categories.forEach(cat => {
        const btn = document.createElement('button');
        btn.className = 'px-3 py-1 rounded bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600';
        btn.textContent = cat;
        btn.addEventListener('click', () => {
            currentCategory = cat;
            filterAndRender();
        });
        container.appendChild(btn);
    });
}

function filterAndRender() {
    const keyword = document.getElementById('search').value.toLowerCase();
    let filtered = items.filter(item =>
        (currentCategory === '全部' || item.category === currentCategory) &&
        (item.name.toLowerCase().includes(keyword) ||
        item.description.toLowerCase().includes(keyword) ||
        item.tags.some(tag => tag.toLowerCase().includes(keyword)))
    );
    render(filtered, keyword);
}

function render(data, keyword = '') {
    const container = document.getElementById('list');
    container.innerHTML = '';
    data.forEach(item => {
        const el = document.createElement('div');
        el.className = 'bg-white dark:bg-gray-800 shadow rounded p-4';
        el.innerHTML = `
            <h3 class="text-lg font-semibold mb-2">
                <a href="${item.url}" target="_blank" rel="noopener noreferrer" class="text-blue-500 hover:underline">
                    ${highlight(item.name, keyword)}
                </a>
            </h3>
            <p class="text-gray-700 dark:text-gray-300 mb-2">${highlight(item.description, keyword)}</p>
            <div class="text-sm text-gray-500 dark:text-gray-400">${item.tags.join(', ')}</div>
        `;
        container.appendChild(el);
    });
}

function highlight(text, keyword) {
    if (!keyword) return text;
    const regex = new RegExp(`(${keyword})`, 'gi');
    return text.replace(regex, '<mark class="bg-yellow-300 dark:bg-yellow-600">$1</mark>');
}

// 搜索监听
document.getElementById('search').addEventListener('input', filterAndRender);

// 暗黑模式切换
document.getElementById('theme-toggle').addEventListener('click', () => {
    document.documentElement.classList.toggle('dark');
});

loadData();
