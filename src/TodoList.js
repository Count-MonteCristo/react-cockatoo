import React from "react";

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
      {todoList.map(function (todoItem) {
        return <li key={todoItem.id}>{todoItem.title}</li>;
      })}
    </ul>
  );
}

export default TodoList;
