import React, { useState, useContext } from 'react'
import { toast } from 'react-toastify'
import AuthContext from '../../store/auth-context'
import axios from '../../default_axios'
import Loader from '../../components/loader'
import { useParams, useLocation } from 'react-router-dom'

const EditExam = () => {
  const location = useLocation()
  const params = useParams()
  const id = +params.id
  const [isLoading, setIsLoading] = useState(false)
  const { description, name } = location.state

  const authCtx = useContext(AuthContext)

  const [examName, setExamName] = useState(name)
  const [examDis, setExamDis] = useState(description)
  const [setImage, setExamImage] = useState('')
  const [examAmount, setExamAmount] = useState('')

  const examAmountChangeHandler = (e) => {
    setExamAmount(e.target.value.trim())
  }

  const examNameChangeHandler = (e) => {
    setExamName(e.target.value.trim())
  }
  const examDisChangeHandler = (e) => {
    setExamDis(e.target.value.trim())
  }
  const examImageChangeHandler = (e) => {
    setExamImage(e.target.files[0])
  }

  //submit form handler
  const onSubmitHandler = async (e) => {
    e.preventDefault()
    // build up the new user data

    const formData = new FormData()
    formData.append('name', examName)
    formData.append('description', examDis)
    formData.append('amount', examAmount)
    formData.append('file', setImage)
    setIsLoading(true)
    axios
      .post(`/exam/edit/${id}`, formData, {
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

  if (isLoading) {
    return (
      <section className='body'>
        <section role='main' className='content-body'>
          <header className='page-header'>
            <h2>Edit Exams</h2>
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
        <h2>Edit Exam</h2>
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
                  Edit Exam
                </button>
              </li>
            </ul>
            <div className='tab-content'>
              <div id='overview' className='tab-pane active'>
                <div className='form-group row pb-4'>
                  <label
                    className='col-lg-3 control-label text-lg-end pt-2'
                    htmlFor='inputDefault'
                  >
                    Exam Name
                  </label>
                  <div className='col-lg-6'>
                    <input
                      type='text'
                      className='form-control'
                      id='inputDefault'
                      value={examName}
                      onChange={examNameChangeHandler}
                    />
                  </div>
                </div>
                <div className='form-group row pb-4'>
                  <label
                    className='col-lg-3 control-label text-lg-end pt-2'
                    htmlFor='inputDefault'
                  >
                    Exam Description
                  </label>
                  <div className='col-lg-6'>
                    <textarea
                      className='form-control'
                      rows={3}
                      value={examDis}
                      id='textareaAutosize'
                      onChange={examDisChangeHandler}
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
                <div className='form-group row pb-4'>
                  <div className='form-group row pb-4'>
                    <label className='col-lg-3 control-label text-lg-end pt-2'>
                      Select Exam Image
                    </label>
                    <div className='col-lg-6'>
                      <input
                        class='form-control form-control-lg'
                        type='file'
                        id='formFile'
                        onChange={examImageChangeHandler}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className='form-group row pb-4'>
                  <label className='col-lg-3 control-label text-lg-end pt-2'>
                    Exam Amount
                  </label>
                  <div className='col-lg-6'>
                    <input
                      name='name'
                      type='text'
                      className='form-control form-control-lg'
                      onChange={examAmountChangeHandler}
                      required
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

export default EditExam
