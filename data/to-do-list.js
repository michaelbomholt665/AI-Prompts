// data/to-do-list.js

// Detect the current page
const page = document.body.getAttribute('data-page');

// Define page-specific IDs
const ids = {
    to_do_list: {
        inputText: 'input-text',
        tasks: 'tasks'
    }
};

const pageIds = ids[page] || {};

let todoTasks = [];
const storedTasks = localStorage.getItem('todoTasks');
if (storedTasks) {
    todoTasks = JSON.parse(storedTasks);
}

function loadTodoTasks() {
    const tasksContainer = document.querySelector(`#${pageIds.tasks} .text-entries`);
    if (tasksContainer) {
        tasksContainer.innerHTML = '';
        todoTasks.forEach((task, index) => {
            const taskSection = document.createElement('section');
            taskSection.className = 'task';
            taskSection.innerHTML = `
                <h3>Task: ${index + 1}</h3>
                <p>${nl2br(task)}</p>
                <button class="delete-task" onclick="deleteTask(${index})">Delete Task</button>
            `;
            tasksContainer.appendChild(taskSection);
        });
    }
}

function addTask() {
    const text = document.getElementById(pageIds.inputText).value;
    if (text) {
        todoTasks.push(text);
        localStorage.setItem('todoTasks', JSON.stringify(todoTasks));
        loadTodoTasks();
        document.getElementById(pageIds.inputText).value = '';
    } else {
        alert("Please enter a task description.");
    }
}

function deleteTask(index) {
    if (confirm("Are you sure you want to delete this task?")) {
        todoTasks.splice(index, 1);
        localStorage.setItem('todoTasks', JSON.stringify(todoTasks));
        loadTodoTasks();
    }
}

// Assuming nl2br is in script.js; if not, uncomment below
// function nl2br(text) {
//     return text.replace(/\n/g, '<br>');0
// }

// Initialize page
if (page === 'to_do_list') {
    loadTodoTasks();
    console.log("To-Do List page initialized");
}