import React from 'react'
import Modal from '../../components/ModalComp'

export default function Terms({ isModal, setIsModal }) {
    return (
        <Modal show={isModal} clicked={() => setIsModal(!isModal)} title='Terms of use.' action=''
            footer={
                <div className='row'>
                    <p className='col-sm-10'>Please read these terms and conditions thoroughly and to your complete understanding.</p>
                    <div className='col-sm-2 text-right'>
                        <button
                            onClick={() => setIsModal(false)}
                            className='btn btn-primary mt-2'
                        >
                            Close
                        </button>
                    </div>
                </div>
            }>
            <div className="form-body col-md-12">
                <div className='col-md-12 d-flex justify-content-center align-items-center'>
                    <div>
                        <h3>Terms and conditions.</h3>
                        <p>.</p>
                    </div>
                </div>
            </div>
        </Modal>
    )
}
