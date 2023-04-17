import React, { useState } from "react";
import style from "./TodoListItem.module.css";
import PropTypes from "prop-types";

function TodoListItem({ todo, onRemoveTodo }) {
  const { title, id, createdTime } = todo;
  const [isChecked, setIsChecked] = useState(false);

  return (
    <div className={style.container}>
      <li className={style.ListItem}>
        <div className={style.checkboxContainer}>
          <input
            className={style.checkbox}
            type="checkbox"
            checked={isChecked}
            onChange={() => setIsChecked(!isChecked)}
          />
          <span style={{ textDecoration: isChecked ? "line-through" : "none" }}>
            {<p>{createdTime}</p>}
            {<p className={style.itemTitle}>{title}</p>}
          </span>
        </div>

        <button
          className={style.button}
          onClick={() => onRemoveTodo(id)}
        >
          Remove
        </button>
      </li>
    </div>
  );
}

TodoListItem.propTypes = {
  todo: PropTypes.object,
  onRemoveTodo: PropTypes.func,
};

export default TodoListItem;
