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
import JobsList from './components/Jobs/JobsList';

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
      <Route path="/job" component={JobsList}/>
      
      
      </Switch>
  </div>
  );
}

export default App;
