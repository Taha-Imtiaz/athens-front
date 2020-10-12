import React, { Component } from 'react';
import style from './JobEditDetails.module.css'
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import { Multiselect } from 'multiselect-react-dropdown';
import { connect } from 'react-redux';
import { getJob } from '../../../Redux/Job/jobActions';


class JobEditDetails extends Component {

    state = {
        options: [{ name: 'Srigar', id: 1 }, { name: 'Sam', id: 2 }],
        startDate: "",
        title:  '', 
        job: null

    };

    handleChange = date => {
        console.log(date)
        this.setState({
            startDate: date
        });
    };
componentDidMount = () => {
    // var {getJob} = this.props 
    var {match:{params:{jobId}}} = this.props
    // console.log(jobId)
    var {title,job} = this.state
    console.log(jobId)
    getJob(jobId).then((res) => {
        console.log(res)
    })
    getJob(jobId).then((res) => {
        console.log(res.data.job[0])
        this.setState({
      job: res.data.job[0],
       title: res.data.job[0].title,
       startDate: new Date(),
       startTime: res.data.job[0].startTime,
       locationFrom :res.data.job[0].from,
       locationTo:res.data.job[0].to,
       description:res.data.job[0].description

})
    })
  
   
// console.log(title)
}
handleFormInput = (e) => {
    var {name, value} = e.target
    this.setState({
        [name]: value
    })
}
    render() {
       var {job} = this.state
         var {match:{params:{jobId}}} = this.props
         console.log(job)

       
         var {title,startDate, startTime,locationFrom,locationTo, description} =  this.state
        return (
            <div>
           
                <h3 className = {style.head}>Job Details Edit</h3>
                <div className="row">
                    <div className="col-8">
                        <div className={`${style.tron}`}>

                            <form>
                                <div className="form-group">
                                  
                                    <input type="input" class="form-control" id="jobTitle" placeholder="Job Title" aria-describedby="emailHelp" name = "title" value = {title} onChange = {this.handleFormInput} />
                                </div>
                                <div className="row">
                                    <div className="col-6">
                                        <div class="form-group">
                                            <DatePicker className={style.to}
                                    
                                                selected={startDate}
                                                onChange={this.handleChange}
                                                placeholderText="Date"
                                            />
                                        </div>

                                    </div>
                                    <div className="col-6">
                                        <div className="form-group">
                                            <input type="input" class="form-control" id="time" placeholder="Time" aria-describedby="emailHelp" name = "startTime" value = {startTime} onChange = {this.handleFormInput} />
                                        </div>

                                    </div>
                                </div>



                                <div className="row">
                                    <div className="col-4">
                                        <div class="form-group">
                                            <label>Location:</label>
                                        </div>
                                    </div>
                                    <div className="col-4">
                                        <div class="form-group">
                                            <input type="input" class="form-control" id="from" placeholder="Start" aria-describedby="emailHelp" name = "locationFrom" value = {locationFrom} onChange = {this.handleFormInput} />
                                        </div>
                                    </div>
                                    <div className="col-4">
                                        <input type="input" class="form-control" id="to" placeholder="End" aria-describedby="emailHelp" name = "locationTo" value = {locationTo} onChange = {this.handleFormInput} />
                                    </div>

                                </div>

                                <div class="form-group">
                                    <Multiselect
                                        options={this.state.options} // Options to display in the dropdown
                                        onSelect={this.onSelect} // Function will trigger on select event
                                        onRemove={this.onRemove} // Function will trigger on remove event
                                        displayValue="name" // Property name to display in the dropdown options

                                    />
                                </div>

                            </form>
                        </div>
                    </div>
                    <div className="col-4">
                        <div class="dropdown">
                            <button className={`btn btn-primary dropdown-toggle ${style.colors}`} type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Change Status
                            </button>
                            <div class="dropdown-menu" aria-labelledby="dropdownMenu2">
                                <button class="dropdown-item" type="button">Action</button>
                                <button class="dropdown-item" type="button">Another action</button>
                                <button class="dropdown-item" type="button">Something else here</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={`${style.tron2}`}>
                    <h3 className={style.jobtag}>Job Description</h3>
                <form>
                    <div className="form-group">
                  <input type="text" class="form-control" name="description" value = {description} id="" onChange = {this.handleFormInput}/>
               </div>
                </form>
                </div>

                <h3 className = {style.assigneehead}>Assignees</h3>
                <div className="row">
                    <div className={`col-6 ${style.badge}`}>
                        <span className={`badge badge-primary ${style.color}`}>Primary</span>
                        <span className={`badge badge-primary ${style.color}`}>Primary</span>

                    </div>
                    <div className = "col-1">
                    <button className={`btn btn-primary ${style.color}`}><i className="fa fa-plus"></i></button>
                    </div>
                </div>
        

                <div className={`${style.tron2}`}>
                    <h3 className={style.jobtag}>Notes</h3>
                    
                    {job?.note.map((note) => <p className = {style.para}>{note.text} </p>)}
                    
                    <div className="btnalign">
                        <button type="submit" className={`btn btn-primary ${style.btnCustom}`}>Delete</button>
                        <button type="submit" className={`btn btn-primary ${style.btnCustom}`}>Add Notes</button>
                    </div>
                </div>
                <div className={style.btnalign}>
                    <button type="submit" className={`btn btn-primary ${style.btnCustom}`}>Update</button>
                    <button type="submit" className={`btn btn-primary ${style.btnCustom}`}>Reset</button>
                </div>
                </div>
         

        );
    }
}
// var mapStateToProps = (state) => ({
//     jobs: state.jobs
// })
// var actions = {
//     getJob
// }

export default JobEditDetails;