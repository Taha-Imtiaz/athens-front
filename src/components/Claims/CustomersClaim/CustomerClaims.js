import React, { useEffect, useState } from 'react'
import style from './CustomerClaims.module.css'
import SideBar from '../../Sidebar/SideBar'
import Button from '../../Button/Button'
import { Link } from 'react-router-dom'
import { connect } from "react-redux";
import { getAllClaims, updateClaim, getClaimsByID } from "../../../Redux/Claims/claimsActions";
import { Modal } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import _ from 'lodash';
import { clone, cloneDeep } from "lodash"
import { showMessage } from '../../../Redux/Common/commonActions'

const CustomerClaims = (props) => {
    const [show, setShow] = useState(false)
    const [update, setUpdate] = useState('')
    const [updateIndex, setUpdateIndex] = useState(0)

    useEffect(() => {
        var { getAllClaims } = props;
        getAllClaims('all');

    }, [])
    var { claims } = props;
    var data = [];
    if (claims.claims) {
        data = claims.claims.data.claims
    }

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

    const handleShow = (i) => {
        setShow(true);
        setUpdateIndex(i);
    };

    const handleClose = (notes) => {
        // var { note } = this.state;
        setShow(false);
        // this.setState({
        //     show: false,
        //     note: notes,
        // });
    };
    const updateClaimData = () => {
        let ob = {
            timestamp: new Date(),
            value: update
        }
        let newData = cloneDeep(data);
        console.log(newData)
        newData[updateIndex].updates.push(ob);
        console.log(newData[updateIndex])
        var { showMessage, history } = props;
        updateClaim(newData[updateIndex]).then(res => {
            console.log(res)
            if (res.data.status == 200) {
                console.log('Inside', data[updateIndex].updates, newData[updateIndex].updates)
                data[updateIndex].updates = res.data.claim.updates;
                setShow(false);
                setUpdate('');
                // history.push('/claim/customer')
                showMessage(res.data.message)
                // data[updateIndex] = res.data.claim;
            }
            console.log(data)
        }).catch(err => console.log(err))
    }
    const handleAddUpdate = (e) => {
        setUpdate(e.target.value)
        console.log(e.target.value)
    }

    const handleCloseJob = (i) => {
        var { showMessage } = props;
        data[i].status = 'closed';
        updateClaim(data[i]).then(res => {
            console.log(res)
            if (res.data.status == 200) {
                showMessage(res.data.message)
            }
        }).catch(err => console.log(err))
    }

    const getClaimsByStatus = (e) => {
        console.log(e.target.value)
        var { getAllClaims } = props;
        getAllClaims(e.target.value);
    }

    return <div>
        <div className="row">
            <div className="col-2">
                <SideBar routes={routes} />
            </div>
            <div className="col-4">
                <h3 className={style.head}>Claims</h3>
            </div>
            <div className="col-3">
                <div className={style.btn}>
                    <Link style={{ textDecoration: "none" }} to='/claim/newclaim'> <Button name="New Claim" /> </Link>
                </div>
            </div>
            <div className="col-2">
                <div className={`${style.btn}`}>
                    <div className="form-group">
                        <select className="form-control" onChange={getClaimsByStatus}>
                            <option value="all">All</option>
                            <option value="open">Open</option>
                            <option value="closed">Closed</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
        {
            data && data.length > 0 ? data.map((x, i) => {
                return (
                    <div className={style.jumbotron} key={x._id}>
                        <div className="row justify-content-between">
                            <div className="col-10">
                                <h6 className={style.comp}>Job ID: {x.job._id}</h6>
                            </div>
                            <div className="col-2">
                                {x.status == 'open' ? <Button name="Close Claim" onClick={() => handleCloseJob(i)}></Button> : <h5>Closed</h5>
                                }
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-6">
                                <h6 className={style.comp}>{x.customer.firstName} {x.customer.lastName}</h6>
                            </div>

                        </div>
                        {/* <div className="row">
                        <div className="col-10">
                            <p className={style.comp}>from {x.from} - to {x.to}</p>
                        </div>
                    </div> */}
                        {
                            x.claims.map((y, j) => {
                                return (
                                    <div key={j}>
                                        <hr></hr>
                                        <h6 className={style.sub}>Claim Type : {y.claimType}</h6>
                                        <div className="row">
                                            <div className="col-10">
                                                <p className={style.para}>Description : {y.description}</p>
                                            </div>
                                            <div className="col-2">
                                                <p className={style.p2}>${y.price}</p>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                        <hr />
                        {
                            x.claims.length > 0 ? <div className="row">
                                <div className="col-10">
                                    {/* <Button name="Add Update" onClick={() => handleShow(i)}></Button> */}
                                </div>
                                <div className="col-2"><p> Total: ${x.claims.reduce(function (a, b) {
                                    return a + b['price'];
                                }, 0)
                                }</p></div>
                            </div> : null
                        }
                        <hr />
                        <div className="row">
                            <div className="col-10">
                                {
                                    x.updates.length > 0 ? <div>
                                        <h3>Updates</h3>
                                        {
                                            x.updates.map((x, i) => (
                                                <div key={i} className="row">
                                                    <div className="col-8">
                                                        {x.value}
                                                    </div>
                                                    <div className="col-4">
                                                        {x.timestamp}
                                                    </div>
                                                </div>
                                            ))
                                        }
                                    </div> : null
                                }
                            </div>
                            <div className="col-2">
                                {x.status == 'open' ? <Button name="Add Update" onClick={() => handleShow(i)}></Button> : null
                                }
                            </div>
                        </div>
                    </div>
                )
            })
                : <div className="text-center">
                    <img src='/images/no-data-found.png' />
                </div>}
        <Modal show={show} onHide={handleClose} animation={false} centered>
            <Modal.Header closeButton>
                <Modal.Title>Add Update</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <textarea
                    name=""
                    id=""
                    cols="65"
                    rows="5"
                    name="Note"
                    value={update}
                    onChange={handleAddUpdate}
                ></textarea>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={handleClose} name="Close">
                </Button>
                <Button onClick={updateClaimData} name="Update">
                </Button>
            </Modal.Footer>
        </Modal>
    </div >
}
var mapStateToProps = (state) => ({
    claims: state.claims
});

var actions = {
    getAllClaims,
    showMessage
};

export default connect(mapStateToProps, actions)(CustomerClaims);