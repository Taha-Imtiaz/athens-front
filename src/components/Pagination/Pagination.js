import React from 'react'
import _ from 'lodash'
import { connect } from 'react-redux'
import "./Pagination.css"


const Pagination = (props) => {
    const { itemCount, pageSize, currentPage, onPageChange } = props
    const pageCount = Math.ceil(itemCount / pageSize)
    console.log(pageCount, typeof pageCount == 'NaN', typeof pageCount == NaN)
    if (pageCount < 2 || isNaN(pageCount)) {
      console.log(typeof pageCount == 'NaN')
      return null
    } 
    const pages = _.range(1, pageCount + 1)
    //generate array with thesse numbers
  
    return (
      <nav style={{float:"right"}}>
        <ul className='pagination' style = {{}}>
          {pages.map(page => (<li key={page}
           className={page === currentPage ? `page-item active` : 'page-item'}
           
          // style={{backgroundColor:page === currentPage ? '#00ADEE' : '#fff'}}
          >
            <a className='page-link' onClick={() => onPageChange(page)}>{page}</a></li>))}
  
  
        </ul>
      </nav>
  
  
    );
  }

export default Pagination
