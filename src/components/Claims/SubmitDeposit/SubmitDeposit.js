import React, { Component } from "react";
import CustomerDeposit from "../CustomerBlanketDeposit/CustomerDeposit";
import style from "./SubmitDeposit.module.css";
import Button from "../../Button/Button";
import { addDeposit } from '../../../Redux/Claims/claimsActions'
import { showMessage } from '../../../Redux/Common/commonActions'
import { connect } from "react-redux";
import Autocomplete from "react-autocomplete";
import { TextField } from "@material-ui/core";

class SubmitDeposit extends Component {
  state = {
    quantity: '',
    cost: '',
   customer: '',
   quantityError:"",
  customerError:""

  }
  handleValidate = () =>{
    var {customer, quantity} = this.state
    if(customer === "") {
      this.setState({
        customerError:"Email should not be empty"
      })
    }
    if(quantity === "") {
      this.setState({
        quantityError:"Quantity should not be empty"
      })
    }

    

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
    console.log(obj)
    var { showMessage } = this.props;
  if(this.handleValidate()) {
    // addDeposit(obj).then(res => {
    //   showMessage(res.data.message)
    // })
  }
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
              <TextField
                 variant="outlined"
            margin="normal"
           
            fullWidth
            size="small"
                name="customer"
                value={customer}
                error = {this.state.customerError}
                label="Email"
                onChange={this.handleFormInput}
                style = {{margin:"1rem 0"}}
              />
            </div>
            <div style = {{display: "flex", justifyContent:"center", alignItems:"center"}}>
              <TextField
                 variant="outlined"
            margin="normal"
           
            fullWidth
            size="small"
                name="quantity"
                value={quantity}
                label="Blanket Quantity"
                onChange={this.handleFormInput}
                error = {this.state.quantityError}
                style = {{margin:"1rem 0"}}
              />
            </div>
            <div style = {{display: "flex", justifyContent:"center", alignItems:"center"}}>
              <TextField
                 variant="outlined"
            margin="normal"
            required
            fullWidth
            size="small"
                name="cost"
                value={cost}
                disabled
                label="Cost in $"
                onChange={this.handleFormInput}
                  style = {{margin:"1rem 0"}}
              />
            </div>
  
          <div className={style.btn}  style = {{display: "flex", justifyContent:"center", alignItems:"center"}} >
           <button className = "btn btn-primary" style = {{background: "#00ADEE", width:"100%"}} >Submit</button>
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