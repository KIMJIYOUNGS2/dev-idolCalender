import moment from "moment";
import React from "react";
import { useState, useEffect } from "react";
import styles from "";

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

  const onSubmitHandler = (e) => {
    e.preventDefault();
    // console.log(e.target);
    const date = new Date();
    const contents = {
      title: e.target.contents.value,
      contents: "working",
      when: date,
    };

    console.log(contents);
    // const done = e.target.done.checked;
    fetch("http://127.0.0.1:8000/api/v1/users_calendar/@jiyoung", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      //   credentials: "include",

      body: JSON.stringify(contents),
    }).then(fetchData());
  };

  return (
    <div className="App">
      <h1>TODO LIST</h1>
      <form onSubmit={onSubmitHandler}>
        <input name="contents" type="text" />

        <input value="추가" type="submit" />
      </form>
      {todoList.map((todo) => (
        <div>
          <div>{todo.id}</div>
          <div>{todo.contents}</div>
        </div>
      ))}
    </div>
  );
}

export default MyTodo;
