import React from 'react'
import Navbar from '../../Navbar/Navbar'
import style from './customerdetail.module.css'
import Button from '../../Button/Button'
import SideBar from '../../Sidebar/SideBar'
import { Link } from 'react-router-dom'


const customerDetail = () => {

  const routes = [{
    title: "Claims",
    path: "/claim/customer",
    icon: <i className = "fa fa-exchange"></i>
  },
  {
    title: "Blanket Deposit",
    path: "/claim/customerdeposit",
    icon: <i className = "fa fa-bed"></i>
  }
  ]

  return <div>
    <div className="row">
      <div className="col-2">
      <SideBar routes={routes} />
      </div>
      <div className="col-6">
        <div className={style.head}>
          <h5>Muhammad Shaheer Abbas</h5>
          <label className={style.l1}>03312858185</label>
          <label className={style.l2}>shaheerabbas20@gmail.com</label>
        </div>
      </div>
      <div className="col-4">
        <div className={`row ${style.toprow}`}>
          <div className="col-2">
            <Button icon="fa fa-edit" />
          </div>
          <div className="col-2">
            <Button icon="fa fa-trash" />
          </div>
        </div>
      </div>
    </div>

    <h3 className={style.sub}>Sub Contact</h3>


    <div className={style.container}>
      <div class="accordion" id="accordionExample">
        <div class="card">
          <div class="card-header" id="headingOne">
            <h5 class="mb-0">
              <button class="btn btn-link" type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                Contact #1
        </button>
            </h5>
          </div>

          <div id="collapseOne" class="collapse show" aria-labelledby="headingOne" data-parent="#accordionExample">
            <div class="card-body">

              <label className={style.l1}>03312858185</label>
              <label className={style.l2}>shaheerabbas20@gmail.com</label>
            </div>
          </div>
        </div>

        <div class="card">
          <div class="card-header" id="headingTwo">
            <h5 class="mb-0">
              <button class="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                Contact #2
        </button>
            </h5>
          </div>
          <div id="collapseTwo" class="collapse" aria-labelledby="headingTwo" data-parent="#accordionExample">
            <div class="card-body">
              <label className={style.l1}>03312858185</label>
              <label className={style.l2}>shaheerabbas20@gmail.com</label>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div className={style.btn}>
     <Link style={{ textDecoration: "none" }} to='/job/create'> <Button name="Create Job" /> </Link>
    </div>

    <div class={style.jumbotron}>
      <div class="row" >
        <div class="col-4">
          <h3 className={style.job}>Jobs:</h3>
        </div>
        <div class="col-4">
          <label className={style.assigned}>Assigned</label>
        </div>
        <div class="col-4">
          <label className={style.status}>Status</label>
        </div>
      </div>
      <div className="row">
        <div class="col-4">
          <p className={style.p}>7-July 10  |  10am - 2pm</p>
          <p className={style.p}>Packing/loading/Unloading</p>
        </div>
      </div>
      <div>
        <h4 className={style.notesh}>Notes</h4>
        <p className={style.notesd}>ajsbfjbdnsandkvnlksdnf.nasknvnsvm,.sdmv</p>
      </div>
      <Button name="Add Note" />

    </div>
    <br />


  </div>
}
export default customerDetail