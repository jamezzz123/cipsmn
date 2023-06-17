import React, { useState, useContext, useCallback, useEffect } from 'react'
import axios from '../../default_axios'
import { toast } from 'react-toastify'
import AuthContext from '../../store/auth-context'
import { NavLink } from 'react-router-dom'
import Loader from '../../components/loader'
import swal from 'sweetalert'
import ReactPaginate from 'react-paginate'
const ListSubject = () => {
  const [isLoading, setIsLoading] = useState(false)

  const [subjects, setSubject] = useState([])
  const [isError, setIsError] = useState(false)
  const authCtx = useContext(AuthContext)
  const [pager, setPager] = useState(1)
  const [totalPage, setTotal] = useState(5)
  const [totalVal, setTotalVal] = useState(1)

  const fetchSubject = useCallback(
    (page = pager) => {
      setIsLoading(true)
      axios
        .get(`subject/get-all?page=${page}`, {
          headers: {
            Authorization: `Bearer ${authCtx.token}`,
          },
        })
        .then((response) => {
          setIsLoading(false)
          if (response.status === 201 || response.status === 200) {
            setSubject(response.data.data)
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
      fetchSubject()
    } catch (error) {}
  }, [fetchSubject])

  if (isError) {
    return (
      <section className='body'>
        <section role='main' className='content-body'>
          <header className='page-header'>
            <h2>List Subjects</h2>
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

  const handelDelete = async (id) => {
    swal({
      title: 'Are you sure?',
      text: 'Once deleted, you will not be able to recover this Subject!',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        try {
          const response = await axios.delete(`subject/delete/${id}`, {
            headers: {
              Authorization: `Bearer ${authCtx.token}`,
            },
          })
          if (response.status === 201 || response.status === 200) {
            setSubject(subjects.filter((subject) => subject.id !== id))
            swal("subject has been deleted'", {
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
        swal('subject  is safe!')
      }
    })
  }

  if (isLoading) {
    return (
      <section className='body'>
        <section role='main' className='content-body'>
          <header className='page-header'>
            <h2>List Subjects</h2>
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
      .then(() => fetchSubject(data.selected + 1))
  }
  return (
    <section role='main' className='content-body'>
      <header className='page-header'>
        <h2>Subjects</h2>
      </header>
      <div className='row pt-4 mt-1'>
        <div className='col-lg-12'>
          <div className='col-xl-12'>
            <header className='card-header card-header-transparent'>
              <h2 className='card-title'>Subjects</h2>
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
                  {subjects &&
                    subjects.map((subject, index) => (
                      <tr key={subject.id}>
                        <td>{index + 1}</td>
                        <td>{subject.name}</td>
                        <td>
                          <NavLink
                            to={{
                              pathname: `/admin/view-subject/${subject.id}`,
                              state: {
                                name: subject.name,
                                description: subject.description,
                                image_id: subject.image_id,
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
                              pathname: `/admin/edit-subject/${subject.id}`,
                              state: {
                                name: subject.name,
                                description: subject.description,
                                exam_id: subject.exam_id,
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
                            onClick={() => handelDelete(subject.id)}
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
            subjects.length > 0
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

export default ListSubject
