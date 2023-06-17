import React, { useState, useContext, useCallback, useEffect } from 'react'
import axios from '../../default_axios'
import Loader from '../../components/loader'
import { useLocation } from 'react-router-dom'
import AuthContext from '../../store/auth-context'
import ModalImage from 'react-modal-image'
import { toast } from 'react-toastify'

const ViewBadge = () => {
  const location = useLocation()
  const { description, image_id, badge_id, name } = location.state

  const [state, setState] = useState({
    id: badge_id,
    name: name,
    description: description,
    created_at: '',
    exam_id: image_id,
    image_url: '',
  })
  const authCtx = useContext(AuthContext)

  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)

  const fetchBadge = useCallback(() => {
    setIsLoading(true)
    axios
      .get(`badge/view/${badge_id}`, {
        headers: {
          Authorization: `Bearer ${authCtx.token}`,
        },
      })
      .then((response) => {
        setIsLoading(false)
        if (response.status === 201 || response.status === 200) {
          const { id, name, description, created_at, exam_id, image_url } =
            response.data ? response.data.Badge || state : state
          setState({
            id: id,
            name: name,
            description: description,
            created_at: created_at,
            exam_id: exam_id,
            image_url: image_url,
          })
        } else {
          throw new Error('Something went wrong')
        }
      })
      .catch((err) => {
        toast.error('Something went wrong, please try again later \n' + err, {
          position: 'top-center',
          theme: 'dark',
          autoClose: 4000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        })
        setIsLoading(false)
        setIsError(true)
      })
  }, [authCtx.token])

  useEffect(() => {
    try {
      fetchBadge()
    } catch (error) {}
  }, [fetchBadge])

  if (isLoading) {
    return (
      <section className='body'>
        <section role='main' className='content-body'>
          <header className='page-header'>
            <h2>User Profile</h2>
          </header>
          <div className='d-flex align-items-center justify-content-center'>
            <Loader />
          </div>
        </section>
      </section>
    )
  }
  return (
    <section class='body'>
      <section role='main' className='content-body'>
        <header className='page-header'>
          <h2>View Badge</h2>
        </header>
        {/* start: page */}
        <div className='row'>
          <div className='col-lg-12 col-xl-8'>
            <div className='tabs'>
              <ul className='nav nav-tabs tabs-primary'>
                <li className='nav-item active'>
                  <button
                    className='nav-link'
                    data-bs-target='#overview'
                    data-bs-toggle='tab'
                  >
                    Overview
                  </button>
                </li>
              </ul>
              <div className='tab-content'>
                <div id='overview' className='tab-pane active'>
                  <div className='p-3'>
                    <h4 className='mb-3 font-weight-semibold text-dark'>
                      Badge Details
                    </h4>
                    <section className='simple-compose-box mb-3'>
                      <div className='timeline timeline-simple mt-3 mb-3'>
                        <div className='tm-body'>
                          <ol className='tm-items'>
                            <li>
                              <div className='tm-box'>
                                <p className='text-muted mb-0'>
                                  <strong>Badge NAME</strong>
                                </p>
                                <p>
                                  <span className='text-primary'>
                                    {state.name}
                                  </span>
                                </p>
                              </div>
                            </li>
                            <li>
                              <div className='tm-box'>
                                <p className='text-muted mb-0'>
                                  <strong>DESCRIPTION</strong>
                                </p>
                                <p>{state.description}</p>
                              </div>
                            </li>
                            <li>
                              <div className='tm-box'>
                                <p className='text-muted mb-0'>AVATAR</p>
                                <div className='thumbnail-gallery'>
                                  <div
                                    className='img-thumbnail lightbox'
                                    href='img/projects/project-4.jpg'
                                    data-plugin-options='{ "type":"image" }'
                                  >
                                    <ModalImage
                                      className='img-fluid'
                                      small={state.image_url}
                                      large={state.image_url}
                                      alt={state.description}
                                    />
                                    {/* <img
                                      className='img-fluid'
                                      width={215}
                                      src={state.image_url}
                                    /> */}
                                    <span className='zoom'>
                                      <i className='bx bx-search' />
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </li>
                          </ol>
                        </div>
                      </div>
                    </section>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </section>
  )
}

export default ViewBadge
