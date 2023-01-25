import React, { useState } from "react";
import AddTodoForm from "./AddTodoForm";
import TodoList from "./TodoList";

function App() {
  const [todoList, setTodoList] = useState([]);

  function addTodo(newTodo) {
    setTodoList([...todoList, newTodo]);
  }

  return (
    <div>
      <header>
        <h1>Todo List</h1>
        <AddTodoForm onAddTodo={addTodo} />
        <TodoList todoList={todoList} />
      </header>
    </div>
  );
}

export default App;
