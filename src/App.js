import React from 'react';
import logo from './logo.svg';
import './App.css';
import Sign_In_Form from './components/signIn/signin';
import SignInForm from './components/signIn/signin';
import {Route, Switch} from "react-router-dom"
import customerList from './components/Customer/CustomerList/customerlist';
import customerDetail from './components/Customer/CustomerDetail/customerDetail';
import customerAdd from './components/Customer/CustomerAdd/customeradd';

function App() {
  return (
    <div className="form_style">
      <Switch>
      <Route exact path="/" component={SignInForm}/>
      <Route exact path="/customer" component={customerList}/>
      <Route path="/customer/detail" component={customerDetail}/>
      <Route path="/customer/add" component={customerAdd}/>
      
      </Switch>
  </div>
  );
}

export default App;
