import React, { useEffect } from "react";
import "./App.css";
import { Route, Switch, useLocation } from "react-router-dom";
import { connect } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PrivateRoute from "./utils/private-routes";

import Navbar from "./components/Navbar/Navbar";
import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary";


import SignIn from "./pages/SignIn/SignIn";
import customerList from "./pages/Customer/CustomerList/customerlist";
import customerDetail from "./pages/Customer/CustomerDetail/customerDetail";
import CustomerClaims from "./pages/Claims/CustomersClaim/CustomerClaims";
import BlanketList from "./pages/Blanket/BlanketList/BlanketList";
import NewClaim from "./pages/Claims/NewClaim/NewClaim";
import JobsList from "./pages/Jobs/JobsList/JobsList";
import JobDetails from "./pages/Jobs/JobDetails/JobDetails";
import CreateJobs from "./pages/Jobs/CreateJob/CreateJobs";
import JobEditDetails from "./pages/Jobs/JobDetailsEdit/JobEditDetails";
import Calendar from "./pages/Calendar/Calendar";
import UnavailableSchedule from "./pages/Schdules/Unavailable/Unavailable";
import DailySchedule from "./pages/Schdules/Daily/Daily";
import MoversSchedule from "./pages/Schdules/Movers/Movers";
import CreateUser from "./pages/User/CreateNew/CreateUser";
import UsersList from "./pages/User/UsersList/UsersList";
import AccountDisplay from "./pages/Account/AccountDisplay/AccountDisplay";
import MoversJobDetails from "./pages/Movers/JobDetails/JobDetails";
import Payment from "./pages/Movers/Payment/Payment";
import CustomerAdd from "./pages/Customer/CustomerAdd/customeradd";
import MoversCalendar from "./pages/Movers/Calendar/Calendar";
import Availability from "./pages/Movers/Availability/Availability";
import MoversJobsList from "./pages/Movers/JobList/JobList";
import RequestHolidays from "./pages/Movers/HolidayCalendar/HolidayCalendar";
import SubmitDeposit from "./pages/Blanket/SubmitDeposit/SubmitDeposit";
import EmailVerification from "./pages/ForgetPassword/EmailVerification/EmailVerification";
import VerificationCode from "./pages/ForgetPassword/VerificationCode/VerificationCode";
import ResetPassword from "./pages/ForgetPassword/ResetPassword/ResetPassword";
import ClaimsDetails from "./pages/Claims/ClaimsDetails/ClaimsDetails";
import CustomerUpdate from "./pages/Customer/CustomerUpdate/CustomerUpdate";

function App(props) {
  // To show server responses to user.
  const { showMessage } = props;
  useEffect(() => {
    if (showMessage) {
      notify(showMessage);
    }
  }, [showMessage])
  const notify = (message) => toast(message);

  const location = useLocation();
  var { pathname } = location;

  return (
    <div className={pathname !== "/" ? "app" : "app-without-nav"}>
      <div className="navigation-menu">
        <Navbar />
      </div>
      <div
        className={
          pathname !== "/" ? "app-content-container" : "app-content-without-nav"
        }
      >
        <ToastContainer position="bottom-right" />
        <Switch>
          <ErrorBoundary>
            {/* Auth */}
            <Route path="/" exact component={SignIn} />
            <Route path="/email-verification" component={EmailVerification} />
            <Route path="/verifycode" component={VerificationCode} />
            <PrivateRoute path="/rest-password" component={ResetPassword} />

            {/* Customer */}
            <PrivateRoute path="/customers" exact component={customerList} />
            <PrivateRoute path="/customer/detail/:customerId" component={customerDetail} />
            <PrivateRoute path="/customer/add" component={CustomerAdd} />
            <PrivateRoute path="/customer/update/:customerId" component={CustomerUpdate} />

            {/* Job */}
            <PrivateRoute path="/jobs" component={JobsList} exact />
            <PrivateRoute path="/job/detail/:jobId" component={JobDetails} />
            <PrivateRoute path="/job/add" component={CreateJobs} />
            <PrivateRoute path="/job/update/:jobId" component={JobEditDetails} />

            {/* Calendar */}
            <PrivateRoute path="/calendar" component={Calendar} />

            {/* Schedule */}
            <PrivateRoute path="/schedule" component={DailySchedule} exact />
            <PrivateRoute path="/schedule/unavailable" component={UnavailableSchedule} exact />
            <PrivateRoute path="/schedule/movers" component={MoversSchedule} />

            {/* User */}
            <PrivateRoute path="/users" component={UsersList} exact />
            <PrivateRoute path="/user/add" component={CreateUser} />

            {/* Account */}
            <PrivateRoute path="/account" component={AccountDisplay} exact />

            {/* Claim */}
            <PrivateRoute path="/claims" component={CustomerClaims} />
            <PrivateRoute path="/claim/add" component={NewClaim} exact />
            <PrivateRoute path="/claim/detail/:claimId" component={ClaimsDetails} />

            {/* Deposit */}
            <PrivateRoute path="/deposits" exact component={BlanketList} />
            <PrivateRoute path="/deposit/add" component={SubmitDeposit} />

            {/* Mover */}
            <PrivateRoute path="/mover" component={MoversJobsList} exact />
            <PrivateRoute path="/mover/payment" component={Payment} />
            <PrivateRoute path="/mover/calendar" component={MoversCalendar} />
            <PrivateRoute path="/mover/availability" component={Availability} />
            <PrivateRoute path="/mover/jobdetails/:jobId" component={MoversJobDetails} />
            <PrivateRoute path="/mover/holidaycalendar" component={RequestHolidays} />
          </ErrorBoundary>
        </Switch>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  showMessage: state.common.displayMessage.message,
});

export default connect(mapStateToProps, null)(App);
