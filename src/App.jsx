import { v4 as uuidv4 } from "uuid";
import { useState , useEffect } from "react";
import "./App.css";
import Navbar from "./components/navbar.jsx";

function App() {
  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState("");

 // Load todos on mount
useEffect(() => {
  const items = localStorage.getItem("todos");
  if (items) setTodos(JSON.parse(items));
}, []);

// Save todos whenever they change
useEffect(() => {
  localStorage.setItem("todos", JSON.stringify(todos));
}, [todos]);


  const handleAdd = () => {
    if (todo.length == 0) {
      return;
    }

    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }]);
    setTodo("");
    console.log(todos);
  };

  const handlechange = (e) => {
    setTodo(e.target.value);
  };

  const handleCheckbox = (e) => {
    let currid = e.target.name;
    let index = todos.findIndex((items) => {
      return items.id === currid;
    });

    let newtodos = [...todos];
    newtodos[index].isCompleted = !newtodos[index].isCompleted;
    setTodos(newtodos);
  };

  function handleRemove(id) {
    let index = todos.findIndex((item) => {
      return item.id == id;
    });

    const newtodos = [...todos];
    newtodos.splice(index, 1);
    setTodos(newtodos);
  }

  function handleEdit(id) {
    let index = todos.findIndex((item) => {
      return item.id == id;
    });

    let text = todos[index].todo;

    setTodo(text);
    handleRemove(id);
  }

  return (
    <>
      <Navbar />
      <div className="content">
        <h2 className="heading">Plan Your Day</h2>

        <div className="adder">
          <div className="heading-2">Add a Todo</div>
          <input
            className="inputbox"
            onChange={handlechange}
            value={todo}
            type="text"
            placeholder="Enter your Todo"
          />
          <button className="btn" onClick={handleAdd} type="button">
            Add
          </button>
        </div>

        <h3 className="curr-todos">Your Todos</h3>

        {todos.map((items) => {
          //dynamic todo addition in the todo list
          return (
            <div className="act-todos">
              <div className="check">
                <input
                  type="checkbox"
                  checked = {items.isCompleted}
                  key={items.id}
                  name={items.id}
                  onChange={handleCheckbox} //
                  id=""
                />
                <span
                  className="work"
                  style={{
                    textDecoration:
                      items.isCompleted == true ? "line-through" : "",
                  }}
                >
                  {items.todo}
                </span>
              </div>
              <div className="act-btn">
                <button
                  onClick={() => {
                    handleEdit(items.id);
                  }}
                  className="edit"
                  type="button"
                >
                  Edit
                </button>
                <button
                  onClick={() => {
                    handleRemove(items.id);
                  }}
                  className="remove"
                  type="button"
                >
                  remove
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default App;
