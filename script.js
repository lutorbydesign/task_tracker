document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('todo-form');
    const taskInput = document.getElementById('new-task');
    const todoList = document.getElementById('todo-list');
    const dayHeading = document.getElementById('day-heading');
    const queryParams = new URLSearchParams(window.location.search);
    const currentDay = queryParams.get('day');

    if (dayHeading && currentDay) {
        dayHeading.textContent = `To-Do List for ${currentDay}`;
    }

    const loadTasks = () => {
        const tasks = JSON.parse(localStorage.getItem(currentDay)) || [];
        tasks.forEach(task => addTaskToList(task));
    };

    const saveTasks = () => {
        const tasks = [];
        document.querySelectorAll('#todo-list li').forEach(li => {
            tasks.push(li.firstChild.textContent);
        });
        localStorage.setItem(currentDay, JSON.stringify(tasks));
    };

    const addTaskToList = (task) => {
        const li = document.createElement('li');
        li.textContent = task;

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.classList.add('delete');
        deleteButton.addEventListener('click', () => {
            todoList.removeChild(li);
            saveTasks();
        });

        li.appendChild(deleteButton);
        todoList.appendChild(li);
    };

    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const task = taskInput.value.trim();
            if (task) {
                addTaskToList(task);
                saveTasks();
                taskInput.value = '';
            }
        });
    }

    if (currentDay) {
        loadTasks();
    }
});