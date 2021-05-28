// Select Elements
const form = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo");
const todoList = document.querySelector(".list-group");
const firstCardBody = document.querySelectorAll(".todos-container")[0];
const secondCardBody = document.querySelectorAll(".todos-container")[1];
const filter = document.querySelector("#filter");
const clearAllTodosButton = document.querySelector("#clear-all-todos");

eventListeners();

function eventListeners(){
    form.addEventListener("submit", addTodo);
    document.addEventListener("DOMContentLoaded", loadAllTodosToUI)
    secondCardBody.addEventListener("click", deleteTodo);
    filter.addEventListener("keyup", filterTodos);
    clearAllTodosButton.addEventListener("click", clearAllTodos);
}
function showAlert(type, message){
    const alert = document.createElement("div");
    
    alert.className = `alert alert-${type}`;
    alert.textContent = message;

    if (firstCardBody.childElementCount > 1){
        firstCardBodyArray = Array.from(firstCardBody.children);
        firstCardBodyArray[1].remove();
    }
    
    firstCardBody.appendChild(alert);

    window.setTimeout(function(){
        alert.remove();
    }, 2000);
}
function addTodo(e){
    const newTodo = todoInput.value.trim();
    let todos = getTodosFromStorage();
    console.log(newTodo, todos);
    if (newTodo === ""){
        showAlert("danger", "Please write a todo.");
    }
    else if (newTodo in todos){
        console.log("evet");
    }
    else{
        addTodoToUI(newTodo);
        addTodoToStorage(newTodo);

        showAlert("success", "Todo added successfully.");
    }
    e.preventDefault();
}
function addTodoToUI(newTodo){
    const listItem = document.createElement("li");
    const link = document.createElement("a");
    const text = document.createElement("p");
    
    link.href = "";
    link.innerHTML = "<i class = 'fa fa-remove'></i>";

    text.textContent = newTodo;

    listItem.className = "list-group-item";
    listItem.appendChild(text);
    listItem.appendChild(link);

    todoList.appendChild(listItem);

    todoInput.value = "";
}
function deleteTodo(e){
    if (e.target.className === "fa fa-remove"){
        e.target.parentElement.parentElement.remove();
        deleteTodoFromStorage(e.target.parentElement.previousElementSibling.textContent);
        showAlert("success", "Todo deleted successfully.");
    }

    e.preventDefault();
}
function deleteTodoFromStorage(deletetodo){
    console.log(deletetodo);
    let todos = getTodosFromStorage();

    todos.forEach(function(todo, index){
        if (todo === deletetodo){
            todos.splice(index, 1);
        }
    });

    localStorage.setItem("todos", JSON.stringify(todos));
}
function filterTodos(e){
    const filterValue = e.target.value.toLowerCase();
    const listItems = document.querySelectorAll(".list-group-item");

    listItems.forEach(function(listItem){
        const text = listItem.children[0].textContent.toLowerCase();
        if (text.indexOf(filterValue) === -1){
            listItem.setAttribute("style","display : none !important");
        }
        else {
            listItem.setAttribute("style","display : flex");
        }
    });

}
function addTodoToStorage(newTodo){
    let todos = getTodosFromStorage();

    todos.push(newTodo);

    localStorage.setItem("todos", JSON.stringify(todos));
}
function getTodosFromStorage(){
    let todos;

    if (localStorage.getItem("todos") === null){
        todos = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    return todos;
}
function loadAllTodosToUI(){
    let todos = getTodosFromStorage();

    todos.forEach(function(todo){
        addTodoToUI(todo);
    })
}
function clearAllTodos(e){
    if (confirm("Tümünü silmek istediğinize emin misiniz ?")) {
        // Arayüzden todoları temizleme
        // todoList.innerHTML = ""; // Yavaş
        console.log(todoList.firstElementChild);
        while(todoList.firstElementChild != null) {
            todoList.removeChild(todoList.firstElementChild);
        }
        localStorage.removeItem("todos");
    }
}