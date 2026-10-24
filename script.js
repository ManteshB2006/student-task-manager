const taskForm = document.querySelector("#task-form");
const taskInput = document.querySelector("#task-input");
const taskDescription = document.querySelector("#task-description");
const taskSubject = document.querySelector("#task-subject");
const taskPriority = document.querySelector("#task-priority");
const taskDueDate = document.querySelector("#task-due-date");
const taskList = document.querySelector("#task-list");
const taskFilter = document.querySelector("#task-filter");

const totalCount = document.querySelector("#total-count");
const pendingCount = document.querySelector("#pending-count");
const completedCount = document.querySelector("#completed-count");
const progressText = document.querySelector("#progress-text");
const emptyMessage = document.querySelector("#empty-message");
const formMessage = document.querySelector("#form-message");
const formHeading = document.querySelector("#form-heading");
const submitTaskButton = document.querySelector("#submit-task");
const cancelEditButton = document.querySelector("#cancel-edit");
const clearCompletedButton = document.querySelector("#clear-completed");

const STORAGE_KEY = "student-task-manager-tasks";
const PRIORITIES = ["low", "medium", "high"];
const MAX_TITLE_LENGTH = 120;
const MAX_SUBJECT_LENGTH = 80;
const MAX_DESCRIPTION_LENGTH = 500;

function isValidDateTime(value) {
  return typeof value === "string" && !Number.isNaN(Date.parse(value));
}

function isValidDateOnly(value) {
  if (typeof value !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return false;
  }

  const [year, month, day] = value.split("-").map(Number);
  const date = new Date(year, month - 1, day);
  return (
    date.getFullYear() === year &&
    date.getMonth() === month - 1 &&
    date.getDate() === day
  );
}

function normalizeTask(task) {
  if (
    !task ||
    typeof task.id !== "string" ||
    typeof task.title !== "string" ||
    typeof task.completed !== "boolean"
  ) {
    return null;
  }

  const now = new Date().toISOString();
  const createdAt = isValidDateTime(task.createdAt) ? task.createdAt : now;
  const dueDate = isValidDateOnly(task.dueDate) ? task.dueDate : "";

  return {
    id: task.id,
    title: task.title,
    description:
      typeof task.description === "string"
        ? task.description.slice(0, MAX_DESCRIPTION_LENGTH)
        : "",
    subject:
      typeof task.subject === "string"
        ? task.subject.slice(0, MAX_SUBJECT_LENGTH)
        : "",
    priority: PRIORITIES.includes(task.priority) ? task.priority : "medium",
    dueDate,
    completed: task.completed,
    createdAt,
    updatedAt: isValidDateTime(task.updatedAt) ? task.updatedAt : createdAt
  };
}

function loadTasks() {
  try {
    const savedTasks = localStorage.getItem(STORAGE_KEY);

    if (!savedTasks) {
      return [];
    }

    const parsedTasks = JSON.parse(savedTasks);

    if (!Array.isArray(parsedTasks)) {
      throw new Error("Saved task data is not a list.");
    }

    const normalizedTasks = parsedTasks.map(normalizeTask).filter(Boolean);

    if (JSON.stringify(parsedTasks) !== JSON.stringify(normalizedTasks)) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(normalizedTasks));
      } catch (error) {
        console.error("Could not migrate saved tasks:", error);
        formMessage.textContent =
          "Your older tasks were loaded, but their updated format could not be saved.";
      }
    }

    return normalizedTasks;
  } catch (error) {
    console.error("Could not load saved tasks:", error);
    formMessage.textContent =
      "Saved task data could not be read. Your browser storage may be unavailable or corrupted.";
    return [];
  }
}

let tasks = loadTasks();
let editingTaskId = null;

function saveTasks(nextTasks) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(nextTasks));
    tasks = nextTasks;
    return true;
  } catch (error) {
    console.error("Could not save tasks:", error);
    formMessage.textContent = "Unable to save tasks in this browser.";
    return false;
  }
}

function createTask(formValues) {
  const now = new Date().toISOString();

  return {
    id:
      typeof crypto !== "undefined" && typeof crypto.randomUUID === "function"
        ? crypto.randomUUID()
        : `${Date.now()}-${Math.random().toString(16).slice(2)}`,
    ...formValues,
    completed: false,
    createdAt: now,
    updatedAt: now
  };
}

function getLocalDateString(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function formatDueDate(dateString) {
  const [year, month, day] = dateString.split("-").map(Number);
  return new Intl.DateTimeFormat(undefined, {
    dateStyle: "medium"
  }).format(new Date(year, month - 1, day));
}

function updateSummary() {
  const total = tasks.length;
  const completed = tasks.filter((task) => task.completed).length;
  const pending = total - completed;

  totalCount.textContent = total;
  pendingCount.textContent = pending;
  completedCount.textContent = completed;
  progressText.textContent = `${completed} of ${total} completed`;
}

function createTaskDetail(label, value, className) {
  const detail = document.createElement("span");
  detail.className = className;
  detail.textContent = value;
  detail.setAttribute("aria-label", `${label}: ${value}`);
  return detail;
}

function renderTasks() {
  taskList.replaceChildren();

  const filter = taskFilter.value;
  const today = getLocalDateString();
  const visibleTasks = tasks.filter((task) => {
    if (filter === "pending") {
      return !task.completed;
    }

    if (filter === "completed") {
      return task.completed;
    }

    return true;
  });

  visibleTasks.forEach((task) => {
    const item = document.createElement("li");
    item.className = "task-item";

    if (task.completed) {
      item.classList.add("is-completed");
    }

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.className = "task-checkbox";
    checkbox.checked = task.completed;
    checkbox.setAttribute(
      "aria-label",
      `Mark \"${task.title}\" as ${task.completed ? "pending" : "completed"}`
    );
    checkbox.addEventListener("change", () => toggleTask(task.id));

    const content = document.createElement("div");
    content.className = "task-content";

    const title = document.createElement("span");
    title.className = "task-title";
    title.textContent = task.title;
    content.append(title);

    const details = document.createElement("div");
    details.className = "task-details";
    details.append(
      createTaskDetail(
        "Priority",
        `${task.priority[0].toUpperCase()}${task.priority.slice(1)}`,
        `priority-badge priority-${task.priority}`
      )
    );

    if (task.subject) {
      details.append(createTaskDetail("Subject", task.subject, "task-subject"));
    }

    if (task.dueDate) {
      const isOverdue = !task.completed && task.dueDate < today;
      const dueDateText = `${isOverdue ? "Overdue · " : "Due · "}${formatDueDate(task.dueDate)}`;
      details.append(
        createTaskDetail(
          isOverdue ? "Overdue" : "Due date",
          dueDateText,
          `task-due-date${isOverdue ? " is-overdue" : ""}`
        )
      );
    }

    if (details.childElementCount > 0) {
      content.append(details);
    }

    if (task.description) {
      const description = document.createElement("p");
      description.className = "task-description";
      description.textContent = task.description;
      content.append(description);
    }

    const actions = document.createElement("div");
    actions.className = "task-actions";

    const editButton = document.createElement("button");
    editButton.type = "button";
    editButton.className = "edit-button";
    editButton.textContent = "Edit";
    editButton.setAttribute("aria-label", `Edit \"${task.title}\"`);
    editButton.addEventListener("click", () => beginEdit(task));

    const deleteButton = document.createElement("button");
    deleteButton.type = "button";
    deleteButton.className = "delete-button";
    deleteButton.textContent = "Delete";
    deleteButton.setAttribute("aria-label", `Delete \"${task.title}\"`);
    deleteButton.addEventListener("click", () => deleteTask(task.id));

    actions.append(editButton, deleteButton);
    item.append(checkbox, content, actions);
    taskList.append(item);
  });

  emptyMessage.hidden = visibleTasks.length > 0;

  if (visibleTasks.length === 0) {
    const messages = {
      all: tasks.length === 0 ? "No tasks yet. Add your first task above." : "No tasks to show.",
      pending: "No pending tasks. You're all caught up!",
      completed: "No completed tasks yet."
    };
    emptyMessage.textContent = messages[filter];
  }

  updateSummary();
}

function resetForm() {
  editingTaskId = null;
  taskForm.reset();
  taskPriority.value = "medium";
  formHeading.textContent = "Add a task";
  submitTaskButton.textContent = "Add task";
  cancelEditButton.hidden = true;
}

function beginEdit(task) {
  editingTaskId = task.id;
  taskInput.value = task.title;
  taskDescription.value = task.description;
  taskSubject.value = task.subject;
  taskPriority.value = task.priority;
  taskDueDate.value = task.dueDate;
  formHeading.textContent = "Edit task";
  submitTaskButton.textContent = "Save changes";
  cancelEditButton.hidden = false;
  formMessage.textContent = `Editing \"${task.title}\".`;
  taskInput.focus();
  taskForm.scrollIntoView({ behavior: "smooth", block: "center" });
}

function validateForm() {
  const title = taskInput.value.trim();
  const subject = taskSubject.value.trim();
  const description = taskDescription.value.trim();
  const dueDate = taskDueDate.value;

  if (!title) {
    formMessage.textContent = "Please enter a task title.";
    taskInput.focus();
    return null;
  }

  if (title.length > MAX_TITLE_LENGTH) {
    formMessage.textContent = `Task titles must be ${MAX_TITLE_LENGTH} characters or fewer.`;
    taskInput.focus();
    return null;
  }

  if (subject.length > MAX_SUBJECT_LENGTH) {
    formMessage.textContent = `Subjects must be ${MAX_SUBJECT_LENGTH} characters or fewer.`;
    taskSubject.focus();
    return null;
  }

  if (description.length > MAX_DESCRIPTION_LENGTH) {
    formMessage.textContent = `Descriptions must be ${MAX_DESCRIPTION_LENGTH} characters or fewer.`;
    taskDescription.focus();
    return null;
  }

  if (!PRIORITIES.includes(taskPriority.value)) {
    formMessage.textContent = "Please choose a valid priority.";
    taskPriority.focus();
    return null;
  }

  if (dueDate && !isValidDateOnly(dueDate)) {
    formMessage.textContent = "Please choose a valid due date.";
    taskDueDate.focus();
    return null;
  }

  return {
    title,
    description,
    subject,
    priority: taskPriority.value,
    dueDate
  };
}

function toggleTask(id) {
  const nextTasks = tasks.map((task) =>
    task.id === id
      ? { ...task, completed: !task.completed, updatedAt: new Date().toISOString() }
      : task
  );

  saveTasks(nextTasks);
  renderTasks();
}

function deleteTask(id) {
  const task = tasks.find((item) => item.id === id);
  if (!task || !window.confirm(`Delete \"${task.title}\"? This cannot be undone.`)) {
    return;
  }

  if (saveTasks(tasks.filter((item) => item.id !== id))) {
    renderTasks();
    formMessage.textContent = "Task deleted.";
  }
}

taskForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const formValues = validateForm();

  if (!formValues) {
    return;
  }

  if (editingTaskId) {
    const editedTask = tasks.find((task) => task.id === editingTaskId);
    if (!editedTask) {
      resetForm();
      formMessage.textContent = "That task could not be found. Please try again.";
      return;
    }

    const nextTasks = tasks.map((task) =>
      task.id === editingTaskId
        ? { ...task, ...formValues, updatedAt: new Date().toISOString() }
        : task
    );

    if (saveTasks(nextTasks)) {
      resetForm();
      renderTasks();
      formMessage.textContent = "Task updated successfully.";
      taskInput.focus();
    }
    return;
  }

  if (saveTasks([createTask(formValues), ...tasks])) {
    resetForm();
    taskFilter.value = "all";
    renderTasks();
    formMessage.textContent = "Task added successfully.";
    taskInput.focus();
  }
});

taskFilter.addEventListener("change", renderTasks);

cancelEditButton.addEventListener("click", () => {
  resetForm();
  formMessage.textContent = "Edit cancelled.";
  taskInput.focus();
});

clearCompletedButton.addEventListener("click", () => {
  const completedCountValue = tasks.filter((task) => task.completed).length;

  if (completedCountValue === 0) {
    formMessage.textContent = "There are no completed tasks to clear.";
    return;
  }

  if (
    !window.confirm(
      `Clear ${completedCountValue} completed task${completedCountValue === 1 ? "" : "s"}? This cannot be undone.`
    )
  ) {
    return;
  }

  if (saveTasks(tasks.filter((task) => !task.completed))) {
    renderTasks();
    formMessage.textContent = "Completed tasks cleared.";
  }
});

renderTasks();
