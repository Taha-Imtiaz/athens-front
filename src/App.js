import React from 'react';
import logo from './logo.svg';
import './App.css';
import Sign_In_Form from './components/signIn/signin';
import SignInForm from './components/signIn/signin';
import {Route, Switch} from "react-router-dom"
import customerList from './components/Customer/CustomerList/customerlist';
import customerDetail from './components/Customer/CustomerDetail/customerDetail';
import customerAdd from './components/Customer/CustomerAdd/customeradd';
import AdminPage from './components/Admin/Admin';
import SignOut from './components/signOut/signout';
import Navbar from './components/Navbar/Navbar';
import CustomerClaims from './components/Claims/CustomersClaim/CustomerClaims';
import CustomerDeposit from './components/Claims/CustomerBlanketDeposit/CustomerDeposit';
import CustomerDeposit2 from './components/Claims/CustomerBlanketDeposit2/CustomerDeposit2';
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

function App() {
  return (
    <div className="form_style">
      <Navbar/>
      <Switch>
      <Route exact path="/" component={SignInForm}/>
      <Route exact path="/customer" component={customerList}/>
      <Route path="/customer/detail" component={customerDetail}/>
      <Route path="/customer/add" component={customerAdd}/>
      <Route path="/admin" component={AdminPage}/>
      <Route path="/signout" component={SignOut}/>
      <Route path="/claim/customer" component={CustomerClaims}/>
      <Route path="/claim/customerdeposit" component={CustomerDeposit}/>
      <Route path="/claim/customerdeposit2" component={CustomerDeposit2}/>
      <Route path="/claim/newclaim" component={NewClaim}/>
      <Route exact path="/job" component={JobsList}/>
      <Route path="/job/details" component={JobDetails}/>
      <Route path="/job/create" component={CreateJobs}/>
      <Route path="/job/edit" component={JobEditDetails}/>
      <Route path="/calendar" component={CalendarApp}/>
      <Route exact path="/schedule" component={UnavailableSchedule}/>
      <Route path="/schedule/daily" component={DailySchedule}/>
      <Route path="/schedule/movers" component={MoversSchedule}/>
      <Route exact path="/user" component={UsersList}/>
      <Route path="/user/create" component={CreateUser}/>
      <Route exact path="/account" component={AccountDisplay}/>
      <Route path="/account/update" component={AccountUpdate}/>

      </Switch>
  </div>
  );
}

export default App;
