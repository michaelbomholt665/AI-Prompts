// storytelling.js

// Detect the current page
const page = document.body.getAttribute('data-page');

if (page === 'storytelling') {
    let storytellingEntries = [];

    // Load entries from localStorage
    function loadStorytellingEntries() {
        const storedEntries = localStorage.getItem('storytellingEntries');
        if (storedEntries) {
            storytellingEntries = JSON.parse(storedEntries);
            storytellingEntries.forEach(entry => {
                const container = document.querySelector(`#${entry.category} .text-entries`);
                if (container) {
                    const div = document.createElement('div');
                    div.textContent = entry.text;
                    container.appendChild(div);
                }
            });
        }
    }

    // Save entries to localStorage
    function saveStorytellingEntries() {
        localStorage.setItem('storytellingEntries', JSON.stringify(storytellingEntries));
    }

    // Suggest category based on input text
    function suggestCategory() {
        const text = document.getElementById('input-text').value;
        const suggestion = document.getElementById('suggestion');
        if (text.includes('begin') || text.includes('start')) {
            suggestion.textContent = 'Introduction';
        } else if (text.includes('idea') || text.includes('brainstorm')) {
            suggestion.textContent = 'Idea Generation';
        } else {
            suggestion.textContent = 'None';
        }
    }

    // Add text to the selected category
    window.addTextToFramework = function() {
        const text = document.getElementById('input-text').value;
        const category = document.getElementById('category-select').value;
        if (text && category) {
            const entry = { text, category };
            storytellingEntries.push(entry);
            const container = document.querySelector(`#${category} .text-entries`);
            if (container) {
                const div = document.createElement('div');
                div.textContent = text;
                container.appendChild(div);
            }
            saveStorytellingEntries();
            document.getElementById('input-text').value = '';
            document.getElementById('suggestion').textContent = 'None';
        }
    };

    // Download library as JSON
    window.downloadLibraryFile = function() {
        const blob = new Blob([JSON.stringify(storytellingEntries, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'library.json';
        a.click();
        URL.revokeObjectURL(url);
    };

    // Toggle visibility of all text entries
    window.toggleAllEntries = function() {
        const entries = document.querySelectorAll('.text-entries');
        entries.forEach(entry => {
            entry.style.display = entry.style.display === 'none' ? 'block' : 'none';
        });
    };

    // Export to HTML
    window.exportToHtml = function() {
        const html = `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <title>Storytelling Export</title>
            </head>
            <body>
                <h1>Storytelling Framework</h1>
                ${storytellingEntries.map(entry => `<h2>${entry.category}</h2><p>${entry.text}</p>`).join('')}
            </body>
            </html>
        `;
        const blob = new Blob([html], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'storytelling.html';
        a.click();
        URL.revokeObjectURL(url);
    };

    // Load library from file
    window.loadLibraryFile = function(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                storytellingEntries = JSON.parse(e.target.result);
                saveStorytellingEntries();
                document.querySelectorAll('.text-entries').forEach(container => container.innerHTML = '');
                loadStorytellingEntries();
            };
            reader.readAsText(file);
        }
    };

    // Initialize on page load
    document.addEventListener('DOMContentLoaded', () => {
        loadStorytellingEntries();
        const inputText = document.getElementById('input-text');
        if (inputText) {
            inputText.addEventListener('input', suggestCategory);
        }
    });
}