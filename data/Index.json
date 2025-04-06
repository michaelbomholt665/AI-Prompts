// data/stories.js

// Detect the current page
const page = document.body.getAttribute('data-page');

// Define page-specific IDs for stories
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
    }
};

// Use page-specific IDs if available
const pageIds = ids[page] || {};

// Data Management for Stories
let stories = {};

// Load stories from localStorage
function loadStories() {
    const storedStories = localStorage.getItem('stories');
    if (storedStories) Object.assign(stories, JSON.parse(storedStories));
}

// Save stories to localStorage
function saveStories() {
    localStorage.setItem('stories', JSON.stringify(stories));
}

// Populate the story menu in the sidebar
function populateStoryMenu() {
    const menu = document.getElementById(pageIds.menu);
    menu.innerHTML = '';
    for (const story in stories) {
        const li = document.createElement('li');
        li.innerHTML = `<a onclick="document.getElementById('${pageIds.storySelect}').value='${story}';populateBookSelect();">${story}</a>`;
        menu.appendChild(li);
    }
}

// Populate the story dropdown
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

// Populate the book dropdown based on selected story
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

// Populate the chapter dropdown based on selected book
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

// Load the selected chapter's text into the textarea
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

// Save the chapter text to the stories object
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

// Add a new story
function addStory() {
    const name = prompt('Enter story name:');
    if (name && !stories[name]) {
        stories[name] = {};
        saveStories();
        populateStoryMenu();
        populateStorySelect();
    }
}

// Delete the selected story
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

// Add a new book to the selected story
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

// Delete the selected book
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

// Add a new chapter to the selected book
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

// Delete the selected chapter
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

// Get the current chapter title
function getCurrentChapterTitle() {
    const storySelect = document.getElementById(pageIds.storySelect);
    const bookSelect = document.getElementById(pageIds.bookSelect);
    const chapterSelect = document.getElementById(pageIds.chapterSelect);
    return `${storySelect.value} - ${bookSelect.value} - ${chapterSelect.value}`;
}

// Initialize stories page
if (page === 'stories') {
    loadStories();
    populateStoryMenu();
    populateStorySelect();
    showEditMode();
}