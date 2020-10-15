import React, { useEffect } from 'react'
import style from './CustomerClaims.module.css'
import SideBar from '../../Sidebar/SideBar'
import Button from '../../Button/Button'
import { Link } from 'react-router-dom'
import { connect } from "react-redux";
import { getAllClaims } from "../../../Redux/Claims/claimsActions";

const CustomerClaims = (props) => {
    useEffect(() => {
        var { getAllClaims } = props;
        getAllClaims();

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

    return <div>
        <div className="row">
            <div className="col-2">
                <SideBar routes={routes} />
            </div>
            <div className="col-4">
                <h3 className={style.head}>Claims</h3>
            </div>
            <div className="col-6">
                <div className={style.btn}>
                    <Link style={{ textDecoration: "none" }} to='/claim/newclaim'> <Button name="New Claim" /> </Link>
                </div>
            </div>
        </div>
        {
            data && data.map(x => {
                return (<div className={style.jumbotron} key={x._id}>
                    <div className="row">
                        <div className="col-8">
                            <h6 className={style.comp}>{x.customer.name}</h6>
                        </div>
                        <div className="col-4">
                            <h6 className={style.job}>Job ID: {x.job._id}</h6>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-10">
                            <p className={style.comp}>from {x.from} - to {x.to}</p>
                        </div>
                    </div>
                    {
                        x.items.map((y, j) => {
                            return (
                                <div key={j}>
                                    <hr></hr>
                                    <h6 className={style.sub}>{y.name}</h6>
                                    <div className="row">
                                        <div className="col-10">
                                            <p className={style.para}>{y.description}</p>
                                        </div>
                                        <div className="col-2">
                                            <p className={style.p2}>${y.price}</p>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                    {
                        x.items.length > 0 ? <div className="row d-flex flex-row-reverse">
                            <p> Total: {x.items.reduce(function (a, b) {
                                return a + b['price'];
                            }, 0)
                            }</p>
                        </div> : null
                    }
                </div>
                )
            })
        }
        {

        }

    </div>
}
var mapStateToProps = (state) => ({
    claims: state.claims
});

var actions = {
    getAllClaims
};
export default connect(mapStateToProps, actions)(CustomerClaims);