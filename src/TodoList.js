import React from "react";
import TodoListItem from "./TodoListItem";

const todoList = [
  {
    id: 1,
    title: "Complete Assignment",
  },
  {
    id: 2,
    title: "Review Assignment",
  },
  {
    id: 3,
    title: "Submit Assignment",
  },
];

function TodoList() {
  return (
    <ul>
      {todoList.map((todo) => (
        <TodoListItem key={todo.id} todo={todo} />
      ))}
    </ul>
  );
}

export default TodoList;
