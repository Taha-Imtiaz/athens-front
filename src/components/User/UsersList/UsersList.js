import React from 'react'
import style from './UsersList.module.css'
import Button from '../../Button/Button'


const UsersList = () => {
    return <div>
        <div className="row">
            <div className="col-6">
                <h3 className={style.head}>Users List</h3>
            </div>
            <div className="col-6">
                <div className={style.btndel}>
                    <Button name="Delete" icon="fa fa-trash" />
                </div>
            </div>
        </div>
        <div className={style.jumbotron}>
            <div>
                <ul class="list-group">
                    <div className={style.li}>
                        <li class=" checkbox list-group-item">
                            <div className="row justify-content-around">
                                <div className="col-4 text-left">
                                    <b><span>
                                        <input type="checkbox" id="defaultCheck1" value="" />
                                        <label className={`checkbox-inline ${style.input}`} for="defaultCheck1">Office Manager Name</label>
                                    </span></b>
                                </div>
                                <div className="col-4">
                                    <label>Attribute #1, Attribute #2</label>
                                </div>
                                <div className="col-2">
                                    <Button name="Location" icon="fa fa-map-marker" />
                                </div>
                                <div className={`col-2 justify-content-end ${style.fr}`}>
                                    <Button name="Edit" icon="fa fa-edit" />
                                </div>
                            </div>
                        </li>
                    </div>
                    <div className={style.li}>
                        <li class=" checkbox list-group-item">
                            <div className="row justify-content-around">
                                <div className="col-4 text-left">
                                    <b><span>
                                        <input type="checkbox" id="defaultCheck1" value="" />
                                        <label className={`checkbox-inline ${style.input}`} for="defaultCheck1">Office Manager Name</label>
                                    </span></b>
                                </div>
                                <div className="col-4">
                                    <label>Attribute #1, Attribute #2</label>
                                </div>
                                <div className="col-2">
                                    <Button name="Location" icon="fa fa-map-marker" />
                                </div>
                                <div className={`col-2 justify-content-end ${style.fr}`}>
                                    <Button name="Edit" icon="fa fa-edit" />
                                </div>
                            </div>
                        </li>
                    </div>
                    <div className={style.li}>
                        <li class=" checkbox list-group-item">
                            <div className="row justify-content-around">
                                <div className="col-4 text-left">
                                    <b><span>
                                        <input type="checkbox" id="defaultCheck1" value="" />
                                        <label className={`checkbox-inline ${style.input}`} for="defaultCheck1">Office Manager Name</label>
                                    </span></b>
                                </div>
                                <div className="col-4">
                                    <label>Attribute #1, Attribute #2</label>
                                </div>
                                <div className="col-2">
                                    <Button name="Location" icon="fa fa-map-marker" />
                                </div>
                                <div className={`col-2 justify-content-end ${style.fr}`}>
                                    <Button name="Edit" icon="fa fa-edit" />
                                </div>
                            </div>
                        </li>
                    </div>
                    <div className={style.li}>
                        <li class=" checkbox list-group-item">
                            <div className="row justify-content-around">
                                <div className="col-4 text-left">
                                    <b><span>
                                        <input type="checkbox" id="defaultCheck1" value="" />
                                        <label className={`checkbox-inline ${style.input}`} for="defaultCheck1">Office Manager Name</label>
                                    </span></b>
                                </div>
                                <div className="col-4">
                                    <label>Attribute #1, Attribute #2</label>
                                </div>
                                <div className="col-2">
                                    <Button name="Location" icon="fa fa-map-marker" />
                                </div>
                                <div className={`col-2 justify-content-end ${style.fr}`}>
                                    <Button name="Edit" icon="fa fa-edit" />
                                </div>
                            </div>
                        </li>
                    </div>

                </ul>
            </div>
        </div>
    </div>
}

export default UsersList