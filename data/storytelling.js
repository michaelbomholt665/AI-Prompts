// Load entries from localStorage
let storytellingEntries = JSON.parse(localStorage.getItem('storytellingEntries')) || [];

// Suggest a category based on input text
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
function addTextToFramework() {
    const text = document.getElementById('input-text').value;
    const category = document.getElementById('category-select').value;
    if (text && category) {
        const entry = { text, category };
        storytellingEntries.push(entry);
        localStorage.setItem('storytellingEntries', JSON.stringify(storytellingEntries));
        const container = document.querySelector(`#${category} .text-entries`);
        if (container) {
            const div = document.createElement('div');
            div.textContent = text;
            container.appendChild(div);
        }
        document.getElementById('input-text').value = '';
        document.getElementById('suggestion').textContent = 'None';
    }
}

// Initialize event listeners
document.addEventListener('DOMContentLoaded', () => {
    const inputText = document.getElementById('input-text');
    if (inputText) {
        inputText.addEventListener('input', suggestCategory);
    }
    // Load existing entries
    storytellingEntries.forEach(entry => {
        const container = document.querySelector(`#${entry.category} .text-entries`);
        if (container) {
            const div = document.createElement('div');
            div.textContent = entry.text;
            container.appendChild(div);
        }
    });
});