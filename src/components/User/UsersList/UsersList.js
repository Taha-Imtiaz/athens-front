import React from 'react'
import style from './UsersList.module.css'
import Button from '../../Button/Button'
import { Link } from 'react-router-dom'


const UsersList = () => {
    const width = window.innerWidth
    return <div>
        <div className="row">
            <div className="col-6">
                <h3 className={style.head}>Users List</h3>
            </div>
            <div className="col-6">
                <div className={style.btndel}>
                    <Link style={{ textDecoration: "none" }} to='/user/create'> <Button name="Create New" /> </Link>
                </div>
            </div>
        </div>
        <div className={style.jumbotron}>

            <ul class="list-group">
                <div className={style.li}>
                    <li class=" checkbox list-group-item">
                        <div className="row justify-content-around">
                            <div className="col-3 col-md-4 text-left">
                                <b><span>
                                    <input type="checkbox" id="defaultCheck1" value="" />
                                    <label className={`checkbox-inline ${style.input}`} for="defaultCheck1">Name</label>
                                </span></b>
                            </div>
                            <div className="col-5 col-md-4">
                                <label>Attribute #1, Attribute #2</label>
                            </div>
                            <div className="col-2 col-md-1">
                                <Button name={width < 576 ? "" : "Location"} icon="fa fa-map-marker" />
                            </div>
                            <div className={`col-2 col-md-1 justify-content-end ${style.fr}`}>
                                <Button name={width < 576 ? "" : "Edit"} icon="fa fa-edit" />

                            </div>
                        </div>
                    </li>
                </div>

                <div className={style.li}>
                    <li class=" checkbox list-group-item">
                        <div className="row justify-content-around">
                            <div className="col-3 col-md-4 text-left">
                                <b><span>
                                    <input type="checkbox" id="defaultCheck1" value="" />
                                    <label className={`checkbox-inline ${style.input}`} for="defaultCheck1">Name</label>
                                </span></b>
                            </div>
                            <div className="col-5 col-md-4">
                                <label>Attribute #1, Attribute #2</label>
                            </div>
                            <div className="col-2 col-md-1">
                                <Button name={width < 576 ? "" : "Location"} icon="fa fa-map-marker" />
                            </div>
                            <div className={`col-2 col-md-1 justify-content-end ${style.fr}`}>
                                <Button name={width < 576 ? "" : "Edit"} icon="fa fa-edit" />

                            </div>
                        </div>
                    </li>
                </div>

                <div className={style.li}>
                    <li class=" checkbox list-group-item">
                        <div className="row justify-content-around">
                            <div className="col-3 col-md-4 text-left">
                                <b><span>
                                    <input type="checkbox" id="defaultCheck1" value="" />
                                    <label className={`checkbox-inline ${style.input}`} for="defaultCheck1">Name</label>
                                </span></b>
                            </div>
                            <div className="col-5 col-md-4">
                                <label>Attribute #1, Attribute #2</label>
                            </div>
                            <div className="col-2 col-md-1">
                                <Button name={width < 576 ? "" : "Location"} icon="fa fa-map-marker" />
                            </div>
                            <div className={`col-2 col-md-1 justify-content-end ${style.fr}`}>
                                <Button name={width < 576 ? "" : "Edit"} icon="fa fa-edit" />

                            </div>
                        </div>
                    </li>
                </div>

                <div className={style.li}>
                    <li class=" checkbox list-group-item">
                        <div className="row justify-content-around">
                            <div className="col-3 col-md-4 text-left">
                                <b><span>
                                    <input type="checkbox" id="defaultCheck1" value="" />
                                    <label className={`checkbox-inline ${style.input}`} for="defaultCheck1">Name</label>
                                </span></b>
                            </div>
                            <div className="col-5 col-md-4">
                                <label>Attribute #1, Attribute #2</label>
                            </div>
                            <div className="col-2 col-md-1">
                                <Button name={width < 576 ? "" : "Location"} icon="fa fa-map-marker" />
                            </div>
                            <div className={`col-2 col-md-1 justify-content-end ${style.fr}`}>
                                <Button name={width < 576 ? "" : "Edit"} icon="fa fa-edit" />

                            </div>
                        </div>
                    </li>
                </div>

            </ul>

        </div>
    </div>
}

export default UsersList