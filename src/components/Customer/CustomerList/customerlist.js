import React from 'react'
import Navbar from '../../Navbar/Navbar'
import style from './customerlist.module.css'
import SearchBar from '../../SearchBar/SearchBar'
import Button from '../../Button/Button'
import { Link } from 'react-router-dom'

const customerList = () => {
  const width = window.innerWidth
  console.log(width)
  return <div>
    <div className={`row justify-content-center ${style.toprow}`}>

      <div className="col-5 col-md-3">
        <b><h3 className={style.head}>Customer List</h3></b>

      </div>

      <div className={`col-5 col-md-6 ${style.search}`}>
        <SearchBar />
      </div>
      <div className={`col-2 col-md-2 d-flex ${style.filter}`}>
        <i className = "fa fa-filter"></i>
      </div>


    </div>

    <div className={`d-flex justify-content-end ${style.buttons}`}>

      <div className={` ${style.create}`}>
        <Link style={{ textDecoration: "none" }} to='/customer/add'> <Button name="Create New" /></Link>
      </div>
      <Button name="Delete" />
    </div>


    <div className={style.jumbotron}>
      <div>
        <ul class="list-group">
          <div className={`${style.li}`}>
            <li class=" checkbox list-group-item">
              <div className="row justify-content-around">
                <div className={`col-8 col-md-4 text-left ${style.flex}`}>
                  <span>
                    <input type="checkbox" id="defaultCheck1" value="" />
                    <label className={`checkbox-inline ${style.input}`} for="defaultCheck1">Muhammad Shaheer Abbas</label>
                  </span>
                </div>
                <div className={`col-4 col-md-4 d-flex justify-content-start ${style.flex} ${style.fr}`} >
                  <p><i className="fa fa-map-marker"></i>&nbsp; Location, Address</p>
                </div>
                <div className={`col-12 col-md-4 d-flex justify-content-end ${style.fr}`}>
                  <Button name={width < 576 ? "" : "Edit"} icon="fa fa-edit" />
                  <div className={style.button}>
                    <Link style={{ textDecoration: "none" }} to='/customer/detail'>
                      <Button name={width < 576 ? "" : "Details"} icon="fa fa-info-circle" />
                    </Link>
                  </div>

                </div>
              </div>
            </li>
          </div>

         
          <div className={`${style.li}`}>
            <li class=" checkbox list-group-item">
              <div className="row justify-content-around">
                <div className={`col-8 col-md-4 text-left ${style.flex}`}>
                  <span>
                    <input type="checkbox" id="defaultCheck1" value="" />
                    <label className={`checkbox-inline ${style.input}`} for="defaultCheck1">Muhammad Shaheer Abbas</label>
                  </span>
                </div>
                <div className={`col-4 col-md-4 d-flex justify-content-start ${style.flex} ${style.fr}`} >
                  <p><i className="fa fa-map-marker"></i>&nbsp; Location, Address</p>
                </div>
                <div className={`col-12 col-md-4 d-flex justify-content-end ${style.fr}`}>
                  <Button name={width < 576 ? "" : "Edit"} icon="fa fa-edit" />
                  <div className={style.button}>
                    <Link style={{ textDecoration: "none" }} to='/customer/detail'>
                      <Button name={width < 576 ? "" : "Details"} icon="fa fa-info-circle" />
                    </Link>
                  </div>

                </div>
              </div>
            </li>
          </div>



          <div className={`${style.li}`}>
            <li class=" checkbox list-group-item">
              <div className="row justify-content-around">
                <div className={`col-8 col-md-4 text-left ${style.flex}`}>
                  <span>
                    <input type="checkbox" id="defaultCheck1" value="" />
                    <label className={`checkbox-inline ${style.input}`} for="defaultCheck1">Muhammad Shaheer Abbas</label>
                  </span>
                </div>
                <div className={`col-4 col-md-4 d-flex justify-content-start ${style.flex} ${style.fr}`} >
                  <p><i className="fa fa-map-marker"></i>&nbsp; Location, Address</p>
                </div>
                <div className={`col-12 col-md-4 d-flex justify-content-end ${style.fr}`}>
                  <Button name={width < 576 ? "" : "Edit"} icon="fa fa-edit" />
                  <div className={style.button}>
                    <Link style={{ textDecoration: "none" }} to='/customer/detail'>
                      <Button name={width < 576 ? "" : "Details"} icon="fa fa-info-circle" />
                    </Link>
                  </div>

                </div>
              </div>
            </li>
          </div>

        </ul>
      </div>
    </div>
  </div>
}
export default customerList