import React, { useState, useContext, useEffect, useCallback } from 'react'
import { toast } from 'react-toastify'
import AuthContext from '../../store/auth-context'
import axios from '../../default_axios'
import { useParams, useLocation } from 'react-router-dom'
import Select from 'react-select'
import Loader from '../../components/loader'

const SubscriptionPayment = () => {
  const [isError, setIsError] = useState(false)
  const location = useLocation()
  const params = useParams()
  const id = +params.id
  const [isLoading, setIsLoading] = useState(false)

  const authCtx = useContext(AuthContext)
  const [subscriptionAmount, setSubscriptionAmount] = useState('')

  const subscriptionAmountChangeHandler = (e) => {
    console.log(e.target.value.trim())
    setSubscriptionAmount(e.target.value.trim())
  }

  const fetchSubscription = useCallback(() => {
    setIsLoading(true)
    axios
    .get('/user/payment-settings/get/7', {
        headers: {
          Authorization: `Bearer ${authCtx.token}`,
        },
      })
      .then((response) => {
        setIsLoading(false)
        if (response.status === 201 || response.status === 200) {
          console.log(response.data.payment_settings.amount)
          setSubscriptionAmount(response.data.payment_settings.amount)
        } else {
          throw new Error('Something went wrong')
        }
      })
      .catch((err) => {
        alert('Something went wrong, please try again later' + err)
        setIsLoading(false)
        setIsError(true)
      })
  }, [authCtx.token])

  useEffect(() => {
    try {
      fetchSubscription()
    } catch (error) {}
  }, [fetchSubscription])
  //submit form handler
  console.log(subscriptionAmount)
  const onSubmitHandler = async (e) => {
    e.preventDefault()
    const data = {
      amount: subscriptionAmount,
      name: "subscription"
    }
    setIsLoading(true)
    axios
    .put(`admin/payment-settings/edit/7`, data, {
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
            <h2>Edit Subscription Amount</h2>
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
            <h2>Edit Subscription Amount</h2>
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
        <h2>Edit Subscription Amount</h2>
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
                  Edit Subscription Amount
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
                    Amount
                  </label>
                  <div className='col-lg-6'>
                    <input
                      value={subscriptionAmount}
                      type='text'
                      className='form-control'
                      id='inputDefault'
                  
                      onChange={subscriptionAmountChangeHandler}
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

export default SubscriptionPayment
