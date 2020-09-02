import React from 'react'
import CustomerDeposit from '../CustomerBlanketDeposit/CustomerDeposit'
import style from './CustomerDeposit2.module.css'


const CustomerDeposit2 = ()=>{
    return <div>
        <h3 className={style.head}>Blanket Deposit</h3>
        <div className={`row ${style.myrow}`}>
            <div className = 'col-3'>    
            <input className={style.input_fields} type="text" id="blanket" placeholder="Blanket Size"/>
            </div>
            <div className="col-3">
            <div class="dropdown">
            <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Rent
            </button>
            <div class="dropdown-menu" className="btn" aria-labelledby="dropdownMenuButton">
            <a class="dropdown-item" href="#">Action</a>
            <a class="dropdown-item" href="#">Another action</a>
            <a class="dropdown-item" href="#">Something else here</a>
        </div>
        </div>    
            </div>    
        </div>

    </div>
}

export default CustomerDeposit2