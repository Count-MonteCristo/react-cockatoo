import React, { useEffect, useState } from "react";
import AddTodoForm from "./components/AddTodoForm";
import TodoList from "./components/TodoList";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import style from "./App.module.css";
import { ReactComponent as Graphic } from "./todoList.svg";

const url = `https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_ID}/Default`;

function App() {
  const [todoList, setTodoList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_KEY}`,
      },
    };

    fetch(url, options)
      .then((resp) => resp.json())
      .then((result) => {
        const todos = result.records.map((item) => ({
          id: item.id,
          title: item.fields.Title,
          createdTime: item.fields.Created,
        }));

        setTodoList([...todos]);
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem("savedTodoList", JSON.stringify(todoList));
    }
  }, [todoList, isLoading]);

  function addTodo(newTodo) {
    setTodoList([...todoList, newTodo]);
  }

  function removeTodo(id) {
    setTodoList(todoList.filter((todo) => todo.id !== id));
  }

  function getCurrentDate() {
    const date = new Date();
    const options = { month: "short", day: "numeric" };
    return date.toLocaleString("en-US", options);
  }

  function CurrentDate() {
    const currentDate = getCurrentDate();

    return (
      <div className={style.date}>
        <h3 className={style.month}>{currentDate.split(" ")[0]}</h3>
        <h3 className={style.day}>{currentDate.split(" ")[1]}</h3>
      </div>
    );
  }

  function Greeting() {
    const date = new Date();
    const hour = date.getHours();
    let greeting;

    if (hour < 12) {
      greeting = "Good morning";
    } else if (hour >= 12 && hour < 18) {
      greeting = "Good afternoon";
    } else {
      greeting = "Good evening";
    }

    return (
      <div>
        <h1>{greeting}, Luis!</h1>
        <h2>What's your plan for today?</h2>
      </div>
    );
  }

  function appJSX() {
    return (
      <div className={style.todoListContainer}>
        <div className={style.flexContainer}>
          <div className={style.imageContainer}>
            <Graphic className={style.image} />
          </div>
          <div className={style.app}>
            <div className={style.header}>
              <CurrentDate />
              <Greeting />
            </div>

            <AddTodoForm onAddTodo={addTodo} />

            {isLoading ? (
              <p>Loading ...</p>
            ) : (
              <TodoList todoList={todoList} onRemoveTodo={removeTodo} />
            )}
            <div className={style.coloredStrip}>
              <a href="https://storyset.com/work">Graphic by Storyset</a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" exact element={appJSX()}></Route>
        <Route path="/new" element={<h1>New Todo List</h1>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
