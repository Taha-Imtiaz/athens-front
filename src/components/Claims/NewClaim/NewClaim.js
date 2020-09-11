import React, { Component } from 'react';
import style from './NewClaim.module.css'
import DatePicker from "react-datepicker";

import Button from '../../Button/Button'
import "react-datepicker/dist/react-datepicker.css";


class NewClaim extends Component {

  state = {
    startDate: ""
  };

  handleChangeFrom = date => {
    this.setState({
      fromDate: date
    });
  };

  handleChangeTo = date => {
    this.setState({
      toDate: date
    });
  };

  render() {
    return (
      <div>
        <h3 className={style.head}>New Claim</h3>

        <div className={`jumbotron ${style.form}`}>
          <form>
            <div class="form-group">
              <input type="input" class="form-control" id="name" placeholder="Claimant Name" aria-describedby="emailHelp" />
            </div>
            <div class="form-group">
              <input type="input" class="form-control" id="jobid" placeholder="Job Id" aria-describedby="emailHelp" />
            </div>
            <div className="row">
              <div className="col-8">
                <div class="form-group">
                  <input type="input" class="form-control" id="item" placeholder="Item" aria-describedby="emailHelp" />
                </div>
              </div>
              <div className="col-4">
                <div class="form-group">
                  <input type="input" class="form-control" id="price" placeholder="$$$" aria-describedby="emailHelp" />
                </div>
              </div>

            </div>
            <div class="form-group">
              <input type="text" class="form-control" id="description" placeholder="Item Description" aria-describedby="emailHelp" />
            </div>


            <div className={`row`}>

              <div className="col-2">
                <p>Select Date</p>
              </div>
              <div className="col-5">
                <div class="form-group">
                  <DatePicker className={style.from}
                    selected={this.state.fromDate}
                    onChange={this.handleChangeFrom}
                    placeholderText="From"
                    class="form-control"
                  />
                </div>
              </div>
              <div className="col-5">
                <div class="form-group">

                  <DatePicker className={style.to}
                    selected={this.state.toDate}
                    onChange={this.handleChangeTo}
                    placeholderText="To"
                    class="form-control"
                  />
                </div>
              </div>
            </div>



            <div className="row">
              <div className="col-2 col-md-2">
                <div class="form-group">
                  <label className={style.l1}>Location:</label>
                </div>
              </div>
              <div className="col-5 col-md-5">
                <div class="form-group">
                  <input type="input" class="form-control" id="from" placeholder="From" aria-describedby="emailHelp" />
                </div>
              </div>
              <div className="col-5 col-md-5">
                <input type="input" class="form-control" id="to" placeholder="To" aria-describedby="emailHelp" />
              </div>

            </div>


            <div className={style.btn}>
              <Button name="Submit" />
            </div>

          </form>
        </div>

      </div>
    );
  }
}

export default NewClaim