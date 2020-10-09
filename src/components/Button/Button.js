import React from 'react'
import style from './Button.module.css'

const Button = (props) => {
    console.log(props)
    return <div>
        <button onClick = {props.onClick ? props.onClick : null} className={`btn btn-primary mx-auto ${style.btnCustom}`}>{props.name}&nbsp;<i className={props.icon}></i></button>
    </div>
}

export default Button