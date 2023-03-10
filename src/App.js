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
import Calendar from "./pages/calendarPage/Calendar";

//commit
function App() {
  const dispatch = useDispatch();
  const reduxUserToken = useSelector((state) => state.auth.userToken);

  useEffect(() => {
    const userToken = sessionStorage.getItem("userToken");

    if (userToken) {
      dispatch(authActions.logIn(userToken));
    }
  }, [dispatch, reduxUserToken]);

  return (
    <>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          {/* 메인페이지 */}
          <Route path="/" element={<Home />} />

          {/* 회원가입페이지 */}
          <Route path="/signup" element={<SignUp />} />

          {/* render={() => (isLogin ? <Redirect to="/" /> : <Login />) */}
          {/* 로그인페이지 */}
          <Route path="/login" element={<LogIn />} />
          {/* 개인정보수정 */}
          <Route path="/edituser" element={<EditUser />} />

          <Route path="/calendar" element={<Calendar />} />

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
