const tasksKey = "tasks";

let todos = [
  {
    name: "Ammar Task",
  },
];

// if (localStorage.getItem(tasksKey)) {
//   tasks = localStorage.getItem(tasksKey);
//   tasks = JSON.parse(tasks);
// }

function save() {
  localStorage.setItem(tasksKey, JSON.stringify(todos));
}

export default {
  getAllTodos() {
    return todos;
  },
  addTodo(taskObj) {
    todos.push(taskObj);
    // for (let todo of todos) {
    //   console.log(todo.name);
    // }
    save();
  },
};
