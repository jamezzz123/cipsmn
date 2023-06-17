import React, { useState, useContext } from 'react'
import axios from '../../default_axios'
import { toast } from 'react-toastify'
import AuthContext from '../../store/auth-context'
import Loader from '../../components/loader'

const CreateExam = () => {
  const authCtx = useContext(AuthContext)
  const [isLoading, setIsLoading] = useState(false)

  const [examName, setExamName] = useState('')
  const [examDis, setExamDis] = useState('')
  const [setImage, setExamImage] = useState('')
  const [examAmount, setExamAmount] = useState('')

  const examNameChangeHandler = (e) => {
    setExamName(e.target.value.trim())
  }
  const examDisChangeHandler = (e) => {
    setExamDis(e.target.value.trim())
  }
  const examImageChangeHandler = (e) => {
    setExamImage(e.target.files[0])
  }
  const examAmountChangeHandler = (e) => {
    setExamAmount(e.target.value.trim())
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
      .post('/exam/create', formData, {
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

          setExamAmount('')
          setExamDis('')
          setExamImage('')
          setExamAmount('')
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
            <h2>Create Exam</h2>
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
      <section role='main' className='content-body '>
        <header className='page-header'>
          <h2>Create Exam</h2>
        </header>

        <div className='row'>
          <div className='col'>
            <section className='card'>
              <header className='card-header'>
                <h2 className='card-title'>Create Exam</h2>
              </header>
              <div className='card-body'>
                <form
                  className='form-horizontal form-bordered'
                  onSubmit={onSubmitHandler}
                >
                  <div className='form-group row pb-4'>
                    <label className='col-lg-3 control-label text-lg-end pt-2'>
                      Exam Name
                    </label>
                    <div className='col-lg-6'>
                      <input
                        name='name'
                        type='text'
                        className='form-control form-control-lg'
                        onChange={examNameChangeHandler}
                        required
                      />
                    </div>
                  </div>

                  <div className='form-group row pb-4'>
                    <label className='col-lg-3 control-label text-lg-end pt-2'>
                      Exam Description
                    </label>
                    <div className='col-lg-6'>
                      <input
                        name='name'
                        type='text'
                        className='form-control form-control-lg'
                        onChange={examDisChangeHandler}
                        required
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

export default CreateExam
