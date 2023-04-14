import React, { useEffect, useState } from "react";
import AddTodoForm from "./components/AddTodoForm";
import TodoList from "./components/TodoList";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import style from "./App.module.css";
import { ReactComponent as Graphic } from "./todoList.svg";
import { ReactComponent as Icon } from "./swap-vertical-outline.svg";
import { ReactComponent as Logo } from "./forge-icon.svg";
import { Link, useLocation } from 'react-router-dom';

const url = `https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_ID}/Default?view=Grid%20view&sort[0][field]=Title&sort[0][direction]=asc`;

function App() {
  const [todoList, setTodoList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState("ASC");

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

        const sortedTodos = todos.sort((a, b) => {
          if (sortOrder === "ASC") {
            //ascending order
            if (a.createdTime < b.createdTime) {
              return -1;
            } else if (a.createdTime > b.createdTime) {
              return 1;
            } else {
              return 0;
            }
          } else {
            //descending order
            if (a.createdTime < b.createdTime) {
              return 1;
            } else if (a.createdTime > b.createdTime) {
              return -1;
            } else {
              return 0;
            }
          }
        });

        setTodoList([...sortedTodos]);
        setIsLoading(false);
      });
  }, [sortOrder]);

  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem("savedTodoList", JSON.stringify(todoList));
    }
  }, [todoList, isLoading]);

  function addTodo(newTodo) {
    fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        fields: {
          'Title': newTodo.title
        }})
    })
    .then(response => response.json())
    .then(data => {
      const newTodo = {
        id: data.id,
        title: data.fields.Title,
        createdTime: data.fields.Created, };
        
      setTodoList([...todoList, newTodo]);
    }).catch(error => console.error(error));
  }

  function removeTodo(id) {
    const urlDel = `https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_ID}/${process.env.REACT_APP_TABLE_NAME}/${id}`

    fetch(urlDel, {
      method: 'DELETE',
      headers: {
       Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_KEY}`,
      }
    })
    .then(response => response.json())
    .then(data => {
    const filteredList = todoList.filter(data => data.id !== id);
    setTodoList(filteredList);
  })
  .catch(error => console.error(error));
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

  function handleSortToggle() {
    if (sortOrder === "ASC") {
      setSortOrder("DESC");
    } else {
      setSortOrder("ASC");
    }
  }

  function Header() {
    const location = useLocation();
  
    return (
      <header className={style.headerNavigation}>
        {location.pathname !== '/' && (
          <Link to="/" className={style.logo}><Logo className={style.logo}/></Link>
        )}
      </header>
    );
  }

  function landingPage() {
    return (
      <div>
        <Header />
      <div className={style.landingPageContainer}>
        <div className={style.landingPage}>
          <h1 className={style.landingPageHeader}>Todo App</h1>
          <p className={style.landingPageText}>A simple and intuitive way to manage your tasks</p>
          <Link to="/todo" className={style.cta}>
           Get Started
          </Link>
        </div>
      </div>
      </div> 
    );
  }

  function appJSX() {
    return (
      <div><Header />
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
            <button onClick={handleSortToggle}>
              <div className={style.todoListHeader}>
                <div className={style.headerLabel}>Your To-do List:</div>
                <div className={style.iconWithLabel}>
                  <p className={style.iconLabel}>Sort by Created Time</p>
                  <Icon className={style.icon} />
                </div>
              </div>
            </button>

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
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" exact element={landingPage()}></Route>
        <Route path="/todo" exact element={appJSX()}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
