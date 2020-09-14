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

      <div className="col-5 col-md-4">
        <b><h3 className={style.head}>Customer List</h3></b>

      </div>

      <div className={`col-7 col-md-8 ${style.search}`}>
        <SearchBar />
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
                <div className={`col-8 text-left ${style.flex}`}>
                  <span>
                    <input type="checkbox" id="defaultCheck1" value="" />
                    <label className={`checkbox-inline ${style.input}`} for="defaultCheck1">Muhammad Shaheer Abbas</label>
                  </span>
                </div>
                <div className={`col-2 ${style.flex}`} >
                  <Button name={width < 576 ? "" : "Location"} icon="fa fa-map-marker" />
                </div>
                <div className={`col-2 justify-content-end ${style.fr}`}>
                  <p><Button name={width < 576 ? "" : "Edit"} icon="fa fa-edit" /></p>
                </div>

              </div>
            </li>
          </div>

          <div className={`${style.li}`}>
            <li class=" checkbox list-group-item">
              <div className="row justify-content-around">
                <div className={`col-8 text-left ${style.flex}`}>
                  <span>
                    <input type="checkbox" id="defaultCheck2" value="" />
                    <label className={`checkbox-inline ${style.input}`} for="defaultCheck2">Muhammad Shaheer Abbas</label>
                  </span>
                </div>
                <div className={`col-2 ${style.flex}`} >
                  <Button name={width < 576 ? "" : "Location"} icon="fa fa-map-marker" />
                </div>
                <div className={`col-2 justify-content-end ${style.fr}`}>
                  <p><Button name={width < 576 ? "" : "Edit"} icon="fa fa-edit" /></p>
                </div>

              </div>
            </li>
          </div>

          <div className={`${style.li}`}>
            <li class=" checkbox list-group-item">
              <div className="row justify-content-around">
                <div className={`col-8 text-left ${style.flex}`}>
                  <span>
                    <input type="checkbox" id="defaultCheck3" value="" />
                    <label className={`checkbox-inline ${style.input}`} for="defaultCheck3">Muhammad Shaheer Abbas</label>
                  </span>
                </div>
                <div className={`col-2 ${style.flex}`} >
                  <Button name={width < 576 ? "" : "Location"} icon="fa fa-map-marker" />
                </div>
                <div className={`col-2 justify-content-end ${style.fr}`}>
                  <p><Button name={width < 576 ? "" : "Edit"} icon="fa fa-edit" /></p>
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