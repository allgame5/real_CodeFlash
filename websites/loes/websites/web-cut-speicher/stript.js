document.addEventListener("DOMContentLoaded", () => {
    loadWebsites();
});

function openWebsite(url) {
    if (url.startsWith('https://') || url.startsWith('http://')) {
        window.open(url, '_blank');
    } else {
        window.open('https://' + url, '_blank');
    }
}

function searchWebsite() {
    const query = document.getElementById('search').value;
    if (query) {
        const url = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
        window.open(url, '_blank');
    }
}

function addWebsite() {
    const name = document.getElementById('new-website-name').value;
    const url = document.getElementById('new-website-url').value;
    const iconClass = document.getElementById('icon-selector').value;
    const customIcon = document.getElementById('custom-icon').files[0];

    if (name && url) {
        const websites = JSON.parse(localStorage.getItem('websites')) || [];

        let icon = iconClass;
        if (customIcon) {
            const reader = new FileReader();
            reader.onload = function (e) {
                const customIconURL = e.target.result;
                const newWebsite = { name, url, icon: customIconURL, isCustomIcon: true };
                websites.push(newWebsite);
                localStorage.setItem('websites', JSON.stringify(websites));
                displayWebsite(newWebsite);
            };
            reader.readAsDataURL(customIcon);
        } else {
            const newWebsite = { name, url, icon, isCustomIcon: false };
            websites.push(newWebsite);
            localStorage.setItem('websites', JSON.stringify(websites));
            displayWebsite(newWebsite);
        }

        // Clear input fields
        document.getElementById('new-website-name').value = '';
        document.getElementById('new-website-url').value = '';
        document.getElementById('custom-icon').value = '';
    } else {
        alert('Bitte sowohl den Namen als auch die URL der Webseite eingeben.');
    }
}

function displayWebsite(website) {
    const websitesContainer = document.querySelector('.websites');

    const websiteDiv = document.createElement('div');
    websiteDiv.className = 'website';
    websiteDiv.onclick = () => openWebsite(website.url);

    if (website.isCustomIcon) {
        const iconImg = document.createElement('img');
        iconImg.src = website.icon;
        iconImg.style.width = '50px';
        iconImg.style.height = '50px';
        websiteDiv.appendChild(iconImg);
    } else {
        const icon = document.createElement('i');
        icon.className = website.icon;
        websiteDiv.appendChild(icon);
    }

    const paragraph = document.createElement('p');
    paragraph.textContent = website.name;

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'X';
    deleteButton.className = 'delete-button';
    deleteButton.onclick = (e) => {
        e.stopPropagation();
        deleteWebsite(website);
    };

    websiteDiv.appendChild(paragraph);
    websiteDiv.appendChild(deleteButton);
    websitesContainer.appendChild(websiteDiv);
}

function loadWebsites() {
    const websites = JSON.parse(localStorage.getItem('websites')) || [];
    websites.forEach(website => displayWebsite(website));
}

function deleteWebsite(websiteToDelete) {
    let websites = JSON.parse(localStorage.getItem('websites')) || [];
    websites = websites.filter(website => website.url !== websiteToDelete.url);
    localStorage.setItem('websites', JSON.stringify(websites));
    document.querySelector('.websites').innerHTML = '';
    loadWebsites();
}
