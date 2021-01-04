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
import AccountUpdate from "./pages/Account/AccountUpdate/AccountUpdate";
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
    <div className="form_style">
      <Navbar />
      <ToastContainer position="bottom-right" />
      <Switch>
        <Route path="/" exact component={SignIn} />
        <Route path="/emailVerification" component={EmailVerification} />
        <Route path="/verifycode" component={VerificationCode} />
        <PrivateRoute path="/restPassword" component={ResetPassword} />
        <PrivateRoute path="/customer" exact component={customerList} />
        <PrivateRoute path="/customer/detail/:customerId" component={customerDetail} />
        <PrivateRoute path="/customer/add" component={CustomerAdd} />
        <PrivateRoute path="/customerUpdate/:id" component={CustomerUpdate} />
        <PrivateRoute path="/claim/customer" component={CustomerClaims} />
        <PrivateRoute path="/claim/customerdeposit" exact component={CustomerDeposit} />
        <PrivateRoute path="/claim/customerdeposit/deposit" component={SubmitDeposit} />
        <PrivateRoute path="/claim/newclaim" component={NewClaim} exact />
        <PrivateRoute path="/job" component={JobsList} exact />
        <PrivateRoute path="/job/details/:jobId" component={JobDetails} />
        <PrivateRoute path="/job/create" component={CreateJobs} />
        <PrivateRoute path="/job/edit/:jobId" component={JobEditDetails} />
        <PrivateRoute path="/calendar" component={Calendar} />
        <PrivateRoute path="/schedule/daily" component={DailySchedule} />
        <PrivateRoute path="/schedule" component={UnavailableSchedule} exact />
        <PrivateRoute path="/schedule/movers" component={MoversSchedule} />
        <PrivateRoute path="/user" component={UsersList} exact />
        <PrivateRoute path="/user/create" component={CreateUser} />
        <PrivateRoute path="/account" component={AccountDisplay} exact />
        {/* <PrivateRoute path="/account/update" component={AccountUpdate} /> */}
        <PrivateRoute path="/mover" component={MoversJobsList} exact />
        <PrivateRoute path="/mover/payment" component={Payment} />
        <PrivateRoute path="/mover/calendar" component={MoversCalendar} />
        <PrivateRoute path="/mover/availability" component={Availability} />
        <PrivateRoute path="/claimsDetail/:claimsId" component={ClaimsDetails} />
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
