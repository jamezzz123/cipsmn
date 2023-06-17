import React, { useState, useEffect, useCallback, useContext } from 'react'
import AuthContext from '../../store/auth-context'
import Loader from '../../components/loader'
import { useParams } from 'react-router-dom'
import axios from '../../default_axios'
import ModalImage from 'react-modal-image'
import { toast } from 'react-toastify'

const ViewUser = () => {
  const authCtx = useContext(AuthContext)
  const [isLoading, setIsLoading] = useState(false)
  const [exams, setExams] = useState([])
  const [exams2, setExams2] = useState([])
  const [exams3, setExams3] = useState([])
  const [exempted, setExempted] = useState([])
  const [alreadyExempted, setAlreadyExempted] = useState([])

  const [user, setUser] = useState({})
  const [certificates, setCertificates] = useState([])

  const params = useParams()
  const id = +params.id
  const [Checked, setCheckedBox] = useState([])
  const [CheckedNew, setCheckedBoxNew] = useState([])

  const handleOnChange = (isChecked, value) => {
    const temp = [...Checked]

    if (isChecked) {
      temp.push(value)
      setCheckedBox(temp)

      return
    }

    setCheckedBox(temp.filter((item) => item !== value))
  }

  const handleOnChangeAlready = (isChecked, value) => {
    const temp = [...CheckedNew]

    if (isChecked) {
      temp.push(value)
      setCheckedBoxNew(temp)

      return
    }

    setCheckedBoxNew(temp.filter((item) => item !== value))
  }

  const getUser = useCallback(() => {
    setIsLoading(true)
    axios
      .get(`admin/user/view/${id}`, {
        headers: {
          Authorization: `Bearer ${authCtx.token}`,
        },
      })
      .then((response) => {
        setIsLoading(false)
        if (response.status === 201 || response.status === 200) {
          setUser(response.data)
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
      })
  }, [id, authCtx.token])

  const getAllCerts = useCallback(() => {
    setIsLoading(true)
    axios
      .get(`user/certificate/get-certificates-admin/${id}`, {
        headers: { Authorization: `Bearer ${authCtx.token}` },
      })
      .then((response) => {
        setIsLoading(false)
        if (response.status === 200 || response.status === 201) {
          setCertificates(response.data)
        }
      })
      .catch((err) => {
        setIsLoading(false)
        console.log(err)
      })
  }, [authCtx.token])

  const fetchExams = useCallback(() => {
    setIsLoading(true)
    axios
      .get(`exam/get-all`, {
        headers: {
          Authorization: `Bearer ${authCtx.token}`,
        },
      })
      .then((response) => {
        setIsLoading(false)
        if (response.status === 201 || response.status === 200) {
          setExams(response.data.data)
        } else {
          throw new Error('Something went wrong')
        }
      })
      .catch((err) => {
        toast.error('Something went wrong, please try again later' + err, {
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
      })
  }, [authCtx.token])

  const fetchExemted = useCallback(() => {
    setIsLoading(true)
    axios
      .get(`/admin/exempt-exam/get/${id}`, {
        headers: {
          Authorization: `Bearer ${authCtx.token}`,
        },
      })
      .then((response) => {
        setIsLoading(false)
        if (response.status === 201 || response.status === 200) {
          setExempted(response.data.ExamExempt)
        }
      })
      .catch((err) => {
        toast.error('Something went wrong, please try again later' + err, {
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
      })
  }, [authCtx.token])


  const fetchAlreadyExemted = useCallback(() => {
    setIsLoading(true)
    axios
      .get(`/admin/exempt-exam-payment/get/${id}`, {
        headers: {
          Authorization: `Bearer ${authCtx.token}`,
        },
      })
      .then((response) => {
        setIsLoading(false)
        if (response.status === 201 || response.status === 200) {
          setAlreadyExempted(response.data.ExamExempt)
        }
      })
      .catch((err) => {
        toast.error('Something went wrong, please try again later' + err, {
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
      })
  }, [authCtx.token])


  const displayExams = () => {
    if (exams.length != 0) {
      let exp = []
      exempted.map((exempted) => {
        exp.push(exempted.exam.id)
      })

      var common = exams.filter((exam) => !exp.includes(exam.id))
      setExams2(common)
    }
  }

  const displayAlreadyExams = () => {
    if (exams.length != 0) {
      let exp = []
      alreadyExempted.map((exempted) => {
        exp.push(exempted?.exam_id)
      })

      var common = exempted.filter((exam) => !exp.includes(exam?.exam_id))
      setExams3(common)
    }
  }

  useEffect(() => {
    try {
      getUser()
      getAllCerts()
      fetchExams()
      fetchExemted()
      fetchAlreadyExemted()
    } catch (error) {
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
  }, [getUser, getAllCerts, fetchExams, fetchExemted])


  useEffect(() => {
    displayExams()
  }, [exams, exempted])


  useEffect(() => {
    displayAlreadyExams()
  }, [exams, alreadyExempted])


  const handleExempt = () => {
    const formData = {
      userid: `${id}`,
      exam_id: Checked,
    }
    setIsLoading(true)
    axios
      .post(`/admin/exempt-exam/create`, formData, {
        headers: {
          Authorization: `Bearer ${authCtx.token}`,
        },
      })
      .then((response) => {
        setIsLoading(false)
        if (response.status === 201 || response.status === 200) {
          fetchExemted()
          fetchAlreadyExemted()
          toast.success('Success!', {
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
        toast.error('Something went wrong, please try again later' + err, {
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
      })
  }

  const handleAlreadyExempt = () => {
    const formData = {
      userid: `${id}`,
      exam_id: CheckedNew,
    }

    setIsLoading(true)
    axios
      .post(`/admin/exempt-exam-payment/create`, formData, {
        headers: {
          Authorization: `Bearer ${authCtx.token}`,
        },
      })
      .then((response) => {
        setIsLoading(false)
        if (response.status === 201 || response.status === 200) {
          fetchExemted()
          fetchAlreadyExemted()
          toast.success('Success!', {
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
        toast.error('Something went wrong, please try again later' + err, {
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
      })
  }

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
    <section className='body'>
      <section role='main' className='content-body'>
        <header className='page-header'>
          <h2>User Profile</h2>
        </header>

        <div className='row'>
          <div className='col-xl-6'>
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
                      User Details
                    </h4>

                    <section className='simple-compose-box mb-3'>
                      <div className='timeline timeline-simple mt-3 mb-3'>
                        <div className='tm-body'>
                          <ol className='tm-items'>
                            <li>
                              <div className='tm-box'>
                                <p className='text-muted mb-0'>
                                  <strong>NAME</strong>
                                </p>
                                <p>
                                  <span className='text-primary'>
                                    {user.firstname + ' ' + user.lastname}
                                  </span>
                                </p>
                              </div>
                            </li>
                            <li>
                              <div className='tm-box'>
                                <p className='text-muted mb-0'>
                                  <strong>EMAIL</strong>
                                </p>
                                <p>{user.email}</p>
                              </div>
                            </li>
                            <li>
                              <div className='tm-box'>
                                <p className='text-muted mb-0'>
                                  <strong>ADDRESS</strong>
                                </p>
                                <p>{user.address}</p>
                              </div>
                            </li>
                            <li>
                              <div className='tm-box'>
                                <p className='text-muted mb-0'>
                                  <strong>PHONE</strong>
                                </p>
                                <p>{user.phone}</p>
                              </div>
                            </li>
                            <li>
                              <div className='tm-box'>
                                <p className='text-muted mb-0'>
                                  <strong>ACCOUNT TYPE</strong>
                                </p>
                                <p>
                                  {+user.account_type === 1
                                    ? 'Regular'
                                    : 'Conversion'}
                                </p>
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
          <div className='col-xl-6'>
            <section className='card'>
              <header className='card-header'>
                <h2 className='card-title'>Certificates</h2>
              </header>
              <div className='card-body'>
                <section className='card'>
                  <div className='card-body'>
                    <div className='row'>
                      {certificates && certificates.length > 0 ? (
                        certificates.map((certificate, index) => (
                          <div className='col-md-4' key={index}>

                            <a
                              href='#'
                              data-plugin-lightbox
                              data-plugin-options='{ "type":"image" }'
                              title='Caption. Can be aligned it to any side and contain any HTML.'
                            >
                              <ModalImage
                                className='cert-img'
                                small={certificate.url}
                                large={certificate.url}
                                alt={certificate.name}
                              />
                            </a>
                          </div>
                        ))
                      ) : (
                        <div>User has no certificate</div>
                      )}
                    </div>
                  </div>
                </section>
              </div>
            </section>
          </div>
        </div>

        <div className='row'>
          <div className='col-xl-12'>
            <section className='card'>
              <header className='card-header'>
                <h2 className='card-title'>Exempt user from exams</h2>
              </header>
              <div className='card-body'>
                <div className='form-group row pb-4'>
                  <div className='form-group row pb-4'>
                    <label className='col-lg-5'>
                      {' '}
                      <strong>{'Exempt user from taking exam(s)'}</strong>
                    </label>

                    {exams2 &&
                      exams2.map((exam, index) => (
                        <div
                          className='card-header portlet-handler'
                          key={index}
                        >
                          <h2 className='card-title'>{exam.name}</h2>
                          <div className='checkbox-custom checkbox-default'>
                            <input
                              type='checkbox'
                              id={exam.id}
                              value={exam.id}
                              checked={Checked.includes(exam.id)}
                              onChange={(e) =>
                                handleOnChange(e.target.checked, exam.id)
                              }
                            />
                            <label htmlFor={exam.id}></label>
                          </div>
                        </div>
                      ))}

                    <button
                      type='button'
                      className='mb-1 mt-1 me-1 btn btn-primary'
                      onClick={handleExempt}
                    >
                      Save
                    </button>
                  </div>
                </div>
                <div className='form-group row pb-4'>
                  <div className='form-group row pb-4'>
                    <label className='col-lg-5'>
                      {' '}
                      <strong>{'Exempt user from paying for exam(s)'}</strong>
                    </label>

                    {exams3 &&
                      exams3.map((exam, index) => (
                        <div
                          className='card-header portlet-handler'
                          key={index}
                        >
                          <h2 className='card-title'>{exam?.exam?.name}</h2>
                          <div className='checkbox-custom checkbox-default'>
                            <input
                              type='checkbox'
                              id={exam?.exam?.id}
                              value={exam?.exam?.id}
                              checked={CheckedNew.includes(exam?.exam?.id)}
                              onChange={(e) =>
                                handleOnChangeAlready(e.target.checked, exam?.exam?.id)
                              }
                            />
                            <label htmlFor={exam?.exam?.id}></label>
                          </div>
                        </div>
                      ))}

                    <button
                      type='button'
                      className='mb-1 mt-1 me-1 btn btn-primary'
                      onClick={handleAlreadyExempt}
                    >
                      Save
                    </button>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </section>
    </section>
  )
}

export default ViewUser
