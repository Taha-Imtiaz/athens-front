import React, { useState, useEffect } from 'react';
import './App.css';
import Sign_In_Form from './components/signIn/signin';
import SignInForm from './components/signIn/signin';
import { Route, Switch } from "react-router-dom"
import customerList from './components/Customer/CustomerList/customerlist';
import customerDetail from './components/Customer/CustomerDetail/customerDetail';
import customerAdd from './components/Customer/CustomerAdd/customeradd';
import AdminPage from './components/Admin/Admin';
import SignOut from './components/signOut/signout';
import Navbar from './components/Navbar/Navbar';
import CustomerClaims from './components/Claims/CustomersClaim/CustomerClaims';
import CustomerDeposit from './components/Claims/CustomerBlanketDeposit/CustomerDeposit';
import NewClaim from './components/Claims/NewClaim/NewClaim';
import JobsList from './components/Jobs/JobsList/JobsList';
import JobDetails from './components/Jobs/JobDetails/JobDetails';
import CreateJobs from './components/Jobs/CreateJob/CreateJobs';
import JobEditDetails from './components/Jobs/JobDetailsEdit/JobEditDetails';
import Calendar from './components/Calendar/Calendar';
import CalendarApp from './components/Calendar/Calendar';
import UnavailableSchedule from './components/Schdules/Unavailable/Unavailable';
import DailySchedule from './components/Schdules/Daily/Daily';
import MoversSchedule from './components/Schdules/Movers/Movers';
import CreateUser from './components/User/CreateNew/CreateUser';
import UsersList from './components/User/UsersList/UsersList';
import AccountDisplay from './components/Account/AccountDisplay/AccountDisplay';
import AccountUpdate from './components/Account/AccountUpdate/AccountUpdate';
import MoversJobDetails from './components/Movers/JobDetails/JobDetails';
import Payment from './components/Movers/Payment/Payment';
import CustomerAdd from './components/Customer/CustomerAdd/customeradd';
import MoversCalendar from './components/Movers/Calendar/Calendar';
import Availability from './components/Movers/Availability/Availability';
import MoversJobsList from './components/Movers/JobList/JobList';
import Example from './components/Movers/HolidayCalendar/HolidayCalendar';
import SubmitDeposit from './components/Claims/SubmitDeposit/SubmitDeposit';
import { connect } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getLoginUser } from './Redux/User/userActions'
import PrivateRoutes from './utils/private-routes';
import PrivateRoute from './utils/private-routes';

function App(props) {
  const [show, setShow] = [false]
  const notify = (message) => toast(message);
  const { loading, showMessage } = props

  if (showMessage) {
    notify(showMessage)
  }

  return (

    <div className="form_style">
      <Navbar />
      <ToastContainer position="bottom-right" />
      <Switch>
        <Route exact path="/" component={SignInForm} />
        <PrivateRoute exact path="/customer" component={customerList} />
        <PrivateRoute path="/customer/detail/:customerId" component={customerDetail} />
        <PrivateRoute path="/customer/add" component={CustomerAdd} />
        <PrivateRoute path="/claim/customer" component={CustomerClaims} />
        <PrivateRoute exact path="/claim/customerdeposit" component={CustomerDeposit} />
        <PrivateRoute path="/claim/customerdeposit/deposit" component={SubmitDeposit} />
        <PrivateRoute path="/claim/newclaim" component={NewClaim} exact />
        <PrivateRoute exact path="/job" component={JobsList} exact />
        <PrivateRoute path="/job/details/:jobId" component={JobDetails} />
        <PrivateRoute path="/job/create" component={CreateJobs} />
        <PrivateRoute path="/job/edit/:jobId" component={JobEditDetails} />
        <PrivateRoute path="/calendar" component={CalendarApp} />
        <PrivateRoute exact path="/schedule" component={UnavailableSchedule} />
        <PrivateRoute path="/schedule/daily" component={DailySchedule} />
        <PrivateRoute path="/schedule/movers" component={MoversSchedule} />
        <PrivateRoute exact path="/user" component={UsersList} />
        <PrivateRoute path="/user/create" component={CreateUser} />
        <PrivateRoute exact path="/account" component={AccountDisplay} />
        <PrivateRoute path="/account/update" component={AccountUpdate} />
        <PrivateRoute exact path="/mover" component={MoversJobsList} />
        <PrivateRoute path="/mover/payment" component={Payment} />
        <PrivateRoute path="/mover/calendar" component={MoversCalendar} />
        <PrivateRoute path="/mover/availability" component={Availability} />
        <PrivateRoute path="/mover/jobdetails/:jobId" component={MoversJobDetails} />
        <PrivateRoute path="/mover/holidaycalendar" component={Example} />

        {/* <Route exact path="/customer" component={customerList} />
        <PrivateRoute path="/customer/detail/:customerId" component={customerDetail} />
        <PrivateRoute path="/customer/add" component={CustomerAdd} />
       
        <PrivateRoute path="/claim/customer" component={CustomerClaims} />
        <PrivateRoute exact path="/claim/customerdeposit" component={CustomerDeposit} />
        <PrivateRoute path="/claim/customerdeposit/deposit" component={SubmitDeposit} />
        <PrivateRoute path="/claim/newclaim" component={NewClaim} exact />
        <PrivateRoute exact path="/job" component={JobsList} exact />
        <PrivateRoute path="/job/details/:jobId" component={JobDetails} />
        <PrivateRoute path="/job/create" component={CreateJobs} />
        <PrivateRoute path="/job/edit/:jobId" component={JobEditDetails} />
        <PrivateRoute path="/calendar" component={CalendarApp} />
        <PrivateRoute exact path="/schedule" component={UnavailableSchedule} />
        <PrivateRoute path="/schedule/daily" component={DailySchedule} />
        <PrivateRoute path="/schedule/movers" component={MoversSchedule} />
        <PrivateRoute exact path="/user" component={UsersList} />
        <PrivateRoute path="/user/create" component={CreateUser} />
        <PrivateRoute exact path="/account" component={AccountDisplay} />
        <PrivateRoute path="/account/update" component={AccountUpdate} />

        <PrivateRoute exact path="/mover" component={MoversJobsList} />
        <PrivateRoute path="/mover/payment" component={Payment} />
        <PrivateRoute path="/mover/calendar" component={MoversCalendar} />
        <PrivateRoute path="/mover/availability" component={Availability} />
        <PrivateRoute path="/mover/jobdetails/:jobId" component={MoversJobDetails} />
        <PrivateRoute path="/mover/holidaycalendar" component={Example} /> */}
      </Switch>
    </div>
  );
}

const mapStateToProps = state => ({
  // loading: state.common.loading,
  showMessage: state.common.displayMessage.message
})

const action = {
  // getLoginUser
}

export default connect(mapStateToProps, null)(App);
