import React, { useState, useContext, useCallback, useEffect } from 'react'
import axios from '../../default_axios'
import { toast } from 'react-toastify'
import AuthContext from '../../store/auth-context'
import Select from 'react-select'
import Loader from '../../components/loader'

const CreateSubject = () => {
  const authCtx = useContext(AuthContext)
  const [isLoading, setIsLoading] = useState(false)
  const [exams, setExams] = useState('')
  const [examId, setExamId] = useState('')
  const [subjectName, setSubjectName] = useState('')
  const [subjectDis, setSubjectDis] = useState('')

  const [isError, setIsError] = useState(false)

  const subjectNameChangeHandler = (e) => {
    setSubjectName(e.target.value.trim())
  }
  const subjectDisChangeHandler = (e) => {
    setSubjectDis(e.target.value.trim())
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
    formData.append('exam_id', examId.value)
    formData.append('name', subjectName)
    formData.append('description', subjectDis)

    setIsLoading(true)
    axios
      .post('/subject/create', formData, {
        headers: {
          'content-type': 'multipart/form-data',
          Authorization: `Bearer ${authCtx.token}`,
        },
      })
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

          setSubjectDis('')
          setSubjectName('')
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

        toast.error('Error:  \n' + errorDisplay, {
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

  if (isLoading) {
    return (
      <section className='body'>
        <section role='main' className='content-body'>
          <header className='page-header'>
            <h2>Create subject</h2>
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
      <section role='main' className='content-body card-margin'>
        <header className='page-header'>
          <h2>Create Subject</h2>
          <div className='right-wrapper text-end'></div>
        </header>
        {/* start: page */}
        <div className='row'>
          <div className='col'>
            <section className='card'>
              <header className='card-header'>
                <div className='card-actions'>
                  <a
                    href='#'
                    className='card-action card-action-toggle'
                    data-card-toggle
                  />
                  <a
                    href='#'
                    className='card-action card-action-dismiss'
                    data-card-dismiss
                  />
                </div>
                <h2 className='card-title'>Create Subject</h2>
              </header>
              <div className='card-body'>
                <form
                  className='form-horizontal form-bordered'
                  onSubmit={onSubmitHandler}
                >
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
                    <label className='col-lg-3 control-label text-lg-end pt-2'>
                      Name
                    </label>
                    <div className='col-lg-6'>
                      <input
                        name='name'
                        type='text'
                        className='form-control form-control-lg'
                        onChange={subjectNameChangeHandler}
                        required
                      />
                    </div>
                  </div>
                  <div className='form-group row pb-4'>
                    <label className='col-lg-3 control-label text-lg-end pt-2'>
                      Description
                    </label>
                    <div className='col-lg-6'>
                      <input
                        name='name'
                        type='text'
                        className='form-control form-control-lg'
                        onChange={subjectDisChangeHandler}
                        required
                      />
                    </div>
                  </div>

                  <div className='m-0'>
                    <div className='col-lg-6'>
                      <button
                        type='submit'
                        className='mb-1 mt-1 me-1 btn btn-primary'
                      >
                        Save
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </section>
          </div>
        </div>
      </section>
    </section>
  )
}

export default CreateSubject
