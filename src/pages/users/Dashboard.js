import React, { useState, useEffect, useCallback, useContext } from 'react'
import Loader from '../../components/loader'
import axios from '../../default_axios'
import { NavLink, useHistory } from 'react-router-dom'
import swal from 'sweetalert'
import AuthContext from '../../store/auth-context'
import CurrencyFormat from 'react-currency-format'
import PayStack, { usePaymentsFunc } from '../../components/paystack'
// import Modal from '../../components/modal'
import Modal from '../../components/ModalComp'
import Modal2 from '../../components/coversionCertificate'

const Dashboard = () => {

  const history = useHistory()
  const authCtx = useContext(AuthContext)

  const [user, setUser] = useState(null)
  const [payments, setPayments] = useState([])
  const [exams, setExams] = useState([])
  const [regCheck, setRegCheck] = useState(true)
  // const checkReg = () => { setRegCheck(!regCheck); swal.stopLoading(); swal.close(); }

  const localData = JSON.parse(localStorage.getItem('userDetails'))

  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)
  const [isModal, setIsModal] = useState(false)
  const [regModal, setRegModal] = useState(false)
  const [isModal2, setIsModal2] = useState(false)

  const [paidRegular, setPaidRegular] = useState(false)

  const { account_type: accounttype } = localData

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
          localStorage.setItem(
            'userDetails',
            JSON.stringify({
              fullname: response.data.name,
              paidforregular: accounttype
                ? accounttype == 1
                  ? response.paid_for_regular == '1'
                    ? true
                    : false
                  : response.paid_for_regular == '1'
                    ? true
                    : false
                : response.paid_for_regular == '1'
                  ? true
                  : false,
              ...localData,
            })
          )
          setPaidRegular(
            accounttype
              ? accounttype === 1
                ? response.paid_for_regular === '1'
                  ? true
                  : false
                : response.paid_for_regular === '1'
                  ? true
                  : false
              : response.paid_for_regular === '1'
                ? true
                : false
          )

          setRegModal(accounttype && accounttype === "2" && !localData.paid_for_registration ? true : false)

          if (accounttype && accounttype == 1) {
            if (response.data.paid_for_regular !== '1' && authCtx.regular === false) {
              // handleRegular()
              setIsModal(true)
              setPaidRegular(false)
            } //setIsModal(true) //
          }
          if (authCtx.certificateUploaded == false) {
            setIsModal2(true)
          }

          let paidTypes = response.data.payment.map(each => each.name)

          let examList = response.data.exam.map((each, key) => paidTypes.includes(each.name) ?
            { ...each, status: "paid" } : { ...each, status: "unpaid" })

          console.log(paidTypes, examList)
          setUser(response.data)
          setPayments(response.data.payment)
          setExams(examList)

        } else {
          //TODO...error state
        }
      })
      .catch((error) => {
        setIsLoading(false)
        setIsError(true)
      })
  }, [authCtx.token])

  const getRegularFee = useCallback(() => {
    axios
      .get('admin/payment-settings/get/3', {
        headers: {
          Authorization: `Bearer ${authCtx.token}`,
        },
      })
      .then((response) => {
        if (response.status === 200 || response.status === 200) {
        } else {
          //TODO...error state
        }
      })
      .catch((error) => {
      })
  }, [authCtx.token])


  const handleRegular = async (id) => {
    swal({
      button: {
        text: regCheck ? 'Close' : 'Pay regular fee',
        value: true,
        visible: true,
        className: 'mb-1 mt-1 me-1 btn btn-warning',
        closeModal: regCheck,
      },
      title: 'Regular user fees',
      text: 'Please pay this fee to access the dashboard.',
      icon: 'warning',
      dangerMode: true,
      closeModal: false,
      closeOnEsc: false,
      showCloseButton: false,
      closeOnClickOutside: false,
    }).then((click) => {
      if (click) {
        // payRegularDeets()
        setRegCheck(!regCheck)
        swal.stopLoading();
        swal.close();
      }
    }).then((click) => {
      if (click) swal.stopLoading(); swal.close();
    })
  }

  useEffect(() => {
    try {
      fetchUser()
    } catch (error) {
      console.log(error)
    }
  }, [])


  return (

    <>
      <Modal show={isModal} clicked={() => setIsModal(false)} title='Regular user fees' action='Delete'
        footer={
          <PayStack
            details={{
              description: authCtx.username + ' Regular fee ',
              type: 'regular',
              email: authCtx.username,
              amount: authCtx.regularAm
            }}
            token={authCtx.token}
            text={'Pay Now'}
            className='mb-1 mt-1 me-1 btn btn-success'
            func={async () => {
              await authCtx.setRegular("true");
              await setIsModal(false);
              console.log("regular paid !!");
              await authCtx.logout()
              history.replace('/login')
            }}
          />
        }>

        <div className="form-body col-md-12">
          <div className='col-md-12 d-flex justify-content-center align-items-center'>
            <div>
              <h3>Please pay this fee to access the dashboard.</h3>
              <h4>After successful payment, kindly re-login to the dashboard.</h4>
            </div>
          </div>
        </div>
      </Modal>
      <script>
        console.log(uthCtx.registerAm)
      </script>
      <Modal show={regModal} clicked={() => setRegModal(false)} title='Registration fees' action='Delete'
        footer={
          <PayStack
            details={{
              description: authCtx.username + ' Registration fee ',
              type: 'registration',
              email: authCtx.username,
              amount: localData.registration_amount || authCtx.registerAm
            }}
            token={authCtx.token}
            text={'Pay Now'}
            className='mb-1 mt-1 me-1 btn btn-success'
            func={async () => {
              await authCtx.setRegisterPaid(true);
              await setRegModal(false);
              console.log("registration paid !!");
              await authCtx.logout()
              history.replace('/login')
            }}
          />
        }>

        <div className="form-body col-md-12">
          <div className='col-md-12 d-flex justify-content-center align-items-center'>
            <div>
              <h3>Please pay the registration fee of ₦{localData.registration_amount} to access the dashboard.</h3>
              <h4>After successful payment, kindly re-login to the dashboard.</h4>
            </div>
          </div>
        </div>
      </Modal>

      <Modal2 isModal={isModal2} setIsModal={() => setIsModal2(false)} />

      <div className='body'>

        <section role='main' className='content-body'>
          <header className='page-header'>
            <h2>Dashboard</h2>
          </header>
          {!user && isLoading && !isError && <Loader />}
          {user && !isLoading && !isError && (
            <div>
              <h4 className='pt-4 mb-0 mt-0 font-weight-bold text-dark'>
                Welcome! {user.name}
              </h4>
              <p className='mb-3'></p>
              <div className='row'>
                <div className='col-md-3'>
                  <section className='card'>
                    <NavLink to='/user/certs'>
                      <div
                        className='card-body bg-primary'
                        style={{ textAlign: 'center' }}
                      >
                        <h1>Certificate</h1>
                      </div>
                    </NavLink>
                  </section>
                </div>

                <div className='col-md-3'>
                  <section className='card'>
                    <NavLink to='/user/payments'>
                      <div
                        className='card-body bg-dark'
                        style={{ textAlign: 'center', color: '#fff' }}
                      >
                        <h1>Payment</h1>
                      </div>
                    </NavLink>
                  </section>
                </div>

                <div className='col-md-3'>
                  <section className='card'>
                    <NavLink to='/user/badge'>
                      <div
                        className='card-body bg-tertiary'
                        style={{ textAlign: 'center', color: '#fff' }}
                      >
                        <h1>Badge</h1>
                      </div>
                    </NavLink>
                  </section>
                </div>

                <div className='col-md-3'>
                  <section className='card'>
                    <NavLink to='/user/donate'>
                      <div
                        className='card-body bg-quaternary'
                        style={{ textAlign: 'center', color: '#fff' }}
                      >
                        <h1>Donate</h1>
                      </div>
                    </NavLink>
                  </section>
                </div>
              </div>

              <div className='row'>
                <div className='col-md-12'>
                  <h4 className='mb-3 font-weight-semibold text-dark'>
                    Below are exams you are expected to take.
                  </h4>{console.log(authCtx.exemptionAm)}
                  {(localData.exemption_paid !== true && (authCtx.exemptedCheck == true || authCtx.exemption == "true" || authCtx.exemption == true)) ?
                    <>
                      <div className='m-1'>
                        <div className='col-lg-6'>

                          <PayStack
                            details={{
                              description: user.name + 'Exemption fee ',
                              type: 'exemption',
                              email: authCtx.username,
                              amount: localData.exemptionAmount || authCtx.exemptionAm,
                            }}
                            func={async () => {
                              localStorage.setItem(
                                'userDetails',
                                JSON.stringify({
                                  ...localData,
                                  exemption_paid: true,
                                }))
                              console.log("exemption paid !!");
                              await authCtx.logout()
                              history.replace('/login')
                            }
                            }
                            token={authCtx.token}
                            text={'Pay the exemption fee of ₦' + authCtx.exemptionAm}
                            className='mb-1 mt-1 me-1 btn btn-danger'
                          />

                        </div>
                      </div>
                      <h5 className='mb-3 font-weight-medium text-dark'>
                        Pay your exemption fee before paying for exams.
                      </h5>
                    </> : null
                  }
                  {(localData.exemption_paid !== true && (authCtx.exemption == "false" || authCtx.exemption == false || authCtx.exemptedCheck !== true)) ?

                    <div
                      className='card-body bg-black-50'
                      style={{ textAlign: 'center', color: '#000' }}
                    >
                      <h4>Exams are inaccessible at the moment.</h4>
                      <p>Contact Admin to ensure that you have been exemted from exams and ensure to pay the exemption fee afterwards.</p>
                    </div> :

                    <div
                      className='scrollable has-scrollbar'
                      data-plugin-scrollable=''
                      style={{ height: '50vh', maxHeight: '500px' }}
                    >
                      <div
                        className='scrollable-content'
                        tabIndex='0'
                        style={{ right: '-17px' }}
                      >
                        <div className='card-body'>
                          {!isError && !isLoading && exams.length < 1 && (
                            <h3>No exams</h3>
                          )}
                          <div className='table-responsive'>
                            {!isError && !isLoading && exams.length > 0 && (
                              <table className='table table-ecommerce-simple table-borderless table-striped mb-1'>
                                <thead>
                                  <tr>
                                    <th>Exam Name</th>
                                    <th>Exam Description</th>
                                    <th>Price</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {exams.map((exam, index) => (
                                    <tr key={index}>
                                      <td>
                                        <a
                                          href='/#'
                                          onClick={(e) => e.preventDefault()}
                                          className={`${exam.status == "paid" ? "text-muted" : ""} font-weight-semibold`}
                                        >
                                          {exam.name}
                                        </a>
                                      </td>
                                      <td>
                                        <a
                                          href='/#'
                                          onClick={(e) => e.preventDefault()}
                                          className={`${exam.status == "paid" ? "text-muted" : ""} font-weight-semibold`}
                                        >
                                          {exam.description}
                                        </a>
                                      </td>
                                      <td>
                                        <CurrencyFormat
                                          value={exam.amount || '0'}
                                          displayType={'text'}
                                          thousandSeparator={true}
                                          prefix={'₦ '}
                                          decimalScale={2}
                                          fixedDecimalScale={true}
                                        />
                                      </td>
                                      <td>
                                        {exam.status == "paid" ? <span className='text-muted font-weight-semibold'>Paid</span> :
                                          <PayStack
                                            details={{
                                              description: exam.name,
                                              type: 'exam',
                                              email: authCtx.username,
                                              amount: exam.amount,
                                            }}
                                            token={authCtx.token}
                                            text={'Pay now'}
                                            className=' btn btn-success'
                                            func={() => fetchUser()}
                                          />
                                        }
                                        {/* <a
                                      href='/#'
                                      onClick={(e) => e.preventDefault()}
                                      className=' btn btn-success'
                                    >
                                      Pay now
                                    </a> */}
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  }
                </div>
                {/* <!-- end: page --> */}
              </div>

              <div className='row pt-1 mt-5' style={{ right: '-20px' }}>
                <section className='row mb-3'>
                  <div className='col-xl-12'>
                    <header className='card-header card-header-transparent'>
                      <h2 className='card-title'>Recent Payments</h2>
                    </header>
                    <div className='card-body'>
                      {!isError && !isLoading && payments.length < 1 && (
                        <h3>No payments</h3>
                      )}
                      {!isError && !isLoading && payments.length > 0 && (
                        <table className='table table-responsive-md table-striped mb-0'>
                          <thead>
                            <tr>
                              <th>#</th>
                              <th>Type</th>
                              <th>Name</th>
                              <th>Amount</th>
                              <th>Pupose</th>
                              <th>Status</th>
                              <th>Date</th>
                            </tr>
                          </thead>
                          <tbody>
                            {payments.map((payment, index) => (
                              <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{payment.type || ''}</td>
                                <td>{payment.name || ''}</td>
                                <td>
                                  <CurrencyFormat
                                    value={payment.amount || '0'}
                                    displayType={'text'}
                                    thousandSeparator={true}
                                    prefix={'₦ '}
                                    decimalScale={2}
                                    fixedDecimalScale={true}
                                  />
                                </td>
                                <td>
                                  {
                                    (payment.purpose || '').split(
                                      'Reference ='
                                    )[0]
                                  }
                                </td>
                                <td>{payment.status || ''}</td>
                                <td>
                                  {(payment.created_at || '').substring(0, 10)}
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
          )}

          {/* <!-- end: page --> */}
        </section>
      </div >
    </>
  )
}

export default Dashboard
