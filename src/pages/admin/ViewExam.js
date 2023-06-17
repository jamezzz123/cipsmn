import React, { useState } from 'react'
import Loader from '../../components/loader'
import { useLocation } from 'react-router-dom'

const ViewExam = () => {
  const location = useLocation()
  const { description, image_id, name } = location.state

  const [isLoading, setIsLoading] = useState(false)

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
          <h2>View Exam</h2>
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
                      Exam Details
                    </h4>
                    <section className='simple-compose-box mb-3'>
                      <div className='timeline timeline-simple mt-3 mb-3'>
                        <div className='tm-body'>
                          <ol className='tm-items'>
                            <li>
                              <div className='tm-box'>
                                <p className='text-muted mb-0'>
                                  <strong>EXAM NAME</strong>
                                </p>
                                <p>
                                  <span className='text-primary'>{name}</span>
                                </p>
                              </div>
                            </li>
                            <li>
                              <div className='tm-box'>
                                <p className='text-muted mb-0'>
                                  <strong>DESCRIPTION</strong>
                                </p>
                                <p>{description}</p>
                              </div>
                            </li>
                            <li>
                              <div className='tm-box'>
                                <p className='text-muted mb-0'>AVATAR</p>
                                <div className='thumbnail-gallery'>
                                  <a
                                    className='img-thumbnail lightbox'
                                    href='img/projects/project-4.jpg'
                                    data-plugin-options='{ "type":"image" }'
                                  >
                                    <img
                                      className='img-fluid'
                                      width={215}
                                      src='img/projects/project-4.jpg'
                                    />
                                    <span className='zoom'>
                                      <i className='bx bx-search' />
                                    </span>
                                  </a>
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

export default ViewExam
