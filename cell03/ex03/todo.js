function createTodoElement(text) {
    const div = document.createElement("div");
    div.textContent = text;
    div.className = "todo-item";
    div.addEventListener("click", removeTodo);
    return div;
}


function addTodo() {
    const todoInput = document.getElementById("todoInput");
    const todoText = todoInput.value.trim();
    if (!todoText) {
        alert("Task cannot be empty!");
        return;
    }

    const div = createTodoElement(todoText);
    const ftList = document.getElementById("ft_list");
    ftList.insertBefore(div, ftList.firstChild);
    todoInput.value = "";
    saveTodos();
}
function removeTodo(event) {
    
    const todoDiv = event.target;
    const confirmation = confirm("Do you want to remove this task?");
    
    if (confirmation === true) {
        todoDiv.remove();
        saveTodos();
    }
}


function saveTodos() {
    
    const ftList = document.getElementById("ft_list");
    const todoDivs = ftList.querySelectorAll(".todo-item");
    
   
    const todos = [];
    todoDivs.forEach(div => {
        todos.push(div.textContent);
    });
    
    const todosJSON = JSON.stringify(todos);
    
    
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + 7);
    document.cookie = `todos=${todosJSON}; expires=${expirationDate.toUTCString()}; path=/`;
}

function loadTodos() {

    const cookies = document.cookie.split("; ");
    let todosCookie = null;
    
    for (let cookie of cookies) {
        if (cookie.startsWith("todos=")) {
            todosCookie = cookie.substring(6); 
            break;
        }
    }
   
    if (!todosCookie) {
        return;
    }
    
    let todos;
    try {
        todos = JSON.parse(todosCookie);
    } catch (e) {
        return;
    }
    
    const ftList = document.getElementById("ft_list");
    todos.forEach(todoText => {
        const div = createTodoElement(todoText);
        ftList.insertBefore(div, ftList.firstChild);
    });
}

document.addEventListener("DOMContentLoaded", function() {
    loadTodos();
    document.getElementById("newTaskButton").addEventListener("click", addTodo);
});