import React from 'react'
import style from './SideBar.module.css'

const SideBar = (props) => {
  return <div class={style.sidebar}>
    <a class="active" href="#claim">{props.name1}</a>
    <a href="#blanket_deposit">{props.name2}</a>
    <a href="#blanket_deposit">{props.name3}</a>

  </div>
}

export default SideBar