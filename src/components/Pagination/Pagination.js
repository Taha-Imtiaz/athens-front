import React from 'react'
import _ from 'lodash'
import { connect } from 'react-redux'
const Pagination = (props) => {
    const { itemCount, pageSize, currentPage, onPageChange } = props
    console.log(currentPage)
//   console.log(pageCount)

    const pageCount = Math.ceil(itemCount / pageSize)
      console.log(pageCount)
    if (pageCount === 1) return null
    const pages = _.range(1, pageCount + 1)
    //generate array with thesse numbers
  
  
  
    return (
      <nav>
        <ul className='pagination' style = {{margin:"0.5rem 1.5rem"}}>
          {pages.map(page => (<li key={page} className={page === currentPage ? 'page-item active' : 'page-item'}>
            <a className='page-link' onClick={() => onPageChange(page)}>{page}</a></li>))}
  
  
        </ul>
      </nav>
  
  
    );
  }

export default Pagination
