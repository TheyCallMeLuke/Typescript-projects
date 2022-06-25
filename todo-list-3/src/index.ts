import { v4 as uuidV4 } from "uuid";
import _remove from "lodash/remove";

type Task = {
  id: string,
  title: string,
  completed: boolean,
  createdAt: Date
}

const form = document.querySelector<HTMLFormElement>("#new-task-form");
const input = document.querySelector<HTMLInputElement>("#new-task-input");
const tasksElement = document.querySelector<HTMLDivElement>("#tasks");
const tasks = loadTasks();
tasks.forEach(addListItem);

form?.addEventListener("submit", (e) => {
  e.preventDefault();

  if (input?.value == "" || input?.value == null)
    return;

  const newTask: Task = {
    id: uuidV4(),
    title: input.value,
    completed: false,
    createdAt: new Date()
  };

  tasks.push(newTask);
  saveTasks();

  addListItem(newTask);

  input.value = "";
});

function addListItem(task: Task) {

  const taskText = task.title;
  const taskElement = document.createElement("div");
  taskElement.classList.add("task");

  const taskInfoElement = document.createElement("div");
  taskInfoElement.classList.add("task-info");

  const taskCompletionElement = document.createElement("input");
  taskCompletionElement.classList.add("completion");
  taskCompletionElement.type = "checkbox";
  taskCompletionElement.checked = task.completed;
  taskCompletionElement.addEventListener("change", () => {
    task.completed = taskCompletionElement.checked;
    saveTasks();
  });

  const contentElement = document.createElement("div");
  contentElement.classList.add("content");

  const taskInputElement = document.createElement("input");
  taskInputElement.classList.add("text");
  taskInputElement.type = "text";
  taskInputElement.value = taskText;
  taskInputElement.setAttribute("readonly", "readonly");

  const actionsElement = document.createElement("div");
  actionsElement.classList.add("actions");

  const taskEditElement = document.createElement("button");
  taskEditElement.classList.add("edit");
  taskEditElement.innerHTML = "Edit";
  taskEditElement.addEventListener("click", () => {
    if (taskEditElement.innerHTML.toLowerCase() === "edit") {
      taskEditElement.innerHTML = "Save";
      taskInputElement.removeAttribute("readonly");
      taskInputElement.focus();
    } else {
      const index = tasks.findIndex(t => t.id === task.id);
      tasks[index].title = taskInputElement.value;
      saveTasks();
      taskEditElement.innerHTML = "Edit";
      taskInputElement.setAttribute("readonly", "readonly");
    }
  });

  const taskDeleteElement = document.createElement("button");
  taskDeleteElement.classList.add("delete");
  taskDeleteElement.innerHTML = "Delete";
  taskDeleteElement.addEventListener("click", (e) => {
    tasksElement?.removeChild(taskElement);
    _remove(tasks, (t) => t.id == task.id);
    saveTasks();
  });

  contentElement.appendChild(taskInputElement);
  taskInfoElement.appendChild(taskCompletionElement);
  taskInfoElement.appendChild(contentElement);
  actionsElement.appendChild(taskEditElement);
  actionsElement.appendChild(taskDeleteElement);
  taskElement.appendChild(taskInfoElement);
  taskElement.appendChild(actionsElement);
  tasksElement?.appendChild(taskElement);
}

function saveTasks() {
  localStorage.setItem("TASKS", JSON.stringify(tasks));
}

function loadTasks(): Task[] {
  const taskJSON = localStorage.getItem("TASKS");
  if (taskJSON == null)
    return [];
  return JSON.parse(taskJSON);
}