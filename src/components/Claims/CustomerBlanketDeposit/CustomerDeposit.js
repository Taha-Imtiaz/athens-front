import React, { useEffect, useState } from 'react'
import style from './CustomerDeposit.module.css'
import SideBar from '../../Sidebar/SideBar'
import Button from '../../Button/Button'
import { Link } from 'react-router-dom'
import { getDeposits, updateDeposit } from '../../../Redux/Claims/claimsActions'
import { clone, cloneDeep } from "lodash"
import { showMessage } from '../../../Redux/Common/commonActions'
import { connect } from "react-redux";

const CustomerDeposit = (props) => {

  const routes = [{
    title: "Claims",
    path: "/claim/customer",
    icon: <i className="fa fa-exchange"></i>
  },
  {
    title: "Blanket Deposit",
    path: "/claim/customerdeposit",
    icon: <i className="fa fa-bed"></i>
  }
  ]
  const [blankets, setBlankets] = useState([])
  const [edit, setEdit] = useState(true)

  useEffect(() => {
    getDeposits().then(res => {
      setBlankets(res.data.blanketDeposit)
    })
  }, []);

  const decrement = (x, i) => {
    let newData = cloneDeep(blankets);
    newData[i].quantity = --x.quantity;
    setBlankets(newData)
  }

  const increment = (x, i) => {
    let newData = cloneDeep(blankets);
    newData[i].quantity = ++x.quantity;
    setBlankets(newData)
  }

  const closeEdit = (i, type) => {
    let newData = cloneDeep(blankets);
    newData[i].edit = !newData[i].edit;
    setBlankets(newData)
    // Call Api
    if (type == 'save') {

      var {user} = props
      var obj = {
        id: newData[i]._id,
        userId:user._id,
        quantity: newData[i].quantity,
        cost: newData[i].cost
      }
      updateDeposit(obj).then(res => {
        var { showMessage } = props;
        showMessage(res.data.message)
      }).catch(err => console.log(err))
    }
  }
 
  return <div>
    <div className="row">
      <div className="col-2">
        <SideBar routes={routes} />
      </div>
      <div className="col-10">
        <div className="row">

          <div className="col-6">
            <h3 className={style.head}>Blanket Deposit</h3>
          </div>
          <div className="col-6">
            <div className={style.btn}>
              <Link style={{ textDecoration: "none" }} to='/claim/customerdeposit/deposit'> <Button name="Deposit" /> </Link>
            </div>
          </div>
        </div>

        {blankets && blankets.length > 0 ?
          <div className = "col-12">
            <div className={`row ${style.myrow} `} >
              <div className={`col-4 ${style.flex}`} style={{fontWeight:"bold"}}>
                <h6>Customer</h6>
              </div>
              <div className={`col-3 ${style.flex}`} style={{fontWeight:"bold"}}>
                <h6>Quantity</h6>
              </div>
              <div className={`col-3 ${style.flex}`} style={{fontWeight:"bold"}}>
                <h6>Deposit</h6>
              </div>
              <div className={`col-2 ${style.flex}`} style={{fontWeight:"bold"}}>
                <h6>Actions</h6>
              </div>
            </div>

            <div className={style.jumbotron}>
              <ul className="list-group" style = {{margin:"2rem 0"}}>
                {blankets.map((x, i) => {
                  // x.edit = true;
                  return (
                    <li key={i} className="list-group-item">
                      <div className="row">
                        <div className="col-4">
                          <label>{x?.customer?.firstName} {x?.customer?.lastName}</label>
                        </div>
                        {/* <div className="col-3">
                    <input type="number" value={x.quantity} onChange = {(e) => x.quantity == e.target.value}/>
                  </div> */}
                        <div class="col-3">
                          <div class="input-group">
                            {!x.edit ? <span class="input-group-btn">
                              <button type="button" class="btn btn-default btn-number" onClick={() => decrement(x, i)}>
                                <span class="fa fa-minus" style = {{transform: "translateY(-0.25rem)"}}></span>
                              </button>
                            </span> : null}
                            <input disabled={x.edit} type="text" class="form-control input-number" value={x.quantity} style = {{margin: "-0.25rem 0"}} min="1" onChange={() => console.log('Changed')}></input>
                            {!x.edit ? <span class="input-group-btn">
                              <button type="button" class="btn btn-default btn-number" onClick={() => increment(x, i)}>
                                <span class="fa fa-plus" style = {{transform: "translateY(-0.25rem)"}}></span>
                              </button>
                            </span> : null}
                          </div>
                        </div>
                        <div className="col-3">
                          <label>{x.quantity * 15}$</label>
                        </div>
                        <div className="col-2">
                          {x.edit ? <label className="fa fa-edit" onClick={() => closeEdit(i, 'edit')}> Edit</label> : <label className="fa fa-save" onClick={() => closeEdit(i, 'save')}> Save</label>}
                        </div>
                      </div>
                    </li>
                  )
                })}
              </ul>
            </div>
          </div>
          : <div className="text-center">
            <img src='/images/no-data-found.png' />
          </div>}


      </div>
    </div>
  </div>
}

var actions = {
  showMessage
}


var mapStateToProps = (state) =>({
  user: state.users.user
})

export default connect(mapStateToProps, actions)(CustomerDeposit);