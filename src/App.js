import Modal from "./UI/Modal";
import EditUser from "./pages/userFormPage/EditUser";
import LogIn from "./pages/userFormPage/Login";
import ReportSchedule from "./pages/userFormPage/ReportSchedule";
import SignUp from "./pages/userFormPage/SignUp";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "./store/auth";
import { useEffect } from "react";
import Home from "./pages/mainPage/Home";
import ScrollToTop from "./UI/ScrollUP";
import { getCookie } from "./cookie/cookie";
import AdminPage from "./pages/adminPage/AdminPage";
import { Admin, Resource, ListGuesser } from "react-admin";

import jsonServerProvider from "ra-data-json-server";

function App() {
  const dataProvider = jsonServerProvider("http://127.0.0.1:8000/api/v1/idols");

  const dispatch = useDispatch();
  const reduxUserToken = useSelector((state) => state.auth.userToken);

  /**저장된 토큰을 가져와서 redux저장소에 넣어주기 */
  useEffect(() => {
    const userToken = getCookie("userToken");
    // console.log(userToken);
    if (userToken) {
      dispatch(authActions.logIn(userToken));
    }
  }, [dispatch, reduxUserToken]);

  /**아이돌 데이터 받아오기 */
  // const BASE_URL = "http://127.0.0.1:8000/api/v1/idols/";
  // const fetchingData = fetch(BASE_URL, {
  //   headers: {},
  // })
  //   .then((data) => data.json())
  //   .then((result) => {
  //     console.log(result[0].idol_profile);
  //   });

  return (
    <>
      {/* {reduxUserToken && (
        <Admin dataProvider={dataProvider}>
          <Resource name="admin" list={ListGuesser} />
        </Admin>
      )} */}
      <BrowserRouter>
        <ScrollToTop />

        <Routes>
          <Route path="/admin" element={<AdminPage />} />

          {/* 메인페이지 */}
          <Route path="/" element={<Home />} />

          {/* 회원가입페이지 */}
          <Route path="/signup" element={<SignUp />} />

          {/* render={() => (isLogin ? <Redirect to="/" /> : <Login />) */}
          {/* 로그인페이지 */}
          <Route path="/login" element={<LogIn />} />
          {/* 개인정보수정 */}
          <Route path="/edituser" element={<EditUser />} />

          <Route
            path="/report"
            element={
              <Modal>
                <ReportSchedule />
              </Modal>
            }
          />
          {/* 스케줄제보하기 */}
          {/* <Modal>
          <ReportSchedule />
          </Modal> */}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
