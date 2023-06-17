import React, { useEffect, useState, useCallback, useContext } from 'react'
import AuthContext from '../../store/auth-context'
import axios from '../../default_axios'
import ReactPaginate from 'react-paginate'
import Loader from '../../components/loader'
import CurrencyFormat from 'react-currency-format'
import moment from 'moment'
import { toast } from 'react-toastify'
const ViewPayment = () => {
  const [payment, setPayment] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)
  const [pager, setPager] = useState(1)
  const [totalPage, setTotal] = useState(5)
  const [totalVal, setTotalVal] = useState(1)
  const authCtx = useContext(AuthContext)

  const fetchPayment = useCallback(
    (page = pager) => {
      setIsLoading(true)
      axios
        .get(`payment/get-all?page=${pager}`, {
          headers: {
            Authorization: `Bearer ${authCtx.token}`,
          },
        })
        .then((response) => {
          setIsLoading(false)
          if (response.status === 201 || response.status === 200) {
            setPayment(response.data.data)
            setPager(response.data.current_page)
            setTotal(response.data.last_page)
            setTotalVal(response.data.total)
          } else {
            throw new Error('Something went wrong')
          }
        })
        .catch((err) => {
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
          setIsLoading(false)
          setIsError(true)
        })
    },
    [authCtx.token]
  )

  useEffect(() => {
    try {
      fetchPayment()
    } catch (error) {}
  }, [fetchPayment])

  if (isError) {
    return (
      <section className='body'>
        <section role='main' className='content-body'>
          <header className='page-header'>
            <h2>Payments</h2>
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
            <h2>Payments</h2>
          </header>
          <div className='d-flex align-items-center justify-content-center'>
            <Loader />
          </div>
        </section>
      </section>
    )
  }

  const changeCurrentPage = (data) => {
    Promise.resolve()
      .then(() => {
        setPager(data.selected + 1)
      })
      .then(() => fetchPayment(data.selected + 1))
  }
  return (
    <section role='main' className='content-body'>
      <header className='page-header'>
        <h2>Payments</h2>
      </header>
      <div className='row pt-4 mt-1'>
        <div className='col-lg-12'>
          <div className='col-xl-12'>
            <header className='card-header card-header-transparent'>
              <h2 className='card-title'>Recent Payments</h2>
            </header>
            <div className='card-body'>
              <table className='table table-responsive-md table-striped mb-0'>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>User ID</th>
                    <th>Purpose</th>
                    <th>Amount</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {payment &&
                    payment.map((payment, index) => (
                      <tr>
                        <td>{index}</td>
                        <td>{payment.userid}</td>
                        <td>{payment.purpose}</td>
                        <td>
                          {' '}
                          <CurrencyFormat
                            value={payment.amount || '0'}
                            displayType={'text'}
                            thousandSeparator={true}
                            prefix={'₦ '}
                            decimalScale={2}
                            fixedDecimalScale={true}
                          />{' '}
                        </td>
                        <td>{(payment.created_at || '').substring(0, 10)}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div className='row row-gutter-sm justify-content-between'>
        <div className='col-lg-auto order-2 order-lg-1'>
          <p className='text-center text-lg-left mb-0'>
            {`Showing 1${
              totalVal > 20 ? '-' + 20 : totalVal > 1 ? '-' + totalVal : ''
            } of ${totalVal} results`}
          </p>
        </div>
        <div
          className='col-lg-auto order-1 order-lg-2 mb-3 mb-lg-0'
          style={
            payment.length > 0
              ? { display: 'block', paddingTop: '10px' }
              : { display: 'none' }
          }
        >
          <ReactPaginate
            forcePage={pager - 1}
            previousLabel={'prev'}
            nextLabel={'next'}
            breakLabel={'...'}
            pageCount={totalPage}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={changeCurrentPage}
            subContainerClassName={'pages pagination'}
            activeClassName={'active'}
            previousClassName={'page-item'}
            previousLinkClassName={'page-link prev'}
            nextClassName={'page-item'}
            nextLinkClassName={'page-link next'}
            pageClassName={'page-item'}
            pageLinkClassName={'page-link'}
            breakClassName={'page-item'}
            breakLinkClassName={'page-link'}
            containerClassName={
              'pagination pagination-modern pagination-modern-spacing justify-content-center justify-content-lg-start mb-0'
            }
          />
        </div>
      </div>
      {/* end: page */}
    </section>
  )
}

export default ViewPayment
