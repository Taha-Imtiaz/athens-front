import React, { Component } from "react";
import CustomerDeposit from "../CustomerBlanketDeposit/CustomerDeposit";
import style from "./SubmitDeposit.module.css";
import Button from "../../Button/Button";
import { addDeposit } from '../../../Redux/Claims/claimsActions'
import { showMessage } from '../../../Redux/Common/commonActions'
import { connect } from "react-redux";

class SubmitDeposit extends Component {
  state = {
    quantity: '',
    cost: '',
    customer: ''
  }

  handleSubmit = (e) => {
    var { quantity, customer, cost } = this.state
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
    var { quantity, customer, cost } = this.state
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <h3 className={style.head}>Blanket Deposit</h3>
          <div className={`row ${style.myrow}`}>
            <div className={`col-5 col-md-3 ${style.in}`}>
              <input
                className={style.input_fields}
                type="text"
                name="customer"
                value={customer}
                placeholder="Customer Id"
                onChange={this.handleFormInput}
              />
            </div>
            <div className={`col-5 col-md-3 ${style.in}`}>
              <input
                className={style.input_fields}
                type="number"
                name="quantity"
                value={quantity}
                placeholder="Blanket Quantity"
                onChange={this.handleFormInput}
              />
            </div>
            <div className={`col-5 col-md-3 ${style.in}`}>
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
          </div>
          <div className={style.btn}>
            <Button name="Submit" />
          </div>
        </form>
      </div >
    );
  }
}

var actions = {
  showMessage
};

export default connect(null, actions)(SubmitDeposit);