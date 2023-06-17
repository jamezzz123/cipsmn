import React, { useState, useEffect, useCallback, useContext } from 'react'
import AuthContext from '../../store/auth-context'
import CurrencyFormat from 'react-currency-format'
import Loader from '../../components/loader'

import axios from '../../default_axios'

const AdminDashboard = () => {
  const authCtx = useContext(AuthContext)

  const [users, setUsers] = useState([])
  const [payments, setPayments] = useState([])

  const [admin, setAdmin] = useState(null)
  const [isLoadingUsers, setIsLoadingUsers] = useState(false)
  const [isError, setIsError] = useState(false)

  const fetchAdmin = useCallback(() => {
    setIsLoadingUsers(true)
    axios
      .get('dashboard/admin', {
        headers: {
          Authorization: `Bearer ${authCtx.token}`,
        },
      })
      .then((response) => {
        setIsLoadingUsers(false)

        if (response.status === 200 || response.status === 200) {
          console.log(response.data)
          const adminData = {
            total_badge: response.data.total_badge,
            total_exam: response.data.total_exam,
            total_payment: response.data.total_payment,
            total_users: response.data.total_users,
          }
          setAdmin(adminData)
          setUsers(response.data.recent_users)
          setPayments(response.data.recent_payments)
        } else {
          //TODO...error state
        }
      })
      .catch((error) => {
        setIsLoadingUsers(false)
        setIsError(true)
      })
  }, [authCtx.token])

  useEffect(() => {
    try {
      fetchAdmin()
    } catch (err) {
      console.log(err)
    }
  }, [fetchAdmin])


  return (
    <section className='body'>
      <section role='main' className='content-body'>
        <header className='page-header'>
          <h2>Dashboard</h2>
        </header>

        {/* <!-- start: page --> */}
        {isLoadingUsers && <div className='d-flex align-items-center justify-content-center'>
            <Loader />
          </div>}
        {!isLoadingUsers && admin && (
          <>
            <div className='row'>
              <div className='col-lg-12'>
                <div className='row mb-3'>
                  <div className='col-xl-4'>
                    <section className='card card-featured-left card-featured-primary mb-3'>
                      <div className='card-body'>
                        <div className='widget-summary'>
                          <div className='widget-summary-col widget-summary-col-icon'>
                            <div className='summary-icon bg-primary'>
                              <i className='fas fa-user'></i>
                            </div>
                          </div>
                          <div className='widget-summary-col'>
                            <div className='summary'>
                              <h4 className='title'>Total Users</h4>
                              <div className='info'>
                                <strong className='amount'>
                                  {admin.total_users}
                                </strong>
                              </div>
                            </div>
                            <div className='summary-footer'></div>
                          </div>
                        </div>
                      </div>
                    </section>
                  </div>
                  <div className='col-xl-4'>
                    <section className='card card-featured-left card-featured-secondary mb-3'>
                      <div className='card-body'>
                        <div className='widget-summary'>
                          <div className='widget-summary-col widget-summary-col-icon'>
                            <div className='summary-icon bg-secondary'>
                              <i className='fas fa-dollar-sign'></i>
                            </div>
                          </div>
                          <div className='widget-summary-col'>
                            <div className='summary'>
                              <h4 className='title'>Total Payment</h4>
                              <div className='info'>
                                <strong className='amount'>
                                  <CurrencyFormat value={admin.total_payment || "0"} displayType={'text'} thousandSeparator={true} prefix={'₦ '} decimalScale={2} fixedDecimalScale={true} />
                                </strong>
                              </div>
                            </div>
                            <div className='summary-footer'></div>
                          </div>
                        </div>
                      </div>
                    </section>
                  </div>
                  <div className='col-xl-4'>
                    <section className='card card-featured-left card-featured-tertiary mb-3'>
                      <div className='card-body'>
                        <div className='widget-summary'>
                          <div className='widget-summary-col widget-summary-col-icon'>
                            <div className='summary-icon bg-tertiary'>
                              <i className='fas fa-school'></i>
                            </div>
                          </div>
                          <div className='widget-summary-col'>
                            <div className='summary'>
                              <h4 className='title'>Total Exam</h4>
                              <div className='info'>
                                <strong className='amount'>
                                  {admin.total_exam}
                                </strong>
                              </div>
                            </div>
                            <div className='summary-footer'></div>
                          </div>
                        </div>
                      </div>
                    </section>
                  </div>
                </div>
              </div>
            </div>

            <div className='row pt-4 mt-1'>
              <div className='col-lg-12'>
                <section className='row mb-3'>
                  <div className='col-xl-6'>
                    <header className='card-header card-header-transparent'>
                      <h2 className='card-title'>Recent Users</h2>
                    </header>
                    <div className='card-body'>
                      {isLoadingUsers && <Loader />}
                      {!users && !isLoadingUsers && <h3>No users found</h3>}
                      {users && !isLoadingUsers && !isError && (
                        <table className='table table-responsive-md table-striped mb-0'>
                          <thead>
                            <tr>
                              <th>#</th>
                              <th>Name</th>
                            </tr>
                          </thead>
                          <tbody>
                            {users.map((user, index) => (
                              <tr key={user.id}>
                                <td>{index + 1}</td>
                                <td>{`${user.firstname} ${user.lastname}`}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      )}
                    </div>
                  </div>
                  <div className='col-xl-6'>
                    <header className='card-header card-header-transparent'>
                      <h2 className='card-title'>Recent Payments</h2>
                    </header>
                    <div className='card-body'>
                      {!isError && !isLoadingUsers && payments.length < 1 && (
                        <h3>No payments</h3>
                      )}
                      {!isError && !isLoadingUsers && payments.length > 0 && (
                        <table className='table table-responsive-md table-striped mb-0'>
                          <thead>
                            <tr>
                              <th>#</th>
                              <th>Name</th>
                              <th>Amount</th>
                            </tr>
                          </thead>
                          <tbody>
                            {payments.map((payment, index) => (
                              <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{payment.purpose.split("Reference = ")[0]}</td>
                                <td>
                                  <span className='badge badge-success'>
                                    ₦ {payment.amount}
                                  </span>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      )}
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </>
        )}
        {/* <!-- end: page --> */}
      </section>
    </section>
  )
}

export default AdminDashboard
