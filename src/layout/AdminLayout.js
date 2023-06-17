import React, { Fragment, useContext } from 'react'
import logo from '../assets/img/logo.png'
import logged from '../assets/img/logged-user.jpg'
import { useHistory } from 'react-router-dom'
import AuthContext from '../store/auth-context'
import SideBar from './SideBar'

const AdminLayout = (props) => {
  const authCtx = useContext(AuthContext)
  const history = useHistory()
  const { username } = authCtx

  const logout = () => {
    authCtx.logout()
    history.replace('/login')
  }
  const width = 300
  const height = 50

  // const {username} = JSON.parse(localStorage.getItem('userDetails') || {"username": ""})

  return (
    <Fragment>
      {/* <!-- start: header --> */}
      <header className='header'>
        <div className='logo-container'>
          <a href='../4.0.0' className='logo'>
            <img src={logo} width={width} height={height} alt='Logo' />
          </a>

          <div
            className='d-md-none toggle-sidebar-left'
            data-toggle-class='sidebar-left-opened'
            data-target='html'
            data-fire-event='sidebar-left-opened'
          >
            <i className='fas fa-bars' aria-label='Toggle sidebar'></i>
          </div>
        </div>

        {/* <!-- start: search & user box --> */}
        <div className='header-right'>
          <span className='separator'></span>

          <div id='userbox' className='userbox'>
            <a
              href='/#'
              onClick={(e) => e.preventDefault()}
              data-bs-toggle='dropdown'
            >
              <figure className='profile-picture'>
                <img src={logged} alt='User' className='rounded-circle' />
              </figure>
              <div
                className='profile-info'
                data-lock-name={username}
                data-lock-email={username}
              >
                <span className='name'>{username}</span>
              </div>
            </a>
          </div>
          <button className='btn btn-sm btn-outline-danger m-3' onClick={logout}>
          <i className='fas fa-sign-out-alt' aria-hidden='true'></i>
            {/* Logout */}
          </button>
        </div>
        {/* <!-- end: search & user box --> */}
      </header>
      {/* <!-- end: header --> */}

      <div className='inner-wrapper'>
        {/* <!-- start: sidebar --> */}
        <SideBar />
        {/* <!-- end: sidebar --> */}

        {/* main content goes below */}
        {props.children}
      </div>
    </Fragment>
  )
}

export default AdminLayout
