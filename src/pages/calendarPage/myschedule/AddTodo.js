import { fetchData } from "../calendar/fetchData";

const AddTodo = (e) => {
  e.preventDefault();
  // console.log(e.target);
  const date = new Date();
  const contents = {
    contents: e.target.contents.value,
    //   contents: "working",
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

export default AddTodo;
