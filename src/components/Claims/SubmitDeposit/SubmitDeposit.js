import React, { Component } from "react";
import CustomerDeposit from "../CustomerBlanketDeposit/CustomerDeposit";
import style from "./SubmitDeposit.module.css";
import Button from "../../Button/Button";
import { addDeposit } from '../../../Redux/Claims/claimsActions'
import { showMessage } from '../../../Redux/Common/commonActions'
import { connect } from "react-redux";
import Autocomplete from "react-autocomplete";

class SubmitDeposit extends Component {
  state = {
    quantity: '',
    cost: '',
   customer: ''
  }

  handleSearchFormInput = (value)=>{ 
      
    this.setState({
      customer: value
    })
}

  handleSubmit = (e) => {
    var { quantity,customer, cost } = this.state
    e.preventDefault()
    let obj = {
      quantity,
     customer,
      cost
    }
    var { showMessage } = this.props;
    addDeposit(obj).then(res => {
      showMessage(res.data.message)
    })
  };

  handleFormInput = (e) => {
    var { name, value } = e.target;
    this.setState({
      [name]: value
    })
    if (name == 'quantity') {
      this.setState({
        cost: value * 15
      })
    }
  }

  render() {
    var { quantity,customer, cost } = this.state
    return (
      <div className = {style.depositForm }>
        <div className={` jumbotron ${style.form}`} >
        <form onSubmit={this.handleSubmit} >
          <h3 className={style.head} style = {{display: "flex", justifyContent:"center", alignItems:"center"}}>Blanket Deposit</h3>
          
            <div style = {{display: "flex", justifyContent:"center", alignItems:"center"}} >
              <input
                className={style.input_fields}
                type="text"
                name="customer"
                value={customer}
                placeholder="Email"
                onChange={this.handleFormInput}
              />
            </div>
            <div style = {{display: "flex", justifyContent:"center", alignItems:"center"}}>
              <input
                className={style.input_fields}
                type="number"
                name="quantity"
                value={quantity}
                placeholder="Blanket Quantity"
                onChange={this.handleFormInput}
              />
            </div>
            <div style = {{display: "flex", justifyContent:"center", alignItems:"center"}}>
              <input
                className={style.input_fields}
                type="number"
                name="cost"
                value={cost}
                disabled
                placeholder="Cost in $"
                onChange={this.handleFormInput}
              />
            </div>
  
          <div className={style.btn}  style = {{display: "flex", justifyContent:"center", alignItems:"center"}} >
           <button className = "btn btn-primary" style = {{background: "#00ADEE"}} >Submit</button>
          </div>
        </form>
        </div>
      </div >
    );
  }
}

var actions = {
  showMessage
};

export default connect(null, actions)(SubmitDeposit);