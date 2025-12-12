// Apps Datenbank
const apps = [
    {
        id: 1,
        name: "Website 1",
        description: "Erste meiner tollen Websites mit vielen Funktionen",
        url: "https://deine-website-1.com",
        category: "tools",
        icon: "icons/app1.png",
        version: "1.0.0",
        downloads: "1.2K",
        color: "#4361ee"
    },
    {
        id: 2,
        name: "Website 2",
        description: "Zweite Website für News und Updates",
        url: "https://deine-website-2.com",
        category: "news",
        icon: "icons/app2.png",
        version: "2.1.0",
        downloads: "890",
        color: "#f72585"
    },
    {
        id: 3,
        name: "Website 3",
        description: "Social Media Plattform für Verbindungen",
        url: "https://deine-website-3.com",
        category: "social",
        icon: "icons/app3.png",
        version: "1.5.3",
        downloads: "2.4K",
        color: "#4cc9f0"
    },
    {
        id: 4,
        name: "Website 4",
        description: "Entertainment und Video Plattform",
        url: "https://deine-website-4.com",
        category: "entertainment",
        icon: "icons/app4.png",
        version: "3.0.1",
        downloads: "3.1K",
        color: "#7209b7"
    },
    {
        id: 5,
        name: "Website 5",
        description: "Tool-Sammlung für Produktivität",
        url: "https://deine-website-5.com",
        category: "tools",
        icon: "icons/app5.png",
        version: "1.2.4",
        downloads: "540",
        color: "#f8961e"
    },
    {
        id: 6,
        name: "Website 6",
        description: "E-Learning Plattform mit Kursen",
        url: "https://deine-website-6.com",
        category: "tools",
        icon: "icons/app6.png",
        version: "2.3.0",
        downloads: "1.8K",
        color: "#43aa8b"
    }
];

// DOM Elemente
const appGrid = document.getElementById('appGrid');
const searchInput = document.getElementById('searchInput');
const categoryButtons = document.querySelectorAll('.category-btn');
const modal = document.getElementById('appModal');
const closeBtn = document.querySelector('.close-btn');
const installBtn = document.getElementById('installBtn');

// PWA Install Prompt
let deferredPrompt;

// Aktuelle Filter
let currentCategory = 'all';
let currentSearch = '';

// Apps rendern
function renderApps() {
    appGrid.innerHTML = '';
    
    const filteredApps = apps.filter(app => {
        const matchesCategory = currentCategory === 'all' || app.category === currentCategory;
        const matchesSearch = app.name.toLowerCase().includes(currentSearch.toLowerCase()) ||
                            app.description.toLowerCase().includes(currentSearch.toLowerCase());
        return matchesCategory && matchesSearch;
    });
    
    if (filteredApps.length === 0) {
        appGrid.innerHTML = `
            <div class="no-results">
                <span class="material-icons">search_off</span>
                <h3>Keine Apps gefunden</h3>
                <p>Versuche einen anderen Suchbegriff oder eine andere Kategorie</p>
            </div>
        `;
        return;
    }
    
    filteredApps.forEach(app => {
        const appCard = document.createElement('div');
        appCard.className = 'app-card';
        appCard.innerHTML = `
            <img src="${app.icon}" alt="${app.name}" class="app-icon" style="border-color: ${app.color}">
            <span class="app-category">${getCategoryName(app.category)}</span>
            <h3 class="app-title">${app.name}</h3>
            <p class="app-description">${app.description}</p>
            <div class="app-actions">
                <button class="btn-open" data-id="${app.id}">
                    <span class="material-icons">open_in_browser</span>
                    Öffnen
                </button>
                <button class="btn-details" data-id="${app.id}">
                    <span class="material-icons">info</span>
                </button>
            </div>
        `;
        appGrid.appendChild(appCard);
    });
    
    // Event Listener für Buttons hinzufügen
    document.querySelectorAll('.btn-open').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = parseInt(e.target.closest('button').dataset.id);
            openApp(id);
        });
    });
    
    document.querySelectorAll('.btn-details').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = parseInt(e.target.closest('button').dataset.id);
            showAppDetails(id);
        });
    });
}

// App in neuem Tab öffnen
function openApp(id) {
    const app = apps.find(a => a.id === id);
    if (app) {
        window.open(app.url, '_blank');
        // Download-Zähler erhöhen (simuliert)
        app.downloads = incrementDownloads(app.downloads);
        renderApps();
    }
}

// App Details anzeigen
function showAppDetails(id) {
    const app = apps.find(a => a.id === id);
    if (!app) return;
    
    document.getElementById('modalTitle').textContent = app.name;
    document.getElementById('modalIcon').src = app.icon;
    document.getElementById('modalIcon').alt = app.name;
    document.getElementById('modalDescription').textContent = app.description;
    document.getElementById('modalCategory').textContent = getCategoryName(app.category);
    document.getElementById('modalVersion').textContent = `Version ${app.version}`;
    document.getElementById('modalDownloads').textContent = `${app.downloads} Downloads`;
    
    // Buttons aktualisieren
    document.getElementById('modalOpenBtn').onclick = () => openApp(id);
    document.getElementById('modalInstallBtn').onclick = () => installPWA();
    document.getElementById('modalShareBtn').onclick = () => shareApp(app);
    
    modal.style.display = 'flex';
}

// Kategorie-Name übersetzen
function getCategoryName(category) {
    const categories = {
        'all': 'Alle',
        'tools': 'Tools',
        'news': 'News',
        'social': 'Social',
        'entertainment': 'Entertainment'
    };
    return categories[category] || category;
}

// Downloads zählen
function incrementDownloads(current) {
    const num = parseInt(current.replace('K', '000')) || parseInt(current);
    const newNum = num + 1;
    return newNum >= 1000 ? (newNum / 1000).toFixed(1) + 'K' : newNum.toString();
}

// App teilen
function shareApp(app) {
    if (navigator.share) {
        navigator.share({
            title: app.name,
            text: app.description,
            url: app.url
        });
    } else {
        // Fallback: URL kopieren
        navigator.clipboard.writeText(app.url);
        alert('Link wurde in die Zwischenablage kopiert!');
    }
}

// PWA Installation
window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    installBtn.style.display = 'flex';
});

installBtn.addEventListener('click', async () => {
    if (!deferredPrompt) return;
    
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    
    if (outcome === 'accepted') {
        installBtn.style.display = 'none';
        alert('App Store erfolgreich installiert!');
    }
    
    deferredPrompt = null;
});

// Suche
searchInput.addEventListener('input', (e) => {
    currentSearch = e.target.value;
    renderApps();
});

// Kategorie Filter
categoryButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        categoryButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentCategory = btn.dataset.category;
        renderApps();
    });
});

// Modal schließen
closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
});

window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});

// Service Worker registrieren für PWA
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('sw.js')
            .then(registration => {
                console.log('Service Worker registriert:', registration);
            })
            .catch(error => {
                console.log('Service Worker Registrierung fehlgeschlagen:', error);
            });
    });
}

// Letztes Update anzeigen
document.getElementById('lastUpdate').textContent = 
    new Date().toLocaleDateString('de-DE', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    });

// Initial rendern
renderApps();
