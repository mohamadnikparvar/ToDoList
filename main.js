const todoInput = document.querySelector(".todo-input")
const todoButton = document.querySelector(".todo-button")
const todoList = document.querySelector(".todo-list")
const filterOption = document.querySelector(".filter-todo")

todoButton.addEventListener("click",addTodo);
todoList.addEventListener("click",deleteCompleteTodo)
filterOption.addEventListener("click",filterTodo)
document.addEventListener("DOMContentLoaded",getTodos)

function addTodo(e) {
    e.preventDefault()

    const todoDiv = document.createElement("div")
    todoDiv.classList.add("todo")

    const newTodo = document.createElement("li")
    newTodo.innerText = todoInput.value;
    newTodo.classList.add("todo-item")
    todoDiv.appendChild(newTodo)

    saveLocalTodos(todoInput.value)

    todoInput.value = "";

    const completedButton = document.createElement("button")
    completedButton.classList.add("complete-btn")
    completedButton.innerHTML =`<i class="fas fa-check"></i>`
    todoDiv.appendChild(completedButton)

    const trashButton = document.createElement("button")
    trashButton.classList.add("trash-btn")
    trashButton.innerHTML =`<i class="fas fa-trash"></i>`
    todoDiv.appendChild(trashButton)

    todoList.appendChild(todoDiv)
}

function deleteCompleteTodo(e) {
    const item = e.target
    if (item.classList[0] === "trash-btn"){
        const todo = item.parentElement
        item.parentElement.remove()
        removeLocalTodo(todo)
    }else if (item.classList[0]=== "complete-btn"){
        item.parentElement.classList.toggle("completed")
    }
}

function filterTodo(e) {
    const todos = todoList.childNodes
    todos.forEach(function (todo) {
      const item = e.target.value
      switch(item){
          case "all":
              todo.style.display = "flex"
              break;
                 case "completed":
                     if (todo.classList.contains("completed")){
                        todo.style.display = "flex"
                     }else {
                        todo.style.display = "None"
                     }
                     break;
                     case "uncompleted":
                        if (todo.classList.contains("completed")){
                           todo.style.display = "None"
                        }else {
                           todo.style.display = "flex"
                        }
                        break;
      }
    })
}

function saveLocalTodos(todo) {
    let todos;
    if (localStorage.getItem("todos")=== null){
        todos =[]
    }else {
        todos =JSON.parse(localStorage.getItem("todos"))
    }
    todos.push(todo)
    localStorage.setItem("todos",JSON.stringify(todos))
}

function removeLocalTodo(todo) {
    let todos;
    if (localStorage.getItem("todos")=== null){
        todos =[]
    }else {
        todos =JSON.parse(localStorage.getItem("todos"))
    }
    const todoIndex =todo.children[0].innerText
    todos.splice(todos.indexOf(todoIndex),1)
    localStorage.setItem("todos",JSON.stringify(todos))
}

function getTodos() {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    };
    todos.forEach(function (todo) {
        const todoDiv = document.createElement("div");
        todoDiv.classList.add("todo");

        const newTodo = document.createElement("li");
        newTodo.innerText = todo;

        newTodo.classList.add("todo-item");
        todoDiv.appendChild(newTodo);

        const completedButton = document.createElement("button");
        completedButton.innerHTML = "<i class='fas fa-check'></i>";
        completedButton.classList.add("complete-btn");
        todoDiv.appendChild(completedButton);

        const trashButton = document.createElement("button");
        trashButton.innerHTML = "<i class='fas fa-trash'></i>";
        trashButton.classList.add("trash-btn");
        todoDiv.appendChild(trashButton);

        todoList.appendChild(todoDiv)
    })
}