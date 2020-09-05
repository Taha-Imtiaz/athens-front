import React from 'react'
import style from './UsersList.module.css'

const UsersList = () => {
    return <div>
        <h1 className={style.head}>User List</h1>
        <div className={style.btndel}>
            <button className={`btn btn-primary ${style.btnCustom}`}><i className="fa fa-trash"> Delete</i></button>
        </div>
        <div className={style.jumbotron}>
            <div>
                <ul class="list-group">
                    <li class=" checkbox list-group-item d-flex justify-content-between align-items-center">
                        <b><label class="checkbox-inline"><input type="checkbox" value="" /></label><label> Office Manager Name</label></b>
                        <label>Attribute #1, Attribute #2</label>

                        <button className={`btn btn-primary ${style.btnCustom}`}><i className="fa fa-map-marker">  Location</i></button>
                        <button className={`btn btn-primary ${style.btnCustom}`}><i className="fa fa-edit">  Edit</i></button>
                    </li>
                    <li class=" checkbox list-group-item d-flex justify-content-between align-items-center">
                        <b><label class="checkbox-inline"><input type="checkbox" value="" /></label><label> Office Manager Name</label></b>
                        <label>Attribute #1, Attribute #2</label>

                        <button className={`btn btn-primary ${style.btnCustom}`}><i className="fa fa-map-marker">  Location</i></button>
                        <button className={`btn btn-primary ${style.btnCustom}`}><i className="fa fa-edit">  Edit</i></button>
                    </li>
                    <li class=" checkbox list-group-item d-flex justify-content-between align-items-center">
                        <b><label class="checkbox-inline"><input type="checkbox" value="" /></label><label> Movers Name</label></b>
                        <label>Attribute #1, Attribute #2</label>

                        <button className={`btn btn-primary ${style.btnCustom}`}><i className="fa fa-map-marker">  Location</i></button>
                        <button className={`btn btn-primary ${style.btnCustom}`}><i className="fa fa-edit">  Edit</i></button>
                    </li>
                    <li class=" checkbox list-group-item d-flex justify-content-between align-items-center">
                        <b><label class="checkbox-inline"><input type="checkbox" value="" /></label><label> Movers Name</label></b>
                        <label>Attribute #1, Attribute #2</label>

                        <button className={`btn btn-primary ${style.btnCustom}`}><i className="fa fa-map-marker">  Location</i></button>
                        <button className={`btn btn-primary ${style.btnCustom}`}><i className="fa fa-edit">  Edit</i></button>
                    </li>

                </ul>
            </div>
        </div>
    </div>
}

export default UsersList