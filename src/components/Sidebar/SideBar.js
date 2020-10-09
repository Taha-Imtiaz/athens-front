import React from 'react'
import style from './SideBar.module.css'
import { Link } from 'react-router-dom'

const SideBar = (props) => {
  console.log(props)
  const width = window.innerWidth
  return <div class={style.sidebar}>

    {
      props.routes.map(x => {
        return <Link to={x.path}>
          <div className="row">
            <div className="col-2">
              {x.icon}
            </div>
            <div className="col-10">
              {width < 576 ? "" : x.title}
            </div>
          </div>
        </Link>

      })
    }

  </div>
}

export default SideBar