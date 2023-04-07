import { useEffect, useRef } from "react";
import style from "./InputWithLabel.module.css";
import PropTypes from "prop-types";

const InputWithLabel = ({ todoTitle, handleTitleChange, children }) => {
  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
  });

  return (
    <div className={style.inputContainer}>
      <label className={style.label} htmlFor="title">
        {children}
      </label>
      <input
        className={style.input}
        ref={inputRef}
        placeholder="Add Task"
        type="text"
        id="todoTitle"
        name="title"
        value={todoTitle}
        onChange={handleTitleChange}
      />
    </div>
  );
};

InputWithLabel.propTyps = {
  todoTitle: PropTypes.string,
  handleTitleChange: PropTypes.func,
  children: PropTypes.children,
};

export default InputWithLabel;
