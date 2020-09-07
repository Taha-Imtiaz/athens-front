import React from 'react'
import style from './SearchBar.module.css'

const SearchBar = () => {

    function handleChange(e) {
        console.log(e.target.value);
      }

    return <div>
        <div class="input-group">
            <input className="form-control py-2 rounded-pill mr-1 pr-5" type="search" value="search" onChange={handleChange} />
            <span className="input-group-append">
                <button className="btn rounded-pill border-0 ml-n5" type="button">
                    <i className="fa fa-search"></i>
                </button>
            </span>
        </div>
    </div>
   

}
export default SearchBar