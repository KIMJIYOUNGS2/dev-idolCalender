import React, { useState, useEffect } from "react";
import axios from "axios";

const TodoList = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const fetchTodos = async () => {
      const response = await axios.get(
        "http://127.0.0.1:8000/api/v1/users_calendar/@jiyoung"
      );
      setTodos(response.data);
    };

    fetchTodos();
  }, []);

  const handleDeleteTodo = async (id) => {
    await axios.delete(
      "http://127.0.0.1:8000/api/v1/users_calendar/@jiyoung/" + id
    );
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleAddTodo = async (title, contents, when) => {
    const response = await axios.post(
      "http://127.0.0.1:8000/api/v1/users_calendar/@jiyoung",
      {
        // title,
        contents,
        // when,
      }
    );
    setTodos([...todos, response.data]);
  };

  return (
    <div>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            {todo.contents}
            <button onClick={() => handleDeleteTodo(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
      <input type="text" id="todoText" />
      <button
        onClick={() => handleAddTodo(document.getElementById("todoText").value)}
      >
        Add Todo
      </button>
    </div>
  );
};

export default TodoList;
