import { faArrowCircleLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import style from "./BackButton.module.css";
import { useHistory } from "react-router-dom";


const BackButton = () => {
    let history = useHistory();
    return (
        <div className={style.backButtonMain}>
            <div className={style.backButton}>
                <FontAwesomeIcon icon={faArrowCircleLeft} onClick={()=> history.goBack()} />
            </div>
        </div>
    )
}

export default BackButton
