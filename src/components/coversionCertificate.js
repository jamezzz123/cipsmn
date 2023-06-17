import React, {useState, useContext} from 'react'
import Modal from './ModalComp'
import AuthContext from '../store/auth-context'
import { toast } from 'react-toastify'
import Loader from './loader'
import axios from '../default_axios'

export default function Certificate({ isModal, setIsModal }) {

    const [image, setImage] = useState(null)

    const [isLoading, setIsLoading] = useState(false)
    const [isError, setIsError] = useState(false)
    const authCtx = useContext(AuthContext)

    //submit form handler
    const uploadCert = async (e) => {
        e.preventDefault()
        // build up the certificate data

        const formData = new FormData()
        formData.append('file', image)
        setIsLoading(true)
        axios
            .post('user/certificate/create', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${authCtx.token}`,
                },
            })
            .then((result) => {
                if (result.status === 201 || result.status === 200) {
                    setIsLoading(false)
                    authCtx.setCert(true)
                    setIsModal(false)
                    toast.success(result.data.message, {
                        position: 'top-center',
                        theme: 'dark',
                        autoClose: 4000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    })
                } else {
                    setIsLoading(false)
                    toast.error('Something went wrong', {
                        position: 'top-center',
                        theme: 'dark',
                        autoClose: 4000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    })
                }
            })
            .catch((err) => {
                let errMssg = err.message || 'Something went wrong, please try again'

                let errors = !err.response
                    ? { Error: errMssg }
                    : !err.response.data
                        ? { Error: errMssg }
                        : err.response.data

                let errorDisplay = Object.keys(errors)
                    .map((each, key) => `${key + 1}. ${each}: ${errors[each]}`)
                    .join('\n')

                setIsLoading(false)
                toast.error(errorDisplay, {
                    position: 'top-center',
                    theme: 'dark',
                    autoClose: 4000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                })
                setIsError(errorDisplay)
            })
    }


    return (
        <Modal show={isModal} clicked={() => setIsModal(!isModal)} title='Upload Certificate' action=''
            footer={"N/A"}>
                <form
                    className='form-horizontal form-bordered'
                    onSubmit={uploadCert}
                >
                    <div className='form-group row pb-4'>
                        <label className='col-lg-3 control-label text-lg-end pt-2'>
                            Upload new Certificate
                        </label>
                        <div className='col-lg-6'>
                            <p>Please logout and log back in after uploading a certificate.</p>
                            <div
                                className='fileupload fileupload-new'
                                data-provides='fileupload'
                            >
                                <div className='input-append'>
                                    <span className='btn btn-default btn-file'>
                                        <input
                                            type='file'
                                            onChange={(e) => setImage(e.target.files[0])}
                                        />
                                    </span>
                                </div>
                            </div>

                            <div className='row mt-2'>
                                <div className='col-6'>
                                    <button
                                        type='button'
                                        className='btn btn-default'
                                        onClick={(e) => {e.preventDefault();setImage(null)}}
                                    >
                                        Remove
                                    </button>
                                </div>

                                <div className='col-6'>
                                    <button
                                        type='submit'
                                        className='btn btn-primary'
                                    >
                                        {isLoading ?
                                            <Loader width={20} height={20} />
                                            :
                                            "Save"
                                        }
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
        </Modal>
    )
}
