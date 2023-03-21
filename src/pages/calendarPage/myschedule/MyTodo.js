import React from "react";
import { useState, useEffect } from "react";

import DeleteBtn from "./DeleteTodo";
import AddTodo from "./AddTodo";

function MyTodo() {
  const [todoList, setTodoList] = useState([]);

  const fetchData = () => {
    fetch("http://127.0.0.1:8000/api/v1/users_calendar/@jiyoung")
      .then((res) => res.json())
      .then((data) => setTodoList(data))
      .catch((data) => console.log(data));
  };

  // 바로 화면에 반영되게 하려면 POST를 보내고, 서버에 데이터가 저장되면, 업데이트된 데이터를 다시 GET
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="mySchedule">
      <h1>TODO LIST</h1>
      <form onSubmit={AddTodo}>
        <input name="contents" type="text" />
        <input name="when" type="date" />
        <input value="추가" type="submit" />
      </form>
      {todoList.map((todo) => (
        <div>
          <div>{todo.id}</div>
          <div>
            contents: {todo.contents}
            when: {todo.when}
            <DeleteBtn id={todo.pk}>x</DeleteBtn>
          </div>
        </div>
      ))}
    </div>
  );
}

export default MyTodo;
