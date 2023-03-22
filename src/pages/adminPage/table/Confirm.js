import axios from "axios";
import React from "react";
import { useSelector } from "react-redux";
import { CancelButton } from "../../../UI/Button";
import { BASE_URL } from "../../../URL/url";
import styles from "./Confirm.module.scss";

const Confirm = (props) => {
  const idolSchedulePk = useSelector(
    (state) => state.auth.authState.pick.schedulePk
  );
  const idolPk = props.idolPk;

  const deleteScheduleHandler = async () => {
    axios
      .delete(`${BASE_URL}users/reports/${idolSchedulePk}`, {
        withCredentials: true,
      })
      .then((data) => {
        console.log(data);
        return window.location.reload();
      })
      .catch((data) => console.log(data));
  };

  const upLoadScheduleHandler = async () => {
    console.log(props.upLoadData);
    await axios
      .post(`${BASE_URL}idols/${idolPk}/schedules`, props.upLoadData, {
        withCredentials: true,
      })
      .then((data) => {
        console.log(data);
        // window.location.reload();
      })
      .catch((data) => console.log(data));
  };

  return (
    <div className={styles.confirmDiv}>
      {props.scheduleModal === "del" ? (
        <>
          <h3>데이터를 삭제하시겠습니까??</h3>
          <p>삭제하신 데이턴는 복구가 불가능합니다.</p>

          <CancelButton hideModalHandler={props.hideModalHandler}>
            취소
          </CancelButton>
          <button className={styles.confirmBtn} onClick={deleteScheduleHandler}>
            삭제하기
          </button>
        </>
      ) : props.scheduleModal === "upload" ? (
        <>
          <h3>아이돌스케줄에 업로드 하시겠습니까??</h3>
          <p>업로드한 아이돌 스케줄은은 관리자페이지에서 삭제됩니다.</p>
          <CancelButton hideModalHandler={props.hideModalHandler}>
            취소
          </CancelButton>
          <button className={styles.confirmBtn} onClick={upLoadScheduleHandler}>
            등록하기
          </button>
        </>
      ) : null}
    </div>
  );
};

export default Confirm;

// const idolSchedule = {};