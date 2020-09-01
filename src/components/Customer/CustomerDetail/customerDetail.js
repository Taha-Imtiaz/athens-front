import React from 'react'
import Navbar from '../../Navbar/Navbar'
import style from './customerdetail.module.css'

const customerDetail = ()=>{
    return<div>
    <div class={style.sidebar}>
  <a class="active" href="#claim">Claim</a>
  <a href="#blanket_deposit">Blanket Deposit</a>
</div>
    <div  className={style.head}>
    <h2>Muhammad Shaheer Abbas</h2>
    <label className={style.l1}>03312858185</label>
    <label className={style.l2}>shaheerabbas20@gmail.com</label>
    <h3 className={style.sub}>Sub Contact</h3>
    </div>
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

  

  <div class={style.jumbotron}>
  <div class="row" >
  <div class="col-4">
  <h3 className="job">Jobs:</h3>
    </div>
    <div class="col-4">
    <label className={style.assigned}>Assigned</label>
   </div>
   <div class = "col-4">
   <label className={style.status}>Status</label>
   </div>
    </div>
    <div className="row">
        <div class = "col-4">
    <p>7-July 10  |  10am - 2pm</p>
    <p>Packing/loading/Unloading</p>
    </div>
    </div>
    <div>
    <h4 className={style.notesh}>Notes</h4>
    <p className = {style.notesd}>ajsbfjbdnsandkvnlksdnf.nasknvnsvm,.sdmv</p>
    </div>
    <a class="btn btn-primary btn-lg" href="#" role="button">Add Note</a>
    
    </div>
    <br/>


</div>
}
export default customerDetail