document.getElementById('homeButton').addEventListener('click', () => {
    loadPage('home');
});

document.getElementById('aboutButton').addEventListener('click', () => {
    loadPage('about');
});

document.getElementById('openFileButton').addEventListener('click', async () => {
    const content = await window.electronAPI.openFile();
    loadEditableContent(content);
});

document.getElementById('saveFileButton').addEventListener('click', async () => {
    const content = document.getElementById('fileEditor').value;
    await window.electronAPI.saveFile(content);
});

function loadPage(page) {
    if (page === 'home') {
        document.getElementById('content').innerHTML = '<h1>Головна</h1><p>Це головна сторінка додатка.</p>';
    } else if (page === 'about') {
        document.getElementById('content').innerHTML = '<h1>Про додаток</h1><p>Це простий додаток на Electron.</p>';
    }
}

function loadEditableContent(content) {
    document.getElementById('content').innerHTML = `<textarea id="fileEditor" rows="20" cols="80">${content}</textarea>`;
    localStorage.setItem('offlineContent', content);
}

window.addEventListener('offline', () => {
    alert('Додаток працює в офлайн-режимі. Дані зберігаються локально.');
    const content = document.getElementById('fileEditor') ? document.getElementById('fileEditor').value : '';
    localStorage.setItem('offlineContent', content);
});

window.addEventListener('DOMContentLoaded', () => {
    const offlineContent = localStorage.getItem('offlineContent');
    if (offlineContent) {
        loadEditableContent(offlineContent);
    }
});