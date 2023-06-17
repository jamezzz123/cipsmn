import React, { useState, useEffect, useContext, useCallback } from 'react'
import AuthContext from '../../store/auth-context'
import { toast } from 'react-toastify'
import Loader from '../../components/loader'
import axios from '../../default_axios'
import project from '../../assets/img/projects/project-1.jpg'
import ModalImage from 'react-modal-image'

const Certs = () => {
  const [image, setImage] = useState(null)
  const [certificates, setCertificates] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)
  const authCtx = useContext(AuthContext)

  const getAllCerts = useCallback(() => {
    setIsLoading(true)
    axios
      .get('user/certificate/get-certificates', {
        headers: { Authorization: `Bearer ${authCtx.token}` },
      })
      .then((response) => {
        setIsLoading(false)
        if (response.status === 200 || response.status === 201) {
          setCertificates(response.data)
          console.log(response.data)
        } else {
        }
      })
      .catch((err) => {
        setIsLoading(false)
        console.log(err)
      })
  }, [authCtx.token])


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
          getAllCerts()
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


  useEffect(() => {
    try {
      getAllCerts()
    } catch (error) {
      console.log(error)
    }
  }, [getAllCerts])


  if (isLoading) {
    return (
      <section className='body'>
        <section role='main' className='content-body'>
          <header className='page-header'>
            <h2>Certificates</h2>
          </header>
          <div className='d-flex align-items-center justify-content-center'>
            <Loader />
          </div>
        </section>
      </section>
    )
  }

  return (
    <div className='body'>
      <section role='main' className='content-body card-margin'>
        <header className='page-header'>
          <h2>Certificates</h2>
        </header>

        {/* <!-- start: page --> */}
        <div className='row'>
          <div className='col'>
            <section className='card'>
              <header className='card-header'>
                <h2 className='card-title'>Certificates</h2>
              </header>
              <div className='card-body'>
                <section className='card'>
                  <header className='card-header'>
                    <h2 className='card-title'>Certificates Uploaded</h2>
                    <p className='card-subtitle'>
                      Three simple popups with different scaling settings.
                    </p>
                  </header>
                  <div className=' card-body'>
                    <div className='container horizontal-scrollable'>
                      <table>
                        <tr>
                          {certificates.map((certificate, index) => (
                            <td key={index}>
                              <span
                                title={certificate.name}
                              >
                                <ModalImage
                                  className='cert-img'
                                  small={certificate.url}
                                  large={certificate.url}
                                  alt={certificate.name}
                                />
                                {/* <img
                              className='img-fluid'
                              alt='Certificate'
                              src={certificate.image}
                              width='145'
                            /> */}
                              </span>
                            </td>
                          ))}
                        </tr>
                      </table>
                    </div>
                  </div>
                </section>

                <form
                  className='form-horizontal form-bordered mt-5'
                  onSubmit={uploadCert}
                >
                  <div className='form-group row pb-4'>
                    <label className='col-lg-3 control-label text-lg-end pt-2'>
                      Upload new Certificate
                    </label>
                    <div className='col-lg-6'>
                      <div
                        className='fileupload fileupload-new'
                        data-provides='fileupload'
                      >
                        <div className='input-append'>
                          <div className='uneditable-input'>
                            <span className='fileupload-preview'></span>
                          </div>
                          <span className='btn btn-default btn-file'>
                            <span className='fileupload-new'>Select file</span>
                            <input
                              type='file'
                              onChange={(e) => setImage(e.target.files[0])}
                            />
                          </span>
                        </div>
                      </div>

                      <div className='row mt-2'>
                        <div className='col-6 col-lg-3'>
                          <a
                            href='/#'
                            onClick={(e) => e.preventDefault()}
                            className='btn btn-default'
                            data-dismiss='fileupload'
                          >
                            Remove
                          </a>
                        </div>

                        <div className='col-6 col-lg-3'>
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
              </div>
            </section>
          </div>
        </div>
        {/* <!-- end: page --> */}
      </section>
    </div>
  )
}

export default Certs
