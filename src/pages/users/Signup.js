import React, { useState, useContext } from 'react'
import logo from '../../assets/img/logo.png'
import axios from '../../default_axios.js'
import { NavLink } from 'react-router-dom'
import { toast } from 'react-toastify'
import Terms from '../common/terms'

const Signup = () => {
  const [firstname, setFirstName] = useState('')
  // const [firstNameIsTouched, setFirstNameIsTouched] = useState(false);

  const [lastname, setLastName] = useState('')
  // const [lastNameIsTouched, setLastNameIsTouched] = useState(false);

  const [email, setEmail] = useState('')
  // const [emailIsTouched, setEmailIsTouched] = useState(false);

  const [address, setAddress] = useState('')
  // const [addressIsTouched, setAddressIsTouched] = useState(false);

  const [password, setPassword] = useState('')
  // const [passwordIsTouched, setPasswordIsTouched] = useState(false);

  const [confirmed, setPasswordCon] = useState('')
  // const [confirmIsTouched, setConfirmIsTouched] = useState(false);

  const [phone, setPhone] = useState('')
  // const [phoneIsTouched, setPhoneIsTouched] = useState(false);
  const [isModal, setIsModal] = useState(false)


  const [account_type, setAccountType] = useState(1)
  const [agreeTerms, setAgreeTerms] = useState(false)
  const [file, setFile] = useState('')

  //input change handlers
  const onFileChange = (event) => {
    // Update the state
    setFile(event.target.files[0])
  }

  const firstNameChangeHandler = (e) => {
    setFirstName(e.target.value.trim())
  }
  // const firstNameBlurHandler = () => {
  //   setFirstNameIsTouched(true)
  // }

  const lastNameChangeHandler = (e) => {
    setLastName(e.target.value.trim())
  }
  // const lastNameBlurHandler = () => {
  //   setLastNameIsTouched(true);
  // }
  const emailChangeHandler = (e) => {
    setEmail(e.target.value.trim())
  }
  // const emailBlurHandler = () => {
  //   setEmailIsTouched(true);
  // }
  const addressChangeHandler = (e) => {
    setAddress(e.target.value.trim())
  }
  // const addressBlurHandler = () => {
  //   setAddressIsTouched(true);
  // }
  const passwordChangeHandler = (e) => {
    setPassword(e.target.value.trim())
  }
  // const passwordBlurHandler = () => {
  //   setPasswordIsTouched(true)
  // }
  const passwordConfirmHandler = (e) => {
    setPasswordCon(e.target.value.trim())
  }
  // const confirmBlurHandler = () => {
  //   setConfirmIsTouched(true);
  // }

  const phoneChangeHandler = (e) => {
    setPhone(e.target.value.trim())
  }
  // const phoneBlurHandler = () => {
  //   setPhoneIsTouched(true)
  // }
  const accountTypeChangeHandler = (e) => {
    setAccountType(e.target.value)
    console.log(e.target.value)
  }
  const agreeTermsHandler = (e) => {
    setAgreeTerms(e.target.checked)
  }

  //submit form handler
  const onSubmitHandler = async (e) => {
    e.preventDefault()
    // build up the new user data

    const formData = new FormData()
    formData.append('firstname', firstname)
    formData.append('lastname', lastname)
    formData.append('phone', phone)
    formData.append('address', address)
    formData.append('email', email)
    formData.append('account_type', String(account_type))
    formData.append('user_type', 2)
    formData.append('password', password)
    formData.append('confirmed', confirmed)
    formData.append('file', file)

    await axios
      .post('/user/register', formData, {
        headers: {
          'content-type': 'multipart/form-data',
          // Authorization: `Bearer ${authCtx.token}`,
        },
      })
      .then((result) => {
        if (result.status === 201 || result.status === 200) {
          toast.success('Success! You have successfully been registered', {
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
  return (
    // start of page
    <section className='body-sign'>
    <Terms isModal={isModal} setIsModal={setIsModal} />
      <div className='center-sign'>
        <a href='/' className='logo float-left'>
          <img src={logo} height='70' alt='Organization Logo' />
        </a>

        <div className='panel card-sign'>
          <div className='card-title-sign mt-3 text-end'>
            <h2 className='title text-uppercase font-weight-bold m-0'>
              <i className='bx bx-user-circle me-1 text-6 position-relative top-5'></i>{' '}
              Sign Up
            </h2>
          </div>
          <div className='card-body'>
            <form onSubmit={onSubmitHandler}>
              <div className='form-group mb-3'>
                <label>First Name</label>
                <input
                  name='name'
                  type='text'
                  className='form-control form-control-lg'
                  onChange={firstNameChangeHandler}
                />
              </div>
              <div className='form-group mb-3'>
                <label>Last Name</label>
                <input
                  name='name'
                  type='text'
                  className='form-control form-control-lg'
                  onChange={lastNameChangeHandler}
                />
              </div>
              <div class='form-group mb-3'>
                <label for='formFile' class='control-label text-lg-end pt-2'>
                  Profile Picture
                </label>
                <input
                  class='form-control form-control-lg'
                  type='file'
                  id='formFile'
                  onChange={onFileChange}
                />
              </div>
              <div className='form-group mb-3'>
                <label className='control-label text-lg-end pt-2'>
                  Select Account Type
                </label>
                <select
                  className='form-control form-control-lg mb-3'
                  onChange={accountTypeChangeHandler}
                >
                  <option value=''>Select type</option>
                  <option value='2'>Conversion</option>
                  <option value='1'>Regular</option>
                </select>
              </div>

              <div className='form-group mb-3'>
                <label>Phone</label>
                <input
                  name='name'
                  type='number'
                  className='form-control form-control-lg'
                  onChange={phoneChangeHandler}
                />
              </div>

              <div className='form-group mb-3'>
                <label>E-mail</label>
                <input
                  name='email'
                  type='email'
                  className='form-control form-control-lg'
                  onChange={emailChangeHandler}
                />
              </div>

              <div className='form-group mb-3'>
                <label>Adress</label>
                <input
                  name='name'
                  type='text'
                  className='form-control form-control-lg'
                  onChange={addressChangeHandler}
                />
              </div>

              <div className='form-group mb-0'>
                <div className='row'>
                  <div className='col-sm-6 mb-3'>
                    <label>Password</label>
                    <input
                      name='pwd'
                      type='password'
                      className='form-control form-control-lg'
                      onChange={passwordChangeHandler}
                    />
                  </div>
                  <div className='col-sm-6 mb-3'>
                    <label>Password Confirmation</label>
                    <input
                      name='pwd_confirm'
                      type='password'
                      className='form-control form-control-lg'
                      onChange={passwordConfirmHandler}
                    />
                  </div>
                </div>
              </div>

              <div className='row'>
                <div className='col-sm-8'>
                  <div className='checkbox-custom checkbox-default'>
                    <input
                      id='AgreeTerms'
                      name='agreeterms'
                      type='checkbox'
                      checked={agreeTerms}
                      onChange={agreeTermsHandler}
                    />
                    <label htmlFor='AgreeTerms'>
                      I agree with <span className='text-primary' onClick={()=>setIsModal(true)}>terms of use</span>
                    </label>
                  </div>
                </div>
                <div className='col-sm-4 text-right'>
                  <button
                    type='submit'
                    className='btn btn-primary mt-2'
                    disabled={!agreeTerms}
                  >
                    Sign Up
                  </button>
                </div>
              </div>

              <span className='mt-3 mb-3 line-thru text-center text-uppercase'>
                <span>or</span>
              </span>

              <p className='text-center'>
                Already have an account? <NavLink to='/login'>Sign In!</NavLink>
              </p>
            </form>
          </div>
        </div>

        <p className='text-center text-muted mt-3 mb-3'>
          &copy; Copyright 2022. All Rights Reserved.
        </p>
      </div>
    </section>
    // end: page
  )
}

export default Signup
