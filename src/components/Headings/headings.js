import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import './heading.css'

const HeadingComponent = (props)=>{
    useEffect(() => {
        props.history.push("/schedule/daily")
    })
    return <span></span>
}

export default HeadingComponent