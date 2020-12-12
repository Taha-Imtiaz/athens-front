import React, { useEffect, useState } from 'react'
import style from './CustomerDeposit.module.css'
import SideBar from '../../Sidebar/SideBar'
import {Button} from '@material-ui/core'
import { Link } from 'react-router-dom'
import { getDeposits, updateDeposit } from '../../../Redux/Claims/claimsActions'
import { clone, cloneDeep } from "lodash"
import { showMessage } from '../../../Redux/Common/commonActions'
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faSave } from "@fortawesome/free-solid-svg-icons";

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
  var [quantityValue, setQuantityValue] = useState(false)
  // var [cost, setCost] = useState('')

  useEffect(() => {
    getDeposits().then(res => {
      console.log(res.data.blanketDeposit)
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
    console.log(newData[i].edit)
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
 var makeInputFieldEditible = (e, i) => {
   console.log("function called")
  let newData = cloneDeep(blankets);
  newData[i].edit = !newData[i].edit;
  
  console.log(newData[i].edit)
  setBlankets(newData)
 }
 var handleInput = (e, i) => {
var {name, value} = e.target;
let newData = cloneDeep(blankets);
newData[i].quantity = value
setQuantityValue(true)
console.log(name, value, newData[i].quantity)
setBlankets(newData)

 }
 var changeCost = (e,i) => {
  var {name, value} = e.target;
  let newData = cloneDeep(blankets);
  setQuantityValue(false)
  newData[i].cost = value
  console.log(newData[i].cost)
  // setCost(value)
  console.log(newData[i].cost)
  setBlankets(newData)
 }
  return <div>
    <div className="row">
      <div className="col-2">
        {/* <SideBar routes={routes} /> */}
      </div>
      <div className="col-12">
        <div className="row">

          <div className="col-6">
            <h3 className={style.head}>Blanket Deposit</h3>
          </div>
          <div className="col-6">
            <div className={style.btn}>
              <Link style={{ textDecoration: "none" }} to='/claim/customerdeposit/deposit'> <Button style={{background:"#00ADEE", textTransform:"none", color:"#FFF", fontFamily:"sans-serif"}}>Deposit</Button> </Link>
            </div>
          </div>
        </div>

        {blankets && blankets.length > 0 ?
          <div className = "col-12">
            <div className={`row ${style.myrow}`}  >
              <div className={`col-2`} style={{fontWeight:"bold"}}>
                <h6>Customer</h6>
              </div>
              <div className={`col-3`} style={{fontWeight:"bold"}}>
                <h6>Quantity</h6>
              </div>
              <div className={`col-3 `} style={{fontWeight:"bold"}}>
                <h6>Deposit</h6>
              </div>
              <div className="col-2" style={{fontWeight:"bold"}}>Last Updated</div>
              <div className={`col-2 `} style={{fontWeight:"bold"}}>
                <h6>Actions</h6>
              </div>
            </div>

            <div className={`${style.jumbotron}`} >
              <ul className="list-group">
                {blankets.map((x, i) => {
                  // x.edit = true;
                  return (
                    <li key={i} className={`list-group-item ${style.list}`} style={{fontFamily:"Segoe UI, Tahoma, Geneva, Verdana, sans-serif"}}>
                      <div className={`row `}>
                        <div className="col-2">
                          <label>{x?.customer?.firstName} {x?.customer?.lastName}</label>
                        </div>
                        {/* <div className="col-3">
                    <input type="number" value={x.quantity} onChange = {(e) => x.quantity == e.target.value}/>
                  </div> */}
                        <div class={`col-3 `}>
                          <div >
                            {/* {!x.edit ? <span class="input-group-btn">
                              <button type="button" class="btn btn-default btn-number" onClick={() => decrement(x, i)}>
                                <span class="fa fa-minus" style = {{transform: "translateY(-0.25rem)"}}></span>
                              </button>
                            </span> : null} */}
                            <span 
                             onDoubleClick={(e) =>{
                              //  setEdit(!edit)
                              makeInputFieldEditible(e, i) 
                             }
                            }
                             >
                            <input  onChange = {(e) => handleInput(e,i)}
                             disabled={x.edit} 
                             type="text" class={`form-control input-number `}
                             name = "quantity"
                             value={x.quantity} 
                            //  min="1" 
                            
                             >
                              
                             </input>
                             </span>
                            {/* {!x.edit ? <span class="input-group-btn">
                              <button type="button" class="btn btn-default btn-number" onClick={() => increment(x, i)}>
                                <span class="fa fa-plus" style = {{transform: "translateY(-0.25rem)"}}></span>
                              </button>
                            </span> : null} */}
                          </div>
                        </div>
                        <div className="col-3" >
                          <span  onDoubleClick={(e) =>{
                            // setEdit(!edit)
                            makeInputFieldEditible(e, i)
                          } }>
                          <input
                           onChange = {(e) => changeCost(e,i)}
                          disabled = {x.edit}
                          type="text"
                          name = "cost"
                           class={`form-control input-number `} value={quantityValue === true ? x.quantity *15 : x.cost}
                          // min="1"
                         
                          
                          >
                            </input>
                            </span>
                        </div>
                        <div className="col-2">
                <label htmlFor="">{x.updatedAt.split("T")[0]} <span> | </span>{x.updatedAt.split("T")[1].split(".")[0]}</label>
                        </div>
                        <div className="col-2">
                          {x.edit ? <div>
                            <FontAwesomeIcon icon = {faEdit} onClick={() => closeEdit(i, 'edit')}>  </FontAwesomeIcon> <label htmlFor=""> Edit</label>
                          </div> : <div><FontAwesomeIcon icon = {faSave} onClick={() => closeEdit(i, 'save')}>  </FontAwesomeIcon> <label htmlFor=""> Save</label></div> }
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