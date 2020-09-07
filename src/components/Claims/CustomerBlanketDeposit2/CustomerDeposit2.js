import React from 'react'
import CustomerDeposit from '../CustomerBlanketDeposit/CustomerDeposit'
import style from './CustomerDeposit2.module.css'
import Button from '../../Button/Button'


const CustomerDeposit2 = () => {
    return <div>
        <h3 className={style.head}>Blanket Deposit</h3>
        <div className={`row ${style.myrow}`}>
            <div className={`col-2 ${style.in}`}>
                <input className={style.input_fields} type="text" id="blanket" placeholder="Blanket Size" />
            </div>
            <div className="col-1">
                <div class="dropdown">
                    <button className="btn btn-primary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Rent
  </button>
                    <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                        <a class="dropdown-item" href="#">Action</a>
                        <a class="dropdown-item" href="#">Another action</a>
                        <a class="dropdown-item" href="#">Something else here</a>
                    </div>
                </div>
            </div>
        </div>
        <div className = {style.btn}>
            <Button name = "Submit"/>
        </div>

    </div>
}

export default CustomerDeposit2