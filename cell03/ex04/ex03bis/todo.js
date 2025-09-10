$(document).ready(function() {
  function createTodoElement(text) {
    const $div = $("<div>").text(text).addClass("todo-item");
    $div.on("click", removeTodo);
    return $div;
  }

  function addTodo() {
    const todoText = $("#todoInput").val().trim();
    if (!todoText) {
      alert("Task cannot be empty!");
      return;
    }

    const $div = createTodoElement(todoText);
    $("#ft_list").prepend($div);
    $("#todoInput").val("");
    saveTodos();
  }

  function removeTodo() {
    const $todoDiv = $(this);
    const confirmation = confirm("Do you want to remove this task?");

    if (confirmation === true) {
      $todoDiv.remove();
      saveTodos();
    }
  }

  function saveTodos() {
    const todos = [];
    $("#ft_list .todo-item").each(function() {
      todos.push($(this).text());
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
    
    for (let i = todos.length - 1; i >= 0; i--) {
        const $div = createTodoElement(todos[i]);
        $("#ft_list").prepend($div);
    }
  }

  loadTodos();
  $("#newTaskButton").on("click", addTodo);
});