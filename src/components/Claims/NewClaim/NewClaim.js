import React, { Component } from 'react';
import style from './NewClaim.module.css'
import DatePicker from "react-datepicker";
 
import "react-datepicker/dist/react-datepicker.css";


class NewClaim extends Component {

    state = {
        startDate: ""
      };
     
      handleChange = date => {
        this.setState({
          startDate: date
        });
      };


    render() {
        return (
            <div>
              <h3 className={style.head}>New Claim</h3>  

    <div className={`jumbotron ${style.form}`}>
    <form>
        <div class="form-group">
    <input type="input" class="form-control" id="name" placeholder="Claimant Name" aria-describedby="emailHelp"/>
    </div>
    <div class="form-group">
    <input type="input" class="form-control" id="jobid" placeholder="Job Id" aria-describedby="emailHelp"/>
    </div>
    <div className="row">
        <div className="col-8">
        <div class="form-group">
        <input type="input" class="form-control" id="item" placeholder="Item" aria-describedby="emailHelp"/>
        </div>
        </div>
            <div className="col-4">
            <div class="form-group">
            <input type="input" class="form-control" id="price" placeholder="$$$" aria-describedby="emailHelp"/>
        </div>
            </div>
        
    </div>
    <div class="form-group">
    <input type="text" class="form-control" id="description" placeholder="Item Description" aria-describedby="emailHelp"/>
    </div> 


    <div className = {`row ${style.myrow}`}>
        <div className = "col-3">
    <div class="form-group">
    <DatePicker
        selected={this.state.startDate}
        onChange={this.handleChange}
        placeholderText="From"
      />
    </div>
    </div>
    <div className = "col-3">
    <div class="form-group">
    <DatePicker className={style.to}
        selected={this.state.startDate}
        onChange={this.handleChange}
        placeholderText="To"
      />
    </div>
        </div>
    </div>


    <div className="row">
        <div className="col-4">
        <div class="form-group">
        <label className={style.l1}>Location:</label>
        </div>
            </div>
        <div className="col-4">
            <div class="form-group">
            <input type="input" class="form-control" id="from" placeholder="From" aria-describedby="emailHelp"/>
        </div>
            </div>
            <div className="col-4">
        <input type="input" class="form-control" id="to" placeholder="To" aria-describedby="emailHelp"/>
        </div>
        
    </div>

    </form>
    </div>
    <button type="submit" className="btn" class="btn btn-primary">Submit</button>

</div>
        );
    }
}

export default NewClaim