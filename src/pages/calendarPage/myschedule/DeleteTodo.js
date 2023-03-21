import React from "react";

const deleteBtn = ({ id }) => {
  const deleteLi = async (id) => {
    const deleteInit = {
      method: "DELETE",
    };
    const fetchResult = await fetch(
      `http://127.0.0.1:8000/api/v1/users_calendar/@jiyoung/${id}`,
      deleteInit
    );
    const result = await fetchResult.json();
  };

  return (
    <button
      className="deleteBtn"
      onClick={() => {
        deleteLi(id);
      }}
    >
      x
    </button>
  );
};

export default deleteBtn;
