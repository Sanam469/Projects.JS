document.addEventListener("DOMContentLoaded", () => {
  const addButton = document.getElementById("add-task-btn");
  const todoInput = document.getElementById("todo-input");
  const todoList = document.getElementById("todo-list");
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach((task) => {
    renderTask(task);
  });
  addButton.addEventListener("click", () => {
    const text = todoInput.value.trim();
    if (text === "") return;
    const newTask = {
      name: text,
      id: Date.now(),
      completed: false,
    };
    tasks.push(newTask);
    todoInput.value = "";
    renderTask(newTask);
    save();
  });
  function renderTask(task) {
    const li = document.createElement("li");
    li.setAttribute("task-id", task.id);
    if (li.completed) li.classList.add("completed");
    li.innerHTML = `<span>${task.name}</span>
  <button>delete</button>`;
    li.addEventListener("click", (e) => {
      if (e.target.tagName == "BUTTON") return;
      task.completed = !task.completed;
      li.classList.toggle("completed");
      save();
    });
    li.querySelector("button").addEventListener("click", (e) => {
      e.stopPropagation();
      tasks = tasks.filter((t) => t.id != task.id);
      li.remove();
      save();
    });
    todoList.appendChild(li);
  }
  function save() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }
});
