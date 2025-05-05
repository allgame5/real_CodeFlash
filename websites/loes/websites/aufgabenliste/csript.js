document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('task-input');
    const addTaskButton = document.getElementById('add-task');
    const taskList = document.getElementById('task-list');

    // Lade Aufgabenliste aus dem Webspeicher
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    // Initialisiere die Aufgabenliste
    tasks.forEach(task => {
        addTaskToList(task);
    });

    // Event-Listener für das Hinzufügen einer Aufgabe
    addTaskButton.addEventListener('click', () => {
        const taskText = taskInput.value.trim();

        if (taskText !== '') {
            const task = { id: Date.now(), text: taskText, completed: false };
            tasks.push(task);
            addTaskToList(task);
            saveTasks();
            taskInput.value = '';
        }
    });

    // Funktion zum Hinzufügen einer Aufgabe zur Liste
    function addTaskToList(task) {
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${task.text}</span>
            <button class="edit-btn" data-id="${task.id}">Bearbeiten</button>
            <button class="delete-btn" data-id="${task.id}">Löschen</button>
            <button class="complete-btn" data-id="${task.id}">Erledigt</button>
        `;
        if (task.completed) {
            li.classList.add('completed');
        }
        taskList.appendChild(li);
    }

    // Event-Listener für das Löschen, Bearbeiten oder Markieren einer Aufgabe als erledigt
    taskList.addEventListener('click', (e) => {
        const taskId = parseInt(e.target.getAttribute('data-id'));
        const task = getTaskById(taskId);

        if (e.target.classList.contains('delete-btn')) {
            deleteTask(taskId);
        } else if (e.target.classList.contains('edit-btn')) {
            const newText = prompt('Bearbeiten Sie die Aufgabe:', task.text);
            if (newText !== null) {
                editTask(taskId, newText);
            }
        } else if (e.target.classList.contains('complete-btn')) {
            toggleTaskCompleted(taskId);
        }
    });

    // Funktion zum Löschen einer Aufgabe
    function deleteTask(taskId) {
        tasks = tasks.filter(task => task.id !== taskId);
        saveTasks();
        renderTasks();
    }

    // Funktion zum Bearbeiten einer Aufgabe
    function editTask(taskId, newText) {
        const taskIndex = tasks.findIndex(task => task.id === taskId);
        tasks[taskIndex].text = newText;
        saveTasks();
        renderTasks();
    }

    // Funktion zum Markieren einer Aufgabe als erledigt
    function toggleTaskCompleted(taskId) {
        const taskIndex = tasks.findIndex(task => task.id === taskId);
        tasks[taskIndex].completed = !tasks[taskIndex].completed;
        saveTasks();
        renderTasks();
    }

    // Funktion zum Rendern der Aufgabenliste
    function renderTasks() {
        taskList.innerHTML = '';
        tasks.forEach(task => {
            addTaskToList(task);
        });
    }

    // Funktion zum Speichern der Aufgabenliste im Webspeicher
    function saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Funktion zum Abrufen einer Aufgabe anhand ihrer ID
    function getTaskById(taskId) {
        return tasks.find(task => task.id === taskId);
    }
});
