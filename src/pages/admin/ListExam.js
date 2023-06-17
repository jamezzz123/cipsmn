import React, { useEffect, useState, useCallback, useContext } from 'react'
import AuthContext from '../../store/auth-context'
import axios from '../../default_axios'
import ReactPaginate from 'react-paginate'
import Loader from '../../components/loader'
import { NavLink } from 'react-router-dom'
import swal from 'sweetalert'
import { toast } from 'react-toastify'
const ListExam = () => {
  const [exams, setExams] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)
  const authCtx = useContext(AuthContext)
  const [pager, setPager] = useState(1)
  const [totalPage, setTotal] = useState(5)
  const [totalVal, setTotalVal] = useState(1)

  const fetchExams = useCallback(
    (page = pager) => {
      setIsLoading(true)
      axios
        .get(`exam/get-all?page=${page}`, {
          headers: {
            Authorization: `Bearer ${authCtx.token}`,
          },
        })
        .then((response) => {
          setIsLoading(false)
          if (response.status === 201 || response.status === 200) {
            setExams(response.data.data)
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
      fetchExams()
    } catch (error) {}
  }, [fetchExams])

  const handelDelete = async (id) => {
    swal({
      title: 'Are you sure?',
      text: 'Once deleted, you will not be able to recover this Exam!',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        try {
          const response = await axios.delete(`exam/delete/${id}`, {
            headers: {
              Authorization: `Bearer ${authCtx.token}`,
            },
          })
          if (response.status === 201 || response.status === 200) {
            setExams(exams.filter((exam) => exam.id !== id))
            swal("exam has been deleted'", {
              icon: 'success',
            })
            toast.success('exam Deleted', {
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
        swal('exam is safe!')
      }
    })
  }

  if (isError) {
    return (
      <section className='body'>
        <section role='main' className='content-body'>
          <header className='page-header'>
            <h2>List Exams</h2>
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
            <h2>List Exams</h2>
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
      .then(() => fetchExams(data.selected + 1))
  }
  return (
    <section class='body'>
      <section role='main' class='content-body'>
        <header class='page-header'>
          <h2>Exams</h2>
        </header>
        <div class='row pt-4 mt-1'>
          <div class='col-lg-12'>
            <div class='col-xl-12'>
              <header class='card-header card-header-transparent'>
                <h2 class='card-title'>Exams</h2>
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
                    {exams &&
                      exams.map((exam, index) => (
                        <tr key={exam.id}>
                          <td>{index + 1}</td>
                          <td>{`${exam.name}`}</td>
                          <td>
                            <NavLink
                              to={{
                                pathname: `/admin/exam/${exam.id}`,
                                state: {
                                  name: exam.name,
                                  description: exam.description,
                                  image_id: exam.image_id,
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
                                pathname: `/admin/edit-exam/${exam.id}`,
                                state: {
                                  name: exam.name,
                                  description: exam.description,
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
                              onClick={() => handelDelete(exam.id)}
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
              exams.length > 0
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

export default ListExam
