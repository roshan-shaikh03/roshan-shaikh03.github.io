let task = document.getElementById("task");
let displayContainer = document.querySelector(".display-container");
let form = document.getElementById('taskForm');
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function addTaskToDisplay(taskText, index, timestamp) {
  const newTask = createTaskElement(taskText, index, timestamp);
  addRemoveButton(newTask, taskText);
  displayTask(newTask);
}

function createTaskElement(taskText, index, timestamp) {
  const newTask = document.createElement("h3");
  newTask.className = "taskText";
  const taskInfo = document.createElement("span");
  taskInfo.className = "task-info";
  taskInfo.textContent = `Added on ${timestamp}`;
  newTask.textContent = `${index + 1}. ${taskText}`;
  newTask.contentEditable = false;
  newTask.appendChild(taskInfo);
  return newTask;
}

function addRemoveButton(taskElement, taskText) {
  const removeButton = document.createElement("button");
  removeButton.textContent = "Remove";
  removeButton.className = "remove-button";
  removeButton.addEventListener('click', () => removeTask(taskElement, taskText));
  taskElement.appendChild(removeButton);
}

function removeTask(taskElement, taskText) {
  const taskIndex = tasks.indexOf(taskText);
  if (taskIndex > -1) {
    tasks.splice(taskIndex, 1);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    displayContainer.removeChild(taskElement);
  }
}

function displayTask(taskElement) {
  displayContainer.insertBefore(taskElement, displayContainer.firstChild);
}

tasks.forEach((taskText, index) => {
  // Capture the current date and time when adding the task
  const timestamp = new Date().toLocaleString();
  addTaskToDisplay(taskText, index, timestamp);
});

document.getElementById('add').addEventListener('click', (event) => {
  event.preventDefault();
  if (task.value === "") {
    return;
  } else {
    const newTaskText = task.value;
    tasks.push(newTaskText);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    const timestamp = new Date().toLocaleString();
    const newTaskElement = createTaskElement(newTaskText, 0, timestamp); // Display as the first task
    addRemoveButton(newTaskElement, newTaskText);
    displayTask(newTaskElement);
    task.value = '';
  }
});

let backClicks = 0;

window.addEventListener('popstate', () => {
  backClicks++;
  if (backClicks === 1) {
    history.pushState({ page: 'index' }, '', '/index.html');
  } else if (backClicks === 2) {
    window.close();
  }
});

history.replaceState({ page: 'index' }, '', '/index.html');
