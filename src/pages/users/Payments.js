import React, { useState, useEffect, useContext, useCallback } from 'react'
import Loader from '../../components/loader'
import axios from '../../default_axios'
import AuthContext from '../../store/auth-context'
import moment from 'moment'
import CurrencyFormat from 'react-currency-format'
import PayStack from '../../components/paystack'
const Payments = () => {
  // const [upcoming, setUpcoming] = useState([])
  const [recent, setRecent] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const [isError, setIsError] = useState(false)
  const [user, setUser] = useState(null)
  const [honoraryAmount, setHonoraryAmount] = useState('')
  const [inductionAmount, setInductionAmount] = useState('')
  const [subscriptionAmount, setSubscriptionAmount] = useState('')


  // const [isError, setIsError] = useState(false)

  const authCtx = useContext(AuthContext)

  const getRecent = useCallback(() => {
    setIsLoading(true)
    axios
      .get('user/dashboard', {
        headers: {
          Authorization: `Bearer ${authCtx.token}`,
        },
      })
      .then((response) => {
        setIsLoading(false)

        if (response.status === 200 || response.status === 200) {
          setRecent(response.data.payment)
        } else {
          //TODO...error state
        }
      })
      .catch((error) => {
        setIsLoading(false)
      })
  }, [authCtx.token])

  useEffect(() => {
    try {
      getRecent()
    } catch (error) {
      console.log(error)
    }
  }, [getRecent])



  const fetchUser = useCallback(() => {
    setIsLoading(true)
    axios
      .get('user/dashboard', {
        headers: {
          Authorization: `Bearer ${authCtx.token}`,
        },
      })
      .then((response) => {
        setIsLoading(false)

        if (response.status === 200 || response.status === 200) {

          setUser(response.data)
        } else {
          //TODO...error state
        }
      })
      .catch((error) => {
        setIsLoading(false)
        setIsError(true)
      })
  }, [authCtx.token])


  const fetchHonorary = useCallback(() => {
    setIsLoading(true)
    axios
      .get('/user/payment-settings/get/1', {
        headers: {
          Authorization: `Bearer ${authCtx.token}`,
        },
      })
      .then((response) => {
        console.log(response.data.payment_settings.amount)
        setIsLoading(false)
        if (response.status === 201 || response.status === 200) {
          setHonoraryAmount(response.data.payment_settings.amount)
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
      fetchHonorary()
    } catch (error) {}
  }, [fetchHonorary])


  const fetchInduction = useCallback(() => {
    setIsLoading(true)
    axios
    .get('/user/payment-settings/get/2', {
        headers: {
          Authorization: `Bearer ${authCtx.token}`,
        },
      })
      .then((response) => {
        setIsLoading(false)
        if (response.status === 201 || response.status === 200) {
          console.log(response.data.payment_settings.amount)
          setInductionAmount(response.data.payment_settings.amount)
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
      fetchInduction()
    } catch (error) {}
  }, [fetchInduction])


  const fetchSubscription = useCallback(() => {
    setIsLoading(true)
    axios
    .get('/user/payment-settings/get/5', {
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


  if (isLoading) {
    return (
      <section className='body'>
        <section role='main' className='content-body'>
          <header className='page-header'>
            <h2>Make Payment</h2>
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
      <section role='main' className='content-body '>
        <header className='page-header'>
          <h2>Make Payment</h2>
        </header>
        {/* start: page */}
        <div className='row'>
          
          <div className='col-lg-12'>
          <div  className='row m-5'>
            <div className='col-md-3'>
              <PayStack details={{description: authCtx.username + "honorary", type: "honorary", email: authCtx.username, amount: honoraryAmount.toString() }} token={authCtx.token} text={"Pay for Honorary"} className='mb-1 mt-1 me-1 btn btn-info' />
            </div>
            <div className='col-md-3'>
              <PayStack details={{description: authCtx.username + "induction", type: "induction", email: authCtx.username, amount: inductionAmount.toString() }} token={authCtx.token} text={"Pay for Induction"} className='mb-1 mt-1 me-1 btn btn-warning' />
            </div>
            <div className='col-md-3'>
              <PayStack details={{description: authCtx.username + "subscription", type: "subscription", email: authCtx.username, amount: subscriptionAmount.toString() }} token={authCtx.token} text={"Pay for Subscription"} className='mb-1 mt-1 me-1 btn btn-info' />
            </div>
            </div>
            <section className='card'>
              <header className='card-header'>
                <h2 className='card-title'>All Payments</h2>
              </header>
              <div className='card-body'>
                {recent.length > 0 ? (
                  <table className='table table-responsive-md table-striped mb-0'>
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Purpose</th>
                        <th>Amount</th>
                        <th>Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recent &&
                        recent.map((recent, index) => (
                          <tr>
                            <td>{index}</td>
                            <td>{recent.purpose}</td>
                            <td>
                              <CurrencyFormat
                                value={recent.amount || '0'}
                                displayType={'text'}
                                thousandSeparator={true}
                                prefix={'₦ '}
                                decimalScale={2}
                                fixedDecimalScale={true}
                              />
                            </td>
                            <td>{moment(recent.created_at).format('L')}</td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                ) : (
                  <div>User has not made any payment</div>
                )}
              </div>
            </section>
          </div>
          {/* end: page */}
        </div>
      </section>
    </div>
  )
}

export default Payments
