import React, { Component } from "react";
import CustomerDeposit from "../CustomerBlanketDeposit/CustomerDeposit";
import style from "./SubmitDeposit.module.css";
import Button from "../../Button/Button";

class SubmitDeposit extends Component {
    state = {
        blanket:''
    }
  handleSubmit = (e) => {
      var {blanket} = this.state
    e.preventDefault()
    console.log(blanket)
    this.setState({
         blanket: ""
    })
  };
  handleFormInput = (e) => {
var {name, value} = e.target;
this.setState({
    [name]: value
})

  }
  render() {
      var {blanket} = this.state
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <h3 className={style.head}>Blanket Deposit</h3>
          <div className={`row ${style.myrow}`}>
            <div className={`col-5 col-md-2 ${style.in}`}>
              <input
                className={style.input_fields}
                type="text"
                name="blanket"
                value = {blanket}
                placeholder="Blanket Size"
                onChange = {this.handleFormInput}
              />
            </div>
            <div className="col-2 col-md-2">
              <div className={`dropdown`}>
                <button
                  className={`btn btn-primary dropdown-toggle ${style.drop}`}
                  type="button"
                  id="dropdownMenuButton"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  Rent
                </button>
                <div
                  className="dropdown-menu"
                  aria-labelledby="dropdownMenuButton"
                >
                  <a class="dropdown-item" href="#">
                    Action
                  </a>
                  <a class="dropdown-item" href="#">
                    Another action
                  </a>
                  <a class="dropdown-item" href="#">
                    Something else here
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className={style.btn}>
            <Button name="Submit" />
          </div>
        </form>
      </div>
    );
  }
}

export default SubmitDeposit;
