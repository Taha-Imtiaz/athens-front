import React from 'react'
import style from './Button.module.css'

const Button = (props) =>{
    return <div>
        <button className={`btn btn-primary ${style.btnCustom}`}>{props.name}<i className={props.icon}></i></button>
    </div>
}

export default Button