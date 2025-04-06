// script.js

// Detect the current page
const page = document.body.getAttribute('data-page');

// Define page-specific IDs
const ids = {
    stories: {
        menu: 'stories-menu',
        storySelect: 'stories-story-select',
        bookSelect: 'stories-book-select',
        chapterSelect: 'stories-chapter-select',
        chapterText: 'stories-chapter-text',
        editMode: 'stories-edit-mode',
        textDisplay: 'stories-text-display',
        title: 'stories-display-title',
        text: 'stories-display-text',
        backButton: 'stories-back-to-edit'
    },
    templates: {
        menu: 'templates-menu',
        templateSelect: 'templates-template-select',
        templateText: 'templates-template-text',
        editMode: 'templates-edit-mode',
        textDisplay: 'templates-text-display',
        title: 'templates-display-title',
        text: 'templates-display-text',
        backButton: 'templates-back-to-edit'
    }
};

// Use page-specific IDs if available
const pageIds = ids[page] || {};

// Data Management for Stories
let stories = {};
if (page === 'stories') {
    function loadStories() {
        const storedStories = localStorage.getItem('stories');
        if (storedStories) Object.assign(stories, JSON.parse(storedStories));
    }

    function saveStories() {
        localStorage.setItem('stories', JSON.stringify(stories));
    }

    function populateStoryMenu() {
        const menu = document.getElementById(pageIds.menu);
        menu.innerHTML = '';
        for (const story in stories) {
            const li = document.createElement('li');
            li.innerHTML = `<a onclick="document.getElementById('${pageIds.storySelect}').value='${story}';populateBookSelect();">${story}</a>`;
            menu.appendChild(li);
        }
    }

    function populateStorySelect() {
        const select = document.getElementById(pageIds.storySelect);
        select.innerHTML = '<option value="">Select a story</option>';
        for (const story in stories) {
            const option = document.createElement('option');
            option.value = story;
            option.textContent = story;
            select.appendChild(option);
        }
    }

    function populateBookSelect() {
        const storySelect = document.getElementById(pageIds.storySelect);
        const bookSelect = document.getElementById(pageIds.bookSelect);
        bookSelect.innerHTML = '<option value="">Select a book</option>';
        const story = storySelect.value;
        if (story && stories[story]) {
            for (const book in stories[story]) {
                const option = document.createElement('option');
                option.value = book;
                option.textContent = book;
                bookSelect.appendChild(option);
            }
        }
        populateChapterSelect();
    }

    function populateChapterSelect() {
        const storySelect = document.getElementById(pageIds.storySelect);
        const bookSelect = document.getElementById(pageIds.bookSelect);
        const chapterSelect = document.getElementById(pageIds.chapterSelect);
        chapterSelect.innerHTML = '<option value="">Select a chapter</option>';
        const story = storySelect.value;
        const book = bookSelect.value;
        if (story && book && stories[story][book]) {
            for (const chapter in stories[story][book]) {
                const option = document.createElement('option');
                option.value = chapter;
                option.textContent = chapter;
                chapterSelect.appendChild(option);
            }
        }
        loadChapterText();
    }

    function loadChapterText() {
        const storySelect = document.getElementById(pageIds.storySelect);
        const bookSelect = document.getElementById(pageIds.bookSelect);
        const chapterSelect = document.getElementById(pageIds.chapterSelect);
        const textArea = document.getElementById(pageIds.chapterText);
        const story = storySelect.value;
        const book = bookSelect.value;
        const chapter = chapterSelect.value;
        textArea.value = (story && book && chapter && stories[story][book][chapter]) || '';
    }

    function saveChapterText() {
        const storySelect = document.getElementById(pageIds.storySelect);
        const bookSelect = document.getElementById(pageIds.bookSelect);
        const chapterSelect = document.getElementById(pageIds.chapterSelect);
        const textArea = document.getElementById(pageIds.chapterText);
        const story = storySelect.value;
        const book = bookSelect.value;
        const chapter = chapterSelect.value;
        if (story && book && chapter) {
            stories[story][book][chapter] = textArea.value;
            saveStories();
            populateStoryMenu();
        }
    }

    function addStory() {
        const name = prompt('Enter story name:');
        if (name && !stories[name]) {
            stories[name] = {};
            saveStories();
            populateStoryMenu();
            populateStorySelect();
        }
    }

    function deleteStory() {
        const storySelect = document.getElementById(pageIds.storySelect);
        const story = storySelect.value;
        if (story && confirm(`Delete ${story}?`)) {
            delete stories[story];
            saveStories();
            populateStoryMenu();
            populateStorySelect();
        }
    }

    function addBook() {
        const storySelect = document.getElementById(pageIds.storySelect);
        const story = storySelect.value;
        const name = prompt('Enter book name:');
        if (story && name && !stories[story][name]) {
            stories[story][name] = {};
            saveStories();
            populateBookSelect();
        }
    }

    function deleteBook() {
        const storySelect = document.getElementById(pageIds.storySelect);
        const bookSelect = document.getElementById(pageIds.bookSelect);
        const story = storySelect.value;
        const book = bookSelect.value;
        if (story && book && confirm(`Delete ${book}?`)) {
            delete stories[story][book];
            saveStories();
            populateBookSelect();
        }
    }

    function addChapter() {
        const storySelect = document.getElementById(pageIds.storySelect);
        const bookSelect = document.getElementById(pageIds.bookSelect);
        const name = prompt('Enter chapter name:');
        const story = storySelect.value;
        const book = bookSelect.value;
        if (story && book && name && !stories[story][book][name]) {
            stories[story][book][name] = '';
            saveStories();
            populateChapterSelect();
        }
    }

    function deleteChapter() {
        const storySelect = document.getElementById(pageIds.storySelect);
        const bookSelect = document.getElementById(pageIds.bookSelect);
        const chapterSelect = document.getElementById(pageIds.chapterSelect);
        const story = storySelect.value;
        const book = bookSelect.value;
        const chapter = chapterSelect.value;
        if (story && book && chapter && confirm(`Delete ${chapter}?`)) {
            delete stories[story][book][chapter];
            saveStories();
            populateChapterSelect();
        }
    }

    function getCurrentChapterTitle() {
        const storySelect = document.getElementById(pageIds.storySelect);
        const bookSelect = document.getElementById(pageIds.bookSelect);
        const chapterSelect = document.getElementById(pageIds.chapterSelect);
        return `${storySelect.value} - ${bookSelect.value} - ${chapterSelect.value}`;
    }
}

// Data Management for Templates
let templates = {};
if (page === 'templates') {
    function loadTemplates() {
        const storedTemplates = localStorage.getItem('templates');
        if (storedTemplates) Object.assign(templates, JSON.parse(storedTemplates));
    }

    function saveTemplates() {
        localStorage.setItem('templates', JSON.stringify(templates));
    }

    function populateTemplateMenu() {
        const menu = document.getElementById(pageIds.menu);
        menu.innerHTML = '';
        for (const template in templates) {
            const li = document.createElement('li');
            li.innerHTML = `<a onclick="document.getElementById('${pageIds.templateSelect}').value='${template}';loadTemplateText();">${template}</a>`;
            menu.appendChild(li);
        }
    }

    function populateTemplateSelect() {
        const select = document.getElementById(pageIds.templateSelect);
        select.innerHTML = '<option value="">Select a template</option>';
        for (const template in templates) {
            const option = document.createElement('option');
            option.value = template;
            option.textContent = template;
            select.appendChild(option);
        }
    }

    function loadTemplateText() {
        const select = document.getElementById(pageIds.templateSelect);
        const textArea = document.getElementById(pageIds.templateText);
        const template = select.value;
        textArea.value = (template && templates[template]) || '';
    }

    function saveTemplateText() {
        const select = document.getElementById(pageIds.templateSelect);
        const textArea = document.getElementById(pageIds.templateText);
        const template = select.value;
        if (template) {
            templates[template] = textArea.value;
            saveTemplates();
            populateTemplateMenu();
        }
    }

    function addTemplate() {
        const name = prompt('Enter template name:');
        if (name && !templates[name]) {
            templates[name] = '';
            saveTemplates();
            populateTemplateMenu();
            populateTemplateSelect();
        }
    }

    function deleteTemplate() {
        const select = document.getElementById(pageIds.templateSelect);
        const template = select.value;
        if (template && confirm(`Delete ${template}?`)) {
            delete templates[template];
            saveTemplates();
            populateTemplateMenu();
            populateTemplateSelect();
        }
    }
}

// Data Management for Storytelling
let storytellingEntries = [];
if (page === 'storytelling') {
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

    function saveStorytellingEntries() {
        localStorage.setItem('storytellingEntries', JSON.stringify(storytellingEntries));
    }

    function suggestCategory() {
        const text = document.getElementById('input-text').value;
        const suggestion = document.getElementById('suggestion');
        // Enhanced keyword-based suggestion
        if (text.includes('begin') || text.includes('start')) {
            suggestion.textContent = 'introduction';
        } else if (text.includes('idea') || text.includes('brainstorm')) {
            suggestion.textContent = 'idea-generation';
        } else if (text.includes('world') || text.includes('lore')) {
            suggestion.textContent = 'world-building';
        } else if (text.includes('character') || text.includes('develop')) {
            suggestion.textContent = 'character-development';
        } else if (text.includes('plot') || text.includes('structure')) {
            suggestion.textContent = 'plot-structuring';
        } else if (text.includes('subplot') || text.includes('twist')) {
            suggestion.textContent = 'subplot-exploration';
        } else if (text.includes('detail') || text.includes('dialogue')) {
            suggestion.textContent = 'detail-enhancement';
        } else if (text.includes('theme') || text.includes('tone')) {
            suggestion.textContent = 'thematic-guidance';
        } else if (text.includes('consistency') || text.includes('check')) {
            suggestion.textContent = 'consistency-check';
        } else if (text.includes('refine') || text.includes('improve')) {
            suggestion.textContent = 'improvement-and-refinement';
        } else {
            suggestion.textContent = 'None';
        }
    }

    function addTextToFramework() {
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
    }

    function downloadLibraryFile() {
        const blob = new Blob([JSON.stringify(storytellingEntries, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'library.json';
        a.click();
        URL.revokeObjectURL(url);
    }

    function toggleAllEntries() {
        const entries = document.querySelectorAll('.text-entries');
        entries.forEach(entry => {
            entry.style.display = entry.style.display === 'none' ? 'block' : 'none';
        });
    }

    function exportToHtml() {
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
    }

    function loadLibraryFile(event) {
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
    }
}

// Mode Switching Functions
function showEditMode() {
    if (pageIds.editMode && pageIds.textDisplay) {
        document.getElementById(pageIds.editMode).style.display = 'block';
        document.getElementById(pageIds.textDisplay).style.display = 'none';
    }
}

function showTextDisplay(title, text) {
    if (pageIds.editMode && pageIds.textDisplay && pageIds.title && pageIds.text) {
        document.getElementById(pageIds.editMode).style.display = 'none';
        document.getElementById(pageIds.textDisplay).style.display = 'block';
        document.getElementById(pageIds.title).textContent = title;
        document.getElementById(pageIds.text).textContent = text;
    }
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    if (page === 'stories') {
        loadStories();
        populateStoryMenu();
        populateStorySelect();
        showEditMode();
    } else if (page === 'templates') {
        loadTemplates();
        populateTemplateMenu();
        populateTemplateSelect();
        showEditMode();
    } else if (page === 'storytelling') {
        loadStorytellingEntries();
        const inputText = document.getElementById('input-text');
        if (inputText) {
            inputText.addEventListener('input', suggestCategory);
        }
    }
});