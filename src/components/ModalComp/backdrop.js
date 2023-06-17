import React from 'react'
import './index.css'

const Backdrop = (props) => {
    return (
        props.show ?
        <div className="backdrop" onClick={props.closeModal}></div>
        : null
    )
}

export default Backdrop
