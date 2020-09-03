import React, { Component } from 'react';
import style from './Calendar.module.css'

import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'

class CalendarApp extends Component {
    state = {
        date: new Date(),
    }

    onChange = date => this.setState({ date })

    render() {
        return (
            <div>
                <div className={`row ${style.toprow}`}>
                    <div className="col-8">
                        <div className={style.cal}>
                            <Calendar
                                onChange={this.onChange}
                                value={this.state.date}
                            />
                        </div>
                    </div>

                    <div className="col-4">
                        <div className={`card ${style.cardCustom}`} >
                            <div class="card-body">
                                <h5 class="card-title">Customer</h5>
                                <h6 class="card-subtitle mb-2 text-muted">John Doe</h6>
                                <p class="card-text">+1 1234567890</p>
                                <p class="card-text">name@gmail.com</p>
                            </div>
                        </div>
                        <div className={`card ${style.cardCustom2}`} >
                            <div class="card-body">
                                <h5 class="card-title">Customer</h5>
                                <h6 class="card-subtitle mb-2 text-muted">John Doe</h6>
                                <p class="card-text">+1 1234567890</p>
                                <p class="card-text">name@gmail.com</p>
                            </div>
                        </div>

                    </div>
                </div>




            </div>
        );
    }
}

export default CalendarApp;