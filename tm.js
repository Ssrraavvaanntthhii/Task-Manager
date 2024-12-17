// Get references to the input, button, task list, and Clear All button
const taskInput = document.getElementById("taskInput");
const addTaskButton = document.getElementById("addTaskButton");
const taskList = document.getElementById("taskList");
const clearTasksButton = document.getElementById("clearTasksButton");
const taskCounter = document.getElementById("taskCounter");
const prioritySelect = document.getElementById("prioritySelect");
const toggleCompletedButton = document.getElementById("toggleCompleted");
const sortTasksButton = document.getElementById("sortTasksButton");

// State to keep track of tasks
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let hideCompleted = false;

// Load tasks when the page loads
window.onload = () => {
  renderTasks();
  updateTaskCounter();
};

// Save tasks to local storage
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Add a new task
function addTask() {
  const taskValue = taskInput.value.trim();
  const priority = prioritySelect.value;

  if (taskValue === "") {
    alert("Please enter a task.");
    return;
  }

  // Add task to the array
  tasks.push({ name: taskValue, priority: priority, completed: false });
  saveTasks();
  renderTasks();
  updateTaskCounter();

  // Clear the input field and refocus
  taskInput.value = "";
  taskInput.focus();
}

// Render tasks on the page
function renderTasks() {
  taskList.innerHTML = "";

  let filteredTasks = tasks.filter((task) => !(hideCompleted && task.completed));

  filteredTasks.forEach((task, index) => {
    const taskElement = document.createElement("div");
    taskElement.classList.add("task");
    if (task.completed) taskElement.classList.add("completed");

    const taskNameSpan = document.createElement("span");
    taskNameSpan.textContent = `${task.name} [${task.priority}]`;

    const taskButtons = document.createElement("div");
    taskButtons.classList.add("task-buttons");

    const completeButton = document.createElement("button");
    completeButton.textContent = "Complete";
    completeButton.classList.add("complete");
    completeButton.addEventListener("click", () => {
      tasks[index].completed = !tasks[index].completed;
      saveTasks();
      renderTasks();
      updateTaskCounter();
    });

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", () => {
      tasks.splice(index, 1);
      saveTasks();
      renderTasks();
      updateTaskCounter();
    });

    taskButtons.appendChild(completeButton);
    taskButtons.appendChild(deleteButton);

    taskElement.appendChild(taskNameSpan);
    taskElement.appendChild(taskButtons);

    taskList.appendChild(taskElement);
  });
}

// Update task counter
function updateTaskCounter() {
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((task) => task.completed).length;
  const remainingTasks = totalTasks - completedTasks;

  taskCounter.textContent = `Tasks: ${totalTasks} | Completed: ${completedTasks} | Remaining: ${remainingTasks}`;
}

// Event listener for the Add Task button
addTaskButton.addEventListener("click", addTask);

// Optional: Add task on pressing Enter
taskInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    addTask();
  }
});

// Clear all tasks
clearTasksButton.addEventListener("click", () => {
  tasks = [];
  saveTasks();
  renderTasks();
  updateTaskCounter();
});

// Toggle completed tasks visibility
toggleCompletedButton.addEventListener("click", () => {
  hideCompleted = !hideCompleted;
  toggleCompletedButton.textContent = hideCompleted
    ? "Show Completed"
    : "Hide Completed";
  renderTasks();
});

// Sort tasks by priority
sortTasksButton.addEventListener("click", () => {
  const priorityOrder = { High: 1, Medium: 2, Low: 3 };
  tasks.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
  saveTasks();
  renderTasks();
});
