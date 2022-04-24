const list = document.querySelector("#list") as HTMLUListElement
const form = document.querySelector("#new-task-form") as HTMLFormElement
const input = document.querySelector("#new-task-title") as HTMLInputElement
const tasks: Task[] = loadTasks()

tasks.forEach(addListItem)

type Task = {
    id: string
    title: string
    completed: boolean
    createAt: Date
  }


form.addEventListener("submit", e => {
  e.preventDefault

  if(input.value == "" || input.value == null) return
  const newTask: Task = {
    id: "1",
    title: input.value,
    completed: false,
    createAt: new Date()
  }
  tasks.push(newTask)
  saveTasks()
  addListItem(newTask)
})

function addListItem(task:Task) {
  const item = document.createElement("li")
  const label = document.createElement("label")
  const checkbox = document.createElement("input")
  checkbox.type = "checkbox"

  checkbox.addEventListener("change", () => {
    task.completed = checkbox.checked
    saveTasks()
  })

  checkbox.checked = task.completed
  label.append(checkbox, task.title)
  item.append(label)
  list.append(item)
}

function saveTasks() {
  localStorage.setItem("TASKS", JSON.stringify(tasks))
}

function loadTasks(): Task[] {
  const taskJSON = localStorage.getItem("TASKS")
  if(taskJSON == null) return []
  return JSON.parse(taskJSON)
}
