import React from "react";
import axios from "axios";
import MyTodo from "./MyTodo";

const deleteBtn = ({ id }) => {
  const deleteTodo = (id) => {
    axios
      .delete("http://127.0.0.1:8000/api/v1/users_calendar/@jiyoung/" + id)
      .then((res) => {
        if (res.status === 204) {
          //통신에 성공하면 리스트에서 해당 투두내역 삭제
          MyTodo(); //getTodo 함수를 불러와서 새 리스트를 뿌려줌
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // const deleteLi = async (id) => {
  //   const deleteInit = {
  //     method: "DELETE",
  //   };
  //   const fetchResult = await fetch(
  //     `http://127.0.0.1:8000/api/v1/users_calendar/@jiyoung/${id}`,
  //     deleteInit
  //   );
  //   const result = await fetchResult.json();
  // };

  return (
    <button
      className="deleteBtn"
      onClick={() => {
        deleteTodo(id);
      }}
    >
      x
    </button>
  );
};

export default deleteBtn;
