import { faArrowCircleLeft, faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import style from "./BackButton.module.css";

const BackButton = () => {
    return (
        <div className={style.backButtonMain}>
            <div className={style.backButton}>
                <FontAwesomeIcon icon={faArrowCircleLeft} />
            </div>
        </div>
    )
}

export default BackButton
