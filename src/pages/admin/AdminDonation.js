import React, { useState, useContext, useEffect, useCallback } from 'react'
import { toast } from 'react-toastify'
import AuthContext from '../../store/auth-context'
import axios from '../../default_axios'
import { useParams, useLocation } from 'react-router-dom'
import Select from 'react-select'
import Loader from '../../components/loader'

const DonationSettings = () => {
  //const options = ['Mangoes', 'Apples'];

  const options = [
    { id: '8', name: 'True' },
    { id: '9', name: 'False' }
  ]

  const [isError, setIsError] = useState(false)
  const [status, setStatus] = useState(false)
  const location = useLocation()
  const params = useParams()
  const id = +params.id
  const [isLoading, setIsLoading] = useState(false)

  const authCtx = useContext(AuthContext)
  const [donationStatus, setDonationStatus] = useState('')


  const fetchStatus = useCallback(() => {
    setIsLoading(true)

    axios
      .get('admin/donation', {
        headers: {
          Authorization: `Bearer ${authCtx.token}`,
        },
      })
      .then((response) => {
        setIsLoading(false)

        if (response.status === 200 || response.status === 200) {
          console.log(response)
          setStatus(response?.data?.status === "1" ? true : false)
        } else {
          toast.error('Something went wrong, please try again later \n', {
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
      .catch((error) => {
        setIsLoading(false)

        toast.error('Something went wrong, please try again later \n', {
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
  }, [authCtx.token])

  const onSubmitHandler = async (e) => {
    e.preventDefault()
    // build up the new user data
    setDonationStatus("3061")
    console.log(donationStatus)
    //setDonationStatus(e.target.value.trim())
    const data = {
      status: status?"1":"0",
    }

    setIsLoading(true)
    axios
      .put(`admin/settings/enable-disable/donation`, data, {
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

  }

  useEffect(() => {
    fetchStatus()

    return () => null
  }, [])


  if (isError) {
    return (
      <section className='body'>
        <section role='main' className='content-body'>
          <header className='page-header'>
            <h2>Enable or Disable Donation</h2>
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
            <h2>Enable or Disable Donation</h2>
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
        <h2>Enable or Disable Donation</h2>
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
                  Edit Donation Status
                </button>
              </li>
            </ul>
            <div className='tab-content'>
              <div id='overview' className='tab-pane active'>
                <div className='form-group row pb-4'>
                  <label
                    className='col-lg-3 control-label text-lg-end'
                    htmlFor='inputDefault'
                  >
                    Status
                  </label>
                  <div className='col-lg-3 status-div text-center justify-content-center align-tems-center'>
                    {/* <Select
                      options={options}
                      getOptionLabel={(options) => options['name']}
                      getOptionValue={(options) => options['id']}
                    /> */}

                    <span className="switchButton" onClick={() => setStatus(!status)} >
                      <input type="checkbox" checked={status} disabled={status} />
                      <span className={`slider round ${status ? '' : 'disabled'}`}></span>
                    </span>

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

export default DonationSettings
