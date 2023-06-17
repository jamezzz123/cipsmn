import React, { useState, useContext, useEffect, useCallback } from 'react'
import { toast } from 'react-toastify'
import AuthContext from '../../store/auth-context'
import axios from '../../default_axios'
import { useParams, useLocation } from 'react-router-dom'
import Select from 'react-select'
import Loader from '../../components/loader'

const EditPassword = () => {
  const [isError, setIsError] = useState(false)
  const location = useLocation()
  const params = useParams()
  const id = +params.id
  const [isLoading, setIsLoading] = useState(false)

  const authCtx = useContext(AuthContext)
  const [passwordText, setPassword] = useState('')

  const passwordChangeHandler = (e) => {
    console.log(e.target.value.trim())
    setPassword(e.target.value.trim())
  }

  const confirmPasswordChangeHandler = (e) => {
    console.log(e.target.value.trim())
    //setPassword(e.target.value.trim())
  }


  //submit form handler
  console.log(passwordText)
  const onSubmitHandler = async (e) => {
    e.preventDefault()
    // build up the new user data
    const data = {
      password: passwordText,
      confirm_password: passwordText
    }
    setIsLoading(true)
    axios
    .put(`user/change-password`, data, {
      headers: {
        'Content-Type': 'application/json',
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

        alert('Errors: \n' + errorDisplay)
      })
  }

  if (isError) {
    return (
      <section className='body'>
        <section role='main' className='content-body'>
          <header className='page-header'>
            <h2>Update PAssword</h2>
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
            <h2>Enter New Password</h2>
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
        <h2>Edit Regular Amount</h2>
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
                  Update Password
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
                    Password
                  </label>
                  <div className='col-lg-6'>
                    <input
                      value={passwordText}
                      type='text'
                      className='form-control'
                      id='inputDefault'
                  
                      onChange={passwordChangeHandler}
                    />
                  </div>
                </div>
                <div className='form-group row pb-4'>
                  <label
                    className='col-lg-3 control-label text-lg-end pt-2'
                    htmlFor='inputDefault'
                  >
                    Confirm Password
                  </label>
                  <div className='col-lg-6'>
                    <input
                      value={passwordText}
                      type='text'
                      className='form-control'
                      id='inputDefault'
                  
                      onChange={confirmPasswordChangeHandler}
                    />
                  </div>
                </div>
              </div>
              <button
                type='button'
                className='mb-1 mt-1 me-1 btn btn-primary'
                onClick={onSubmitHandler}
              >
                Save Password
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* end: page */}
    </section>
  )
}

export default EditPassword
