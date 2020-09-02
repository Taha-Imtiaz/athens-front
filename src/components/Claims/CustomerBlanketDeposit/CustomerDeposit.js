import React from 'react'
import style from'./CustomerDeposit.module.css'
import SideBar from '../../Sidebar/SideBar'

const CustomerDeposit = ()=>{
    return <div>
        <SideBar/>
        <div className="row">
        <div className="col-4">
        </div>
        <div className="col-4">
            <h3>Blanket Deposit</h3>
        </div>
        <div className="col-4">
        <button type="submit" className="btn" class="btn btn-primary">Deposit</button>
        </div>
        </div>

        <div className={`row ${style.myrow}`}>
            <div className="col-4">
                <h6>Blanket</h6>
            </div>
            <div className="col-4">
                <h6>Quantity</h6>
            </div>
            <div className="col-4">
                <h6>Deposit</h6>
            </div>
        </div>

        <div className={style.jumbotron}>
        <ul class="list-group">
  <li class=" checkbox list-group-item d-flex justify-content-between align-items-center">
    <label>Size(m)</label>
    <label>2</label>
    <label>$$$</label>
  </li>
  <li class="list-group-item d-flex justify-content-between align-items-center">
    <label>Size(s)</label>
    <label>3</label>
    <label>$$$</label>
  </li>

  <li class="list-group-item d-flex justify-content-between align-items-center">
    <label>Size(L)</label>
    <label>4</label>
    <label>$$$</label>
  </li>
</ul>
</div>

    </div>
}

export default CustomerDeposit