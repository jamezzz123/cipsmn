import React from 'react';
import Backdrop from './backdrop';
import './index.css'
import { ThreeDots } from "react-loader-spinner"



const Modal = (props) => {
    return (
        <>
            <Backdrop show={props.show} closeModal={props.clicked} />

            <div
                className={"Modal"}
                style={{
                    transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
                    opacity: props.show ? '1' : '0',

                }}
            >

                <div className="modaldialog modaldialogcentered">
                    <div className="modalcontent">
                        <div className="modalheader">
                            <h4 className="camp-dark-blue mb-0">
                                {props.title}
                            </h4>
                        </div>

                        <div className="modalbody">
                            {props.children}
                        </div>
                        {props.footer === "N/A" ? <div></div> :
                            < div className="modalfooter">
                                {props.footer}
                            </div>
                        }
                    </div>
                </div>

            </div>
        </>
    )
}

export default Modal
