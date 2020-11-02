import React, { Component } from 'react';
import Button from '../../Button/Button';
import style from './Availability.module.css'
import { setAvailability } from '../../../Redux/Mover/moverActions'
import { clone, cloneDeep } from "lodash"
import { connect } from "react-redux";
import { showMessage } from '../../../Redux/Common/commonActions'

class Availability extends Component {

    state = {
        days: "",
        // weeklySchedule: [{
        //     "day": "Monday",
        //     "status": true
        // }, {
        //     "day": "Tuesday",
        //     "status": true
        // }, {
        //     "day": "Wednesday",
        //     "status": true
        // }, {
        //     "day": "Thursday",
        //     "status": false
        // }, {
        //     "day": "Friday",
        //     "status": false
        // }, {
        //     "day": "Saturday",
        //     "status": true
        // }, {
        //     "day": "Sunday",
        //     "status": false
        // }],
        user: '',
        weeklySchedule: []
    }
    // constructor(props) {
    //     super(props)
    // }

    handleChange = (e) => {
        let newData = cloneDeep(this.state);
        let index = newData.weeklySchedule.findIndex(x => x.day == e.target.value)
        newData.weeklySchedule[index].status = !newData.weeklySchedule[index].status
        this.setState(newData)
    }

    handleSubmit = (e) => {
        var { showMessage } = this.props;
        e.preventDefault();
        let obj = {
            weeklySchedule: this.state.weeklySchedule
        }
        setAvailability(obj, this.state.user._id)
        // setAvailability(obj, this.state.user._id).then(res => {
        //     if (res.data.status == 200) {
        //         showMessage(res.data.message)
        //         this.setState({ weeklySchedule: res.data.assignee.weeklySchedule })
        //     }
        // })
    }

    componentDidMount() {
        if (this.props.loggedinUser) {
            this.setState({
                user: this.props.loggedinUser,
                weeklySchedule: this.props.loggedinUser.weeklySchedule
            });
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            user: nextProps.loggedinUser,
            weeklySchedule: nextProps.loggedinUser.weeklySchedule
        });
    }

    render() {
        return (
            <div className={style.main}>
                <h3>Select Your Availability</h3>
                <div className={style.list}>
                    {this.state.weeklySchedule.map(list => {
                        return <><div className={`form-check d-flex justify-content-start ${style.border}`}>
                            <input className={`form-check-input ${style.check}`} checked={list.status} type="checkbox" name={list.day} onChange={this.handleChange} value={list.day} id="defaultCheck1" />
                            <h5 className={style.label}><label className="form-check-label" htmlFor="defaultCheck1">
                                {list.day}
                            </label></h5>
                        </div></>

                    })}
                </div>
                <div className={style.btn}>
                    <Button name="Save" onClick={this.handleSubmit} />
                </div>
            </div>
        );
    }
}

// export default Availability;

var actions = {
    showMessage
}

var mapStateToProps = (state) => ({
    loggedinUser: state.users.user,
});

export default connect(mapStateToProps, actions)(Availability);