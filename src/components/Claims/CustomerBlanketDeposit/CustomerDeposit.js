import React from 'react'
import style from './CustomerDeposit.module.css'
import SideBar from '../../Sidebar/SideBar'
import Button from '../../Button/Button'

const CustomerDeposit = () => {

  const routes = [{
    title: "Claims",
    path: "/claim/customer"
  },
  {
    title: "Blanket Deposit",
    path: "/claim/customerdeposit"
  }
  ]


  return <div>
    <div className="row">
      <div className="col-2">
        <SideBar routes={routes} />
      </div>
      <div className="col-6">
        <h3 className={style.head}>Blanket Deposit</h3>
      </div>
      <div className="col-4">
        <div className={style.btn}>
          <Button name="Deposit" />
        </div>
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