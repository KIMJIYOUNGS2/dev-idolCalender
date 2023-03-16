import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../../URL/url";

const SignUpOption = () => {
  const [idolList, setIdolList] = useState([]);

  /**최애 옵션 */
  useEffect(() => {
    const dataHandler = async () => {
      await axios
        .get(`${BASE_URL}idols/`)
        .then((data) => setIdolList(data.data));
    };
    dataHandler();
  }, []);

  return (
    <>
      {idolList.map((data) => (
        <option key={data.pk} value={data.pk}>
          {data.idol_name}
        </option>
      ))}
    </>
  );
};

export default SignUpOption;
