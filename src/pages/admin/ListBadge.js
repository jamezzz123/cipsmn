import React, { useEffect, useState, useCallback, useContext } from 'react'
import AuthContext from '../../store/auth-context'
import axios from '../../default_axios'
import ReactPaginate from 'react-paginate'
import { NavLink } from 'react-router-dom'
import swal from 'sweetalert'
import { toast } from 'react-toastify'
import Loader from '../../components/loader'

const ListBadge = () => {
  const [badges, setBadges] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)
  const [pager, setPager] = useState(1)
  const [totalPage, setTotal] = useState(5)
  const [totalVal, setTotalVal] = useState(1)
  const authCtx = useContext(AuthContext)

  const fetchBadge = useCallback(
    (page = pager) => {
      setIsLoading(true)
      axios
        .get(`badge/get-all?page=${page}`, {
          headers: {
            Authorization: `Bearer ${authCtx.token}`,
          },
          params: {
            pages: pager,
          },
        })
        .then((response) => {
          setIsLoading(false)
          if (response.status === 201 || response.status === 200) {
            setBadges(response.data.data)
            setPager(response.data.current_page)
            setTotal(response.data.last_page)
            setTotalVal(response.data.total)
          } else {
            throw new Error('Something went wrong')
          }
        })
        .catch((err) => {
          toast.error('Something went wrong, please try again later' + err, {
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
      fetchBadge()
    } catch (error) {}
  }, [fetchBadge])

  const handelDelete = async (id) => {
    swal({
      title: 'Are you sure?',
      text: 'Once deleted, you will not be able to recover this Badge!',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        try {
          const response = await axios.delete(`badge/delete/${id}`, {
            headers: {
              Authorization: `Bearer ${authCtx.token}`,
            },
          })
          if (response.status === 201 || response.status === 200) {
            setBadges(badges.filter((badge) => badge.id !== id))
            swal("badge has been deleted'", {
              icon: 'success',
            })
            toast.success('badge Deleted', {
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
        } catch (err) {
          toast.error('something went wrong', {
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
      } else {
        swal('badge is safe!')
      }
    })
  }

  const changeCurrentPage = (data) => {
    Promise.resolve()
      .then(() => {
        setPager(data.selected + 1)
      })
      .then(() => fetchBadge(data.selected + 1))
  }

  if (isError) {
    return (
      <section className='body'>
        <section role='main' className='content-body'>
          <header className='page-header'>
            <h2>List Badges</h2>
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
            <h2>List badges</h2>
          </header>
          <div className='d-flex align-items-center justify-content-center'>
            <Loader />
          </div>
        </section>
      </section>
    )
  }

  return (
    <section class='body'>
      <section role='main' class='content-body'>
        <header class='page-header'>
          <h2>Badge</h2>
        </header>
        <div class='row pt-4 mt-1'>
          <div class='col-lg-12'>
            <div class='col-xl-12'>
              <header class='card-header card-header-transparent'>
                <h2 class='card-title'>Badge</h2>
              </header>
              <div class='card-body'>
                <table class='table table-responsive-md table-striped mb-0'>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Name</th>
                    </tr>
                  </thead>
                  <tbody>
                    {badges &&
                      badges.map((badge, index) => (
                        <tr key={badge.id}>
                          <td>{index + 1}</td>
                          <td>{`${badge.name}`}</td>
                          <td>
                            <NavLink
                              to={{
                                pathname: `/admin/badge/${badge.id}`,
                                state: {
                                  badge_id: badge.id,
                                  name: badge.name,
                                  description: badge.description,
                                  image_id: badge.image_id,
                                },
                              }}
                              className='mb-1 mt-1 me-1 btn btn-primary'
                            >
                              view
                            </NavLink>
                          </td>
                          <td>
                            <NavLink
                              to={{
                                pathname: `/admin/edit-badge/${badge.id}`,
                                state: {
                                  name: badge.name,
                                  description: badge.description,
                                },
                              }}
                              className='mb-1 mt-1 me-1 btn btn-warning'
                            >
                              edit
                            </NavLink>
                          </td>
                          <td>
                            <button
                              type='button'
                              className='mb-1 mt-1 me-1 btn btn-danger'
                              onClick={() => handelDelete(badge.id)}
                            >
                              delete
                            </button>
                          </td>
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
              badges.length > 0
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
      </section>
    </section>
  )
}

export default ListBadge
