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
    localStorage.setItem("todos", JSON.stringify(todos));
  }

  function loadTodos() {
    const todosJSON = localStorage.getItem("todos");
    if (!todosJSON) {
      return;
    }

    let todos;
    try {
      todos = JSON.parse(todosJSON);
    } catch (e) {
      return;
    }

    // Prepend in reverse order to maintain original order in display (newest first)
    for (let i = todos.length - 1; i >= 0; i--) {
      const $div = createTodoElement(todos[i]);
      $("#ft_list").prepend($div);
    }
  }

  loadTodos();
  $("#newTaskButton").on("click", addTodo);
});