import { useState } from "react";
import "./App.css";

function App() {
  const [todos, setTodos] = useState([]);
  const [id, setId] = useState(1);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  return (
    <>
      <input
        type="text"
        id="title"
        value={title}
        placeholder="Todo title"
        onChange={(e) => setTitle(e.target.value)}
      />{" "}
      <br />
      <br />
      <input
        type="text"
        id="description"
        value={desc}
        placeholder="Todo description"
        onChange={(e) => setDesc(e.target.value)}
      />{" "}
      <br />
      <br />
      <button
        onClick={() => {
          setTodos([...todos, { id, title, desc }]);
          setId(id + 1);
        }}
      >
        Add todo
      </button>
      <br /> <br />
      <div id="todos">
        {todos.map((todo) => (
          <>
            <h3>{todo.title}</h3>
            <p>{todo.desc}</p>
          </>
        ))}
      </div>
    </>
  );
}

export default App;
