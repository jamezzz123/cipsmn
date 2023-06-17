import React from 'react';
import { Oval } from "react-loader-spinner"

const Loader = ({type, width=150, height=150}) => {
    return (
        <div style={{ width: width || "100%", height: height || "150px", }} className="d-flex justify-content-center">
            <Oval  widths={width} height={height} ariaLabel="loading-indicator" color="#1bc5bd" secondaryColor="#adb5bd" />
        </div>
    )
}

export default Loader
