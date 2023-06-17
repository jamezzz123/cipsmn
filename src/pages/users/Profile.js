import React, { useState, useEffect, useCallback, useContext } from 'react'
import Loader from '../../components/loader'
import axios from '../../default_axios'
import { useParams, useHistory } from 'react-router-dom'
import { toast } from 'react-toastify'
import AuthContext from '../../store/auth-context'
function EditUser() {
  const authCtx = useContext(AuthContext)
  const [isLoading, setIsLoading] = useState(false)

  let history = useHistory()
  const params = useParams()

  const handleClick = () => {
    history.push('/user')
  }

  const id = +params.id

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

  const [account_type, setAccountType] = useState(1)

  const [registrationId, setRegId] = useState('')

  //input change handlers
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
  
  const regIdChangeHandler = (e) => {
    setRegId(e.target.value.trim())
  }

  const getUser = useCallback(() => {
    setIsLoading(true)
    axios
      .get(`user/get-my-profile`, {
        headers: {
          Authorization: `Bearer ${authCtx.token}`,
        },
      })
      .then((response) => {
        setIsLoading(false)
        if (response.status === 201 || response.status === 200) {
          setFirstName(response.data.firstname)
          setLastName(response.data.lastname)
          setEmail(response.data.email)
          setAddress(response.data.address)
          setPhone(response.data.phone)
          setAccountType(response.data.account_type)
          setRegId(response.data.reg_id)
        } else {
          throw new Error('Something went wrong')
        }
      })
      .catch((err) => {
        toast.error('Something went wrong, please try again later', {
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

  useEffect(() => {
    try {
      getUser()
    } catch (error) {
      toast.error('Something went wrong, please try again later' + error, {
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
  }, [getUser])

  //submit form handler
  const onSubmitHandler = (e) => {
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
    formData.append('reg_id', registrationId)

    setIsLoading(true)
    axios
      .post(`/user/edit-profile`, formData, {
        headers: {
          // 'Content-Type': 'application/json',
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
        let errMssg = err.message || 'Something went wrong, please try again'

        let errors = !err.response
          ? { Error: errMssg }
          : !err.response.data
          ? { Error: errMssg }
          : err.response.data
        // console.log(`${!err.response ? err.message : Object.keys(err.response.data)/* ? err.message : err.response*/}`)
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
    <div className='body'>
      <section role='main' className='content-body'>
        <header className='page-header'>
          <h2>User Profile</h2>
        </header>
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
                    Edit User Details
                  </button>
                </li>
              </ul>
              <div className='tab-content'>
                <div id='overview' className='tab-pane active'>
                  <div className='form-group row pb-4'>
                    <label
                      className='col-lg-3 control-label text-lg-end pt-2'
                      for='inputDefault'
                    >
                      First Name
                    </label>
                    <div className='col-lg-6'>
                      <input
                        type='text'
                        className='form-control'
                        id='inputDefault'
                        value={firstname}
                        onChange={firstNameChangeHandler}
                      />
                    </div>
                  </div>

                  <div className='form-group row pb-4'>
                    <label
                      className='col-lg-3 control-label text-lg-end pt-2'
                      for='inputDefault'
                    >
                      Last Name
                    </label>
                    <div className='col-lg-6'>
                      <input
                        type='text'
                        value={lastname}
                        className='form-control'
                        id='inputDefault'
                        onChange={lastNameChangeHandler}
                      />
                    </div>
                  </div>
                </div>
                <div className='form-group row pb-4'>
                  <label
                    className='col-lg-3 control-label text-lg-end pt-2'
                    for='inputDefault'
                  >
                    Phone
                  </label>
                  <div className='col-lg-6'>
                    <input
                      name='name'
                      type='number'
                      className='form-control'
                      value={phone}
                      onChange={phoneChangeHandler}
                    />
                  </div>
                </div>

                <div className='form-group row pb-4'>
                  <label
                    className='col-lg-3 control-label text-lg-end pt-2'
                    for='inputDefault'
                  >
                    E-mail
                  </label>
                  <div className='col-lg-6'>
                    <input
                      name='email'
                      type='email'
                      className='form-control'
                      value={email}
                      onChange={emailChangeHandler}
                    />
                  </div>
                </div>

                <div className='form-group row pb-4'>
                  <label
                    className='col-lg-3 control-label text-lg-end pt-2'
                    for='inputDefault'
                  >
                    Address
                  </label>
                  <div className='col-lg-6'>
                    <input
                      name='name'
                      type='text'
                      className='form-control'
                      value={address}
                      onChange={addressChangeHandler}
                    />
                  </div>
                </div>
                <div className='form-group row pb-4'>
                  <label
                    className='col-lg-3 control-label text-lg-end pt-2'
                    for='inputDefault'
                  >
                  </label>
                </div>
                <div className='form-group row pb-4'>
                  <div className='col-md-3 float-right'>
                    <button
                      type='button'
                      className='mb-1 mt-1 me-1 btn btn-primary'
                      onClick={onSubmitHandler}
                    >
                      Save Update
                    </button>
                  </div>
                  <div className='col-md-3 float-right'>
                    <button
                      type='button'
                      className='mb-1 mt-1 ms-5 btn btn-secondary'
                      onClick={handleClick}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default EditUser
