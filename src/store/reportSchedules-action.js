import { BASE_URL } from "../URL/url";
import { reportSchedulesActions } from "./reportSchedules";

export const fetchingData = () => {
  return async (dispatch) => {
    const res = await fetch(`${BASE_URL}users/reports/`);
    const datas = await res.json();

    const newData = [];

    for (let data in datas) {
      // console.log(datas[data].whoes[0].idol_name);
      let nameData = 0;
      if (!datas[data].whoes[0]) {
        nameData = "";
      } else {
        nameData = datas[data].whoes[0].idol_name;
      }

      newData.push({
        id: datas[data].id,
        name: nameData,
        time: datas[data].time,
        type: datas[data].type,
        content: datas[data].content,
      });
    }

    dispatch(reportSchedulesActions.updateSchedule(newData));
  };
};
