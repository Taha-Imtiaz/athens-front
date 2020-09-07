import React from 'react'
import Navbar from '../../Navbar/Navbar'
import style from './customerlist.module.css'
import SearchBar from '../../SearchBar/SearchBar'
import Button from '../../Button/Button'

const customerList = () => {
  return <div>
    <div className={`row ${style.toprow}`}>
      <div className="col-3">
        <h3 className={style.head}>Customer List</h3>
      </div>
      <div className="col-6">
        <SearchBar />
      </div>
      <div className="col-3">
        <Button name="Create New" />
      </div>
    </div>
    <div className={style.btndel}>
      <Button name="Delete" icon="fa fa-trash" />

    </div>
    <div className={style.jumbotron}>
      <div>
        <ul class="list-group">
          <div className={style.li}>
            <li class=" checkbox list-group-item">
              <div className="row justify-content-around">
                <div className={`col-6 text-left`}>
                <label class="checkbox-inline"><input type="checkbox" value="" /></label>
                  <label>Muhammad Shaheer </label>
                </div>
                <div className={`col-3`} >
                  <Button name="Delete" icon="fa fa-map-marker" />
                </div>
                <div className={`col-3 justify-content-end ${style.fr}`}>
                  <p><Button name="Edit" icon="fa fa-edit" /></p>
                </div>

              </div>
            </li>
          </div>
          <div className={style.li}>
            <li class=" checkbox list-group-item">
              <div className="row justify-content-around">
                <div className={`col-6 text-left`}>
                <label class="checkbox-inline"><input type="checkbox" value="" /></label>
                  <label>Muhammad Shaheer </label>
                </div>
                <div className={`col-3`} >
                  <Button name="Delete" icon="fa fa-map-marker" />
                </div>
                <div className={`col-3 justify-content-end ${style.fr}`}>
                  <p><Button name="Edit" icon="fa fa-edit" /></p>
                </div>

              </div>
            </li>
          </div>
          <div className={style.li}>
            <li class=" checkbox list-group-item">
              <div className="row justify-content-around">
                <div className={`col-6 text-left`}>
                <label class="checkbox-inline"><input type="checkbox" value="" /></label>
                  <label>Muhammad Shaheer Abbas</label>
                </div>
                <div className={`col-3`} >
                  <Button name="Delete" icon="fa fa-map-marker" />
                </div>
                <div className={`col-3 justify-content-end ${style.fr}`}>
                  <p><Button name="Edit" icon="fa fa-edit" /></p>
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