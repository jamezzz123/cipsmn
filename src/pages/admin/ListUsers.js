import React, { useEffect, useState, useCallback, useContext } from 'react'
import AuthContext from '../../store/auth-context'
import axios from '../../default_axios'
import ReactPaginate from 'react-paginate'
import { NavLink } from 'react-router-dom'
import swal from 'sweetalert'
import Loader from '../../components/loader'
import { toast } from 'react-toastify'
const ListUsers = () => {
  const authCtx = useContext(AuthContext)
  const [pager, setPager] = useState(1)
  const [totalPage, setTotal] = useState(5)
  const [totalVal, setTotalVal] = useState(1)
  const [users, setUsers] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)
  const [account_type, setAccountType] = useState(1)
  const [search_term, setSearchTerm] = useState()

  const accountTypeChangeHandler = (e) => {
    setAccountType(e.target.value)
    console.log(e.target.value)
  }

  const searchTermChangeHandler = (e) => {
    setSearchTerm(e.target.value)
    console.log(e.target.value)
  }



  const fetchUsers = useCallback(
    (page = pager) => {
      setIsLoading(true)
      axios
        .get(`admin/user/get?page=${page}`, {
          headers: {
            Authorization: `Bearer ${authCtx.token}`,
          },
        })
        .then((response) => {
          setIsLoading(false)
          if (response.status === 201 || response.status === 200) {
            setUsers(response.data.data)
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
      fetchUsers()
    } catch (error) {}
  }, [fetchUsers])

  const handelDelete = async (id) => {
    swal({
      title: 'Are you sure?',
      text: 'Once deleted, you will not be able to recover this user account!',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        try {
          const response = await axios.delete(`admin/user/delete/${id}`, {
            headers: {
              Authorization: `Bearer ${authCtx.token}`,
            },
          })
          if (response.status === 201 || response.status === 200) {
            setUsers(users.filter((user) => user.id !== id))
            swal("user has been deleted'", {
              icon: 'success',
            })
            toast.success('User Deleted', {
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
        swal('user account is safe!')
      }
    })
  }

  const changeCurrentPage = (data) => {
    Promise.resolve()
      .then(setPager(data.selected + 1))
      .then(() => fetchUsers(data.selected + 1))
  }

  const changeCurrentPageFilter = (data) => {
    Promise.resolve()
      .then(setPager(data.selected + 1))
      .then(() => handelFilter(data.selected + 1))
  }

  const handelFilter = (page = pager) => {
    setIsLoading(true)
    const formData = {
      account_type: account_type.toString(),
      search_term: search_term.toString(),
    }
    axios
      .post(`admin/user/search?page=${page}`, formData, {
        headers: {
          Authorization: `Bearer ${authCtx.token}`,
        },
      })
      .then((response) => {
        setIsLoading(false)
        if (response.status === 201 || response.status === 200) {
          setUsers(response.data.data)
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
  }

  if (isLoading) {
    return (
      <section className='body'>
        <section role='main' className='content-body'>
          <header className='page-header'>
            <h2>List Users</h2>
          </header>
          <div className='d-flex align-items-center justify-content-center'>
            <Loader />
          </div>
        </section>
      </section>
    )
  }

  if (isError) {
    return (
      <section className='body'>
        <section role='main' className='content-body'>
          <header className='page-header'>
            <h2>List Users</h2>
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

  return (
    <section className='body'>
      <section role='main' className='content-body '>
        <header className='page-header'>
          <h2>List Users</h2>
        </header>
        <div className='row pt-4 pb-4 mt-1'>
          <div className='col-lg-12'>
            <form
              action='pages-search-results.html'
              className='search search-style-1 nav-form inline-block'
              style={{width: "400px"}}
              onSubmit={handelFilter}
            >
              <div className='col-lg-6'/>
                <input
                    name='name'
                    type='text'
                    className='form-control form-control-lg'
                    onChange={searchTermChangeHandler}
                    placeholder="enter firstname or lastname or regId"
                    ></input>
                      
              <div className='col-lg-6'/>
              <select
                className='form-control form-control-lg mb-3'
                onChange={accountTypeChangeHandler}
                value={account_type}
              >
                <option value='2'>Conversion</option>
                <option value='1'>Regular</option>
              </select>
              <button
                id='ms_example7-toggle'
                className='mb-4 mt-1 me-1 btn btn-primary'
              >
                Search
              </button>
              
            </form>
            <div className='col-xl-12'>
              <header className='card-header card-header-transparent'>
                <h2 className='card-title'>Recent Users</h2>
              </header>
              <div className='card-body'>
                <table className='table table-responsive-md table-striped mb-0'>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Name</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users &&
                      users.map((user, index) => (
                        <tr key={user.id}>
                          <td>{index + 1}</td>
                          <td>{`${user.firstname} ${user.lastname}`}</td>
                          <td>
                            <NavLink
                              to={`/admin/view-user/${user.id}`}
                              className='mb-1 mt-1 me-1 btn btn-primary'
                            >
                              view
                            </NavLink>
                          </td>
                          <td>
                            <NavLink
                              to={`/admin/edit-user/${user.id}`}
                              className='mb-1 mt-1 me-1 btn btn-warning'
                            >
                              edit
                            </NavLink>
                          </td>
                          <td>
                            <button
                              type='button'
                              className='mb-1 mt-1 me-1 btn btn-danger'
                              onClick={() => handelDelete(user.id)}
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
              users.length > 0
                ? { display: 'block', paddingTop: '10px' }
                : { display: 'none' }
            }
          >
            {account_type ? (
              <ReactPaginate
                forcePage={pager - 1}
                previousLabel={'prev'}
                nextLabel={'next'}
                breakLabel={'...'}
                pageCount={totalPage}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={changeCurrentPageFilter}
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
            ) : (
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
            )}
          </div>
        </div>
        {/* <!-- end: page --> */}
      </section>
    </section>
  )
}

export default ListUsers
