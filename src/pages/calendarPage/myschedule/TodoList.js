import React, { useState } from "react";
import axios from "axios";

export default () => {
  const [contents, setContents] = useState("");
  const [when, setWhen] = useState("");

  const contentsHandler = (e) => {
    e.preventDefault();
    setContents(e.target.value);
  };

  const whenHandler = (e) => {
    e.preventDefault();
    setWhen(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    // state에 저장한 값을 가져옵니다.
    console.log(contents);
    console.log(when);

    let body = {
      email: contents,
      when: when,
    };

    axios
      .post("http://127.0.0.1:8000/api/v1/users_calendar/@jiyoung", body)
      .then((res) => console.log(res));
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          height: "100vh",
        }}
      >
        <form
          onSubmit={submitHandler}
          style={{ display: "flex", flexDirection: "Column" }}
        >
          <label>contents</label>
          <input
            type="text"
            value={contents}
            onChange={contentsHandler}
          ></input>
          <label>when</label>
          <input type="when" value={when} onChange={whenHandler}></input>
          <button type="submit">추가</button>
        </form>
      </div>
    </>
  );
};
