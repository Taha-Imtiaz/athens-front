import React from 'react'
import style from './SideBar.module.css'

const SideBar = ()=>{
    return <div class={style.sidebar}>
    <a class="active" href="#claim">Claim</a>
    <a href="#blanket_deposit">Blanket Deposit</a>
  </div>
}

export default SideBar