import React, { useEffect } from "react";
import { Route, Switch, useLocation } from "react-router-dom";
import { connect } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import PrivateRoute from "./utils/private-routes";
import CircularProgress from "@material-ui/core/CircularProgress";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

import Navbar from "./components/Navbar/Navbar";
import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary";

/* Auth */
import SignIn from "./pages/SignIn/SignIn";
import EmailVerification from "./pages/ForgetPassword/EmailVerification/EmailVerification";
import CodeVerification from "./pages/ForgetPassword/CodeVerification/CodeVerification";
import ResetPassword from "./pages/ForgetPassword/ResetPassword/ResetPassword";

/* Customer */
import CustomerList from "./pages/Customer/CustomerList/CustomerList";
import CustomerDetails from "./pages/Customer/CustomerDetails/CustomerDetails";
import CreateCustomer from "./pages/Customer/CreateCustomer/CreateCustomer";
import UpdateCustomer from "./pages/Customer/UpdateCustomer/UpdateCustomer";

/* Job */
import JobList from "./pages/Job/JobList/JobList";
import JobDetails from "./pages/Job/JobDetails/JobDetails";
import CreateJob from "./pages/Job/CreateJob/CreateJob";
import UpdateJob from "./pages/Job/UpdateJob/UpdateJob";

/* Calendar */
import Calendar from "./pages/Calendar/Calendar";

/* Schedule */
import UnavailableSchedule from "./pages/Schdule/Unavailable/Unavailable";
import DailySchedule from "./pages/Schdule/Daily/Daily";
import MoversSchedule from "./pages/Schdule/Movers/Movers";

/* User */
import UserList from "./pages/User/UserList/UserList";
import CreateUser from "./pages/User/CreateUser/CreateUser";
import UpdateUser from "./pages/User/UpdateUser/UpdateUser";

/* Account */
import Account from "./pages/Account/Account";

/* Claim */
import ClaimList from "./pages/Claim/ClaimList/ClaimList";
import ClaimDetails from "./pages/Claim/ClaimDetails/ClaimDetails";
import CreateClaim from "./pages/Claim/CreateClaim/CreateClaim";

/* Deposit */
import DepositList from "./pages/Deposit/DepositList/DepositList";
import CreateDeposit from "./pages/Deposit/CreateDeposit/CreateDeposit";
import DepositDetails from "./pages/Deposit/DepositDetails/DepositDetails"

/* Mover */
import MoversJobList from "./pages/Mover/JobList/JobList";
import MoverJobDetails from "./pages/Mover/JobDetails/JobDetails";
import Payment from "./pages/Mover/Payment/Payment";
import MoversCalendar from "./pages/Mover/MoverCalendar/MoverCalendar";
import Availability from "./pages/Mover/Availability/Availability";
import RequestHolidays from "./pages/Mover/HolidayCalendar/HolidayCalendar";
import BackButton from "./components/BackButton/BackButton";



function App(props) {
  // To show server responses to user.
  const { totalRequest, showMessage } = props;
  useEffect(() => {
    if (showMessage) {
      notify(showMessage);
    }
  }, [showMessage]);
  const notify = (message) => toast(message);

  const location = useLocation();
  let { pathname } = location;

  return (
    <div className={pathname !== "/" ? "app" : "app-without-nav"}>
      {totalRequest > 0 ? (
        <div className="loader">
          <CircularProgress />
        </div>
      ) : null}
      <div className="navigation-menu">
        <Navbar />
        <BackButton/>
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
            <Route path="/verifycode" component={CodeVerification} />
            <PrivateRoute path="/rest-password" component={ResetPassword} />

            {/* Customer */}
            <PrivateRoute path="/customers" exact component={CustomerList} />
            <PrivateRoute
              path="/customer/detail/:customerId"
              component={CustomerDetails}
            />
            <PrivateRoute path="/customer/add" component={CreateCustomer} />
            <PrivateRoute
              path="/customer/update/:customerId"
              component={UpdateCustomer}
            />

            {/* Job */}
            <PrivateRoute path="/jobs" component={JobList} exact />
            <PrivateRoute path="/job/detail/:jobId" component={JobDetails} />
            <PrivateRoute path="/job/add" component={CreateJob} />
            <PrivateRoute path="/job/update/:jobId" component={UpdateJob} />

            {/* Calendar */}
            <PrivateRoute path="/calendar" component={Calendar} />

            {/* Schedule */}
            <PrivateRoute path="/schedule" component={DailySchedule} exact />
            <PrivateRoute
              path="/schedule/unavailable"
              component={UnavailableSchedule}
              exact
            />
            <PrivateRoute path="/schedule/movers" component={MoversSchedule} />

            {/* User */}
            <PrivateRoute path="/users" component={UserList} exact />
            <PrivateRoute path="/user/add" component={CreateUser} />
            <PrivateRoute path="/user/update/:userId" component={UpdateUser} />


            {/* Account */}
            <PrivateRoute path="/account" component={Account} exact />

            {/* Claim */}
            <PrivateRoute path="/claims" component={ClaimList} />
            <PrivateRoute
              path="/claim/detail/:claimId"
              component={ClaimDetails}
            />
            <PrivateRoute path="/claim/add" component={CreateClaim} exact />

            {/* Deposit */}
            <PrivateRoute path="/deposits" exact component={DepositList} />
            <PrivateRoute
              path="/deposit/detail/:depositId"
              component={DepositDetails}
            />
            <PrivateRoute path="/deposit/add" component={CreateDeposit} />

            {/* Mover */}
            <PrivateRoute path="/mover" component={MoversJobList} exact />
            <PrivateRoute
              path="/mover/jobdetails/:jobId"
              component={MoverJobDetails}
            />
            <PrivateRoute path="/mover/payment" component={Payment} />
            <PrivateRoute path="/mover/calendar" component={MoversCalendar} />
            <PrivateRoute path="/mover/availability" component={Availability} />
            <PrivateRoute
              path="/mover/holidaycalendar"
              component={RequestHolidays}
            />
          </ErrorBoundary>
        </Switch>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  showMessage: state.common.displayMessage.message,
  totalRequest: state.common.totalRequest,
});

export default connect(mapStateToProps, null)(App);
