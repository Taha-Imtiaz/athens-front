import React from "react";
import "./App.css";
import { Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PrivateRoute from "./utils/private-routes";

import Navbar from "./components/Navbar/Navbar";

import SignIn from "./pages/signIn/signin";
import customerList from "./pages/Customer/CustomerList/customerlist";
import customerDetail from "./pages/Customer/CustomerDetail/customerDetail";
import CustomerClaims from "./pages/Claims/CustomersClaim/CustomerClaims";
import CustomerDeposit from "./pages/Claims/CustomerBlanketDeposit/CustomerDeposit";
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
import SubmitDeposit from "./pages/Claims/SubmitDeposit/SubmitDeposit";
import EmailVerification from "./pages/ForgetPassword/EmailVerification/EmailVerification";
import VerificationCode from "./pages/ForgetPassword/VerificationCode/VerificationCode";
import ResetPassword from "./pages/ForgetPassword/ResetPassword/ResetPassword";
import ClaimsDetails from "./pages/ClaimsDetails/ClaimsDetails";
import CustomerUpdate from "./pages/Customer/CustomerUpdate/CustomerUpdate";

function App(props) {
  const notify = (message) => toast(message);
  const { showMessage } = props;

  if (showMessage) {
    notify(showMessage);
  }

  return (
    <div className="app">
      <Navbar />
      <ToastContainer position="bottom-right" />
      <Switch>
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
        <PrivateRoute path="/deposits" exact component={CustomerDeposit} />
        <PrivateRoute path="/deposit/add" component={SubmitDeposit} />

        {/* Mover */}
        <PrivateRoute path="/mover" component={MoversJobsList} exact />
        <PrivateRoute path="/mover/payment" component={Payment} />
        <PrivateRoute path="/mover/calendar" component={MoversCalendar} />
        <PrivateRoute path="/mover/availability" component={Availability} />
        <PrivateRoute path="/mover/jobdetails/:jobId" component={MoversJobDetails} />
        <PrivateRoute path="/mover/holidaycalendar" component={RequestHolidays} />
      </Switch>
    </div>
  );
}

const mapStateToProps = (state) => ({
  showMessage: state.common.displayMessage.message,
});

export default connect(mapStateToProps, null)(App);