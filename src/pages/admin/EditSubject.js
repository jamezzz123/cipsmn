import React, { useState, useContext, useEffect, useCallback } from 'react'
import { toast } from 'react-toastify'
import AuthContext from '../../store/auth-context'
import axios from '../../default_axios'
import { useParams, useLocation } from 'react-router-dom'
import Select from 'react-select'
import Loader from '../../components/loader'

const EditSubject = () => {
  const [isError, setIsError] = useState(false)
  const location = useLocation()
  const params = useParams()
  const id = +params.id
  const [isLoading, setIsLoading] = useState(false)
  const { description, name, exam_id } = location.state
  const [examId, setExamId] = useState(exam_id)
  const authCtx = useContext(AuthContext)

  const [exams, setExams] = useState('')
  const [SubjectName, setSubjectName] = useState(name)
  const [subjectDis, setsubjectDis] = useState(description)

  const subjectNameChangeHandler = (e) => {
    setSubjectName(e.target.value.trim())
  }
  const subjectDisChangeHandler = (e) => {
    setsubjectDis(e.target.value.trim())
  }

  const fetchExams = useCallback(() => {
    setIsLoading(true)
    axios
      .get('/exam/get-all', {
        headers: {
          Authorization: `Bearer ${authCtx.token}`,
        },
      })
      .then((response) => {
        setIsLoading(false)
        if (response.status === 201 || response.status === 200) {
          setExams(response.data.data)
          // let data = response.data.data
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
        setIsError(true)
      })
  }, [authCtx.token])

  useEffect(() => {
    try {
      fetchExams()
    } catch (error) {}
  }, [fetchExams])
  //submit form handler
  const onSubmitHandler = async (e) => {
    e.preventDefault()
    // build up the new user data

    const formData = new FormData()
    formData.append('name', SubjectName)
    formData.append('description', subjectDis)
    formData.append('exam_id', examId.value)

    setIsLoading(true)
    axios
      .put(
        `/subject/edit/${id}`,
        {
          name: SubjectName,
          description: subjectDis,
          exam_id: examId.value,
        },
        {
          headers: {
            'content-type': 'multipart/form-data',
            Authorization: `Bearer ${authCtx.token}`,
          },
        }
      )
      .then((result) => {
        if (result.status === 201 || result.status === 200) {
          setIsLoading(false)
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
          toast.error(result.data.message, {
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
        setIsLoading(false)
        let errMssg = err.message || 'Something went wrong, please try again'

        let errors = !err.response
          ? { Error: errMssg }
          : !err.response.data
          ? { Error: errMssg }
          : err.response.data

        let errorDisplay = Object.keys(errors)
          .map((each, key) => `${key + 1}. ${each}: ${errors[each]}`)
          .join('\n')
        toast.error('Error: \n' + errorDisplay, {
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
  }

  if (isError) {
    return (
      <section className='body'>
        <section role='main' className='content-body'>
          <header className='page-header'>
            <h2>Edit Subject</h2>
          </header>
          <div className='d-flex align-items-center justify-content-center'>
            <h3 className='text-danger'>
              There was an error loading the targeted content, please try again
            </h3>
          </div>
        </section>
      </section>
    )
  }

  if (isLoading) {
    return (
      <section className='body'>
        <section role='main' className='content-body'>
          <header className='page-header'>
            <h2>Edit Subject</h2>
          </header>
          <div className='d-flex align-items-center justify-content-center'>
            <Loader />
          </div>
        </section>
      </section>
    )
  }

  return (
    <section role='main' className='content-body'>
      <header className='page-header'>
        <h2>Edit Subject</h2>
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
                  Edit Subject
                </button>
              </li>
            </ul>
            <div className='tab-content'>
              <div id='overview' className='tab-pane active'>
                <div className='form-group row pb-4'>
                  <label className='col-lg-3 control-label text-lg-end pt-2'>
                    Exam Type
                  </label>
                  <div className='col-lg-6'>
                    <Select
                      value={examId}
                      onChange={setExamId}
                      options={
                        exams
                          ? exams?.map((exam) => {
                              return { label: `${exam.name}`, value: exam.id }
                            })
                          : null
                      }
                    />
                  </div>
                </div>

                <div className='form-group row pb-4'>
                  <label
                    className='col-lg-3 control-label text-lg-end pt-2'
                    htmlFor='inputDefault'
                  >
                    Subject Name
                  </label>
                  <div className='col-lg-6'>
                    <input
                      type='text'
                      className='form-control'
                      id='inputDefault'
                      value={SubjectName}
                      onChange={subjectNameChangeHandler}
                    />
                  </div>
                </div>
                <div className='form-group row pb-4'>
                  <label
                    className='col-lg-3 control-label text-lg-end pt-2'
                    htmlFor='inputDefault'
                  >
                    Subject Description
                  </label>
                  <div className='col-lg-6'>
                    <textarea
                      className='form-control'
                      rows={3}
                      value={subjectDis}
                      id='textareaAutosize'
                      onChange={subjectDisChangeHandler}
                      data-plugin-textarea-autosize
                      style={{
                        overflow: 'hidden',
                        overflowWrap: 'break-word',
                        resize: 'none',
                        height: '90px',
                      }}
                      defaultValue={''}
                    />
                  </div>
                </div>
              </div>
              <button
                type='button'
                className='mb-1 mt-1 me-1 btn btn-primary'
                onClick={onSubmitHandler}
              >
                Save Update
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* end: page */}
    </section>
  )
}

export default EditSubject
