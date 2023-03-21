// import "./Calendar.css";
import styles from "./Calendar.module.scss";
import { fetchData } from "./fetchData";

import { useEffect, useState } from "react";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faRotateRight,
  faChevronRight,
  faChevronLeft,
  faBroadcastTower,
  faCompactDisc,
  faStore,
  faGift,
  faCalendarCheck,
} from "@fortawesome/free-solid-svg-icons";

import { useQuery } from "react-query";

const Calendar = () => {
  const [idolSchedule, setIdolSchedule] = useState([]);

  useEffect(() => {
    const fetchIdolSchedule = async () => {
      try {
        const response = await fetch(
          "http://127.0.0.1:8000/api/v1/idols/4/schedules"
        );
        const data = await response.json();
        const idolSchedule = data.map((schedule) => {
          // YYYYMMDD 형태로 변환하는 작업
          const dateList = schedule.when.split("-");
          dateList[2] = dateList[2].substr(0, 2);
          const dateValue = dateList.join("");

          // ScheduleType안에 있는 type을 가져오는 작업
          const typeObj = schedule.ScheduleType;
          const typeValue = typeObj[Object.keys(typeObj)[0]];

          return {
            date: dateValue,
            title: schedule.ScheduleTitle,
            content: schedule.ScheduleContent,
            category: typeValue,
          };
        });
        setIdolSchedule(idolSchedule);
      } catch (error) {
        console.log(error);
      }
    };
    fetchIdolSchedule();
  }, []);

  // useState를 사용하여 달 단위로 변경
  const [getMoment, setMoment] = useState(moment());

  const today = getMoment;

  // 그 달의 시작하는 week() 주
  const firstWeek = today.clone().startOf("month").week();

  //  1년은 52주가 존재하고 며칠이 더 있는데 이 부분을 달력은 53주로써 표현해야 함
  // 하지만 moment()는 내년의 첫 주인 1로 표시하기 때문에 마지막 주가 1이라면 53으로 표시
  const lastWeek =
    today.clone().endOf("month").week() === 1
      ? 53
      : today.clone().endOf("month").week();

  // 반복문을 사용하여 해당 달의 총주의 수만큼 반복문을 실행하고 테이블의 내용을 배열에 추가
  // 길이가 7인 arr를 생성 후 index를 기반으로 day을 표기
  const calendarArr = () => {
    let result = []; // 이번달 배열
    let week = firstWeek;

    for (week; week <= lastWeek; week++) {
      result = result.concat(
        <tr key={week}>
          {Array(7)
            .fill(0)
            .map((data, index) => {
              let days = today
                .clone()
                .startOf("year")
                .week(week)
                .startOf("week")
                .add(index, "day");

              // 오늘 날짜에 today style 적용
              if (moment().format("YYYYMMDD") === days.format("YYYYMMDD")) {
                return (
                  <td key={index} className={styles.today}>
                    <span>{days.format("D")}</span>
                    <div className={styles.eventContent}>
                      <ShowEvent days={days} />
                    </div>
                  </td>
                );
                // 다른 달은 글씨 색 연하게
              } else if (days.format("MM") !== today.format("MM")) {
                return (
                  <td key={index} style={{ color: "#c2c2c2" }}>
                    <span>{days.format("D")}</span>
                  </td>
                );
              } else {
                return (
                  <td
                    key={index}
                    onClick={() =>
                      console.log("clickedDay: " + days.format("D"))
                    }
                  >
                    <span value={index}>{days.format("D")}</span>
                    <div className={styles.eventContent}>
                      <ShowEvent days={days} />
                    </div>
                  </td>
                );
              }
            })}
        </tr>
      );
    }
    return result;
  };

  return (
    <div className={styles.calendarContainer}>
      <div className={styles.controlContainer}>
        <button
          className={styles.prevBtn}
          onClick={() => {
            // clone() 은 기존의 moment가 아닌 새로운 객체를 반환했다는 의미
            setMoment(getMoment.clone().subtract(1, "month"));
          }}
        >
          <FontAwesomeIcon icon={faChevronLeft} size="lg" />
        </button>
        <span className={styles.title}>{today.format("YYYY.MM")}</span>
        <button
          className={styles.nextBtn}
          onClick={() => {
            setMoment(getMoment.clone().add(1, "month"));
          }}
        >
          <FontAwesomeIcon icon={faChevronRight} size="lg" />
        </button>
        <button
          className={styles.todayBtn}
          onClick={() => {
            setMoment(moment());
          }}
        >
          <FontAwesomeIcon icon={faRotateRight} />
        </button>
      </div>

      <div className={styles.categoryContainer}>
        <button className={styles.categoryBtn}>
          <FontAwesomeIcon icon={faBroadcastTower} size="sm" /> 방송
        </button>
        <button className={styles.categoryBtn}>
          <FontAwesomeIcon icon={faCompactDisc} size="sm" /> 발매
        </button>
        <button className={styles.categoryBtn}>
          <FontAwesomeIcon icon={faStore} size="sm" /> 구매
        </button>
        <button className={styles.categoryBtn}>
          <FontAwesomeIcon icon={faGift} size="sm" /> 축하
        </button>
        <button className={styles.categoryBtn}>
          <FontAwesomeIcon icon={faCalendarCheck} size="sm" /> 행사
        </button>
        <button className={styles.categoryBtn}>
          <FontAwesomeIcon icon={faUser} size="sm" /> my
        </button>
      </div>
      <table>
        <tbody>
          <tr>
            <td className="week">일</td>
            <td className="week">월</td>
            <td className="week">화</td>
            <td className="week">수</td>
            <td className="week">목</td>
            <td className="week">금</td>
            <td className="week">토</td>
          </tr>
          {calendarArr()}
        </tbody>
      </table>
    </div>
  );
};
export default Calendar;

function ShowEvent({ days }) {
  const { data: schedule } = useQuery(["schedule"], fetchData);

  useEffect(() => {
    // console.log("checking", schedule);
  }, [schedule]);

  const renderScheduleData = () => {
    return schedule?.map((data, i) => {
      if (days.format("YYYYMMDD") === moment(data.date).format("YYYYMMDD")) {
        let categoryStyle = styles.my;

        switch (data.category) {
          case "broadcast":
            categoryStyle = styles.broadcast;
            break;
          case "release":
            categoryStyle = styles.release;
            break;
          case "buy":
            categoryStyle = styles.buy;
            break;
          case "congrats":
            categoryStyle = styles.congrats;
            break;
          case "event":
            categoryStyle = styles.event;
            break;
          default:
            break;
        }

        return (
          <div key={i} className={categoryStyle}>
            {data.data}
          </div>
        );
      }

      return null;
    });
  };

  return <>{renderScheduleData()}</>;
}
