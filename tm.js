// Get references to the input, button, task list, and Clear All button
const taskInput = document.getElementById("taskInput");
const addTaskButton = document.getElementById("addTaskButton");
const taskList = document.getElementById("taskList");
const clearTasksButton = document.getElementById("clearTasksButton");

// Load tasks from local storage when the page loads
window.onload = loadTasks;

function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach((task) => displayTask(task.name, task.completed));
}

// Save tasks to local storage
function saveTasks() {
  const tasks = [];
  document.querySelectorAll(".task").forEach((taskElement) => {
    tasks.push({
      name: taskElement.querySelector("span").textContent,
      completed: taskElement.classList.contains("completed"),
    });
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Display a task on the page
function displayTask(taskName, isCompleted = false) {
  // Create a task element
  const task = document.createElement("div");
  task.classList.add("task");
  if (isCompleted) {
    task.classList.add("completed");
  }

  // Task name
  const taskNameSpan = document.createElement("span");
  taskNameSpan.textContent = taskName;

  // Buttons container
  const taskButtons = document.createElement("div");
  taskButtons.classList.add("task-buttons");

  // Complete button
  const completeButton = document.createElement("button");
  completeButton.textContent = "Complete";
  completeButton.classList.add("complete");
  completeButton.addEventListener("click", () => {
    task.classList.toggle("completed");
    saveTasks();
  });

  // Delete button
  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  deleteButton.addEventListener("click", () => {
    taskList.removeChild(task);
    saveTasks();
  });

  // Append buttons to buttons container
  taskButtons.appendChild(completeButton);
  taskButtons.appendChild(deleteButton);

  // Append task name and buttons to task
  task.appendChild(taskNameSpan);
  task.appendChild(taskButtons);

  // Add task to the task list
  taskList.appendChild(task);
}

// Add a task
function addTask() {
  const taskValue = taskInput.value.trim();

  // Validate input
  if (taskValue === "") {
    alert("Please enter a task.");
    return;
  }

  // Display the task and save it
  displayTask(taskValue);
  saveTasks();

  // Clear the input field and refocus
  taskInput.value = "";
  taskInput.focus();
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
function clearTasks() {
  // Clear the task list in the UI
  taskList.innerHTML = "";

  // Clear the local storage
  localStorage.removeItem("tasks");
}

// Event listener for the Clear All button
clearTasksButton.addEventListener("click", clearTasks);
