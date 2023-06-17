import React, { Fragment, useContext, useEffect } from 'react'
import logo from '../assets/img/logo.png'
import logged from '../assets/img/logged-user.jpg'
import { NavLink, useHistory } from 'react-router-dom'

import AuthContext from '../store/auth-context'

const UserLayout = (props) => {
  const authCtx = useContext(AuthContext)
  const history = useHistory()

  const checker = authCtx.regular == true || authCtx.regular == "true" ? true :
    authCtx.registerFeeCheck ? true : false

  console.log(checker)

  const { username } = authCtx

  const localData = JSON.parse(localStorage.getItem('userDetails'))
  const { picture_url } = localData || { picture_url: "" }
  useEffect(() => {
    if (typeof localStorage !== 'undefined') {
      if (localStorage.getItem('sidebar-left-position') !== null) {
        var initialPosition = localStorage.getItem('sidebar-left-position'),
          sidebarLeft = document.querySelector('#sidebar-left .nano-content')

        sidebarLeft.scrollTop = initialPosition
      }
    }
  })

  const logout = () => {
    authCtx.logout()
    history.replace('/login')
  }

  const width = 300
  const height = 50

  return (
    <Fragment>
      {/* start: header */}
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

        {/* start: search & user box */}
        <div className='header-right'>
          <span className='separator'></span>

          <div id='userbox' className='userbox'>
            <a
              href='/#'
              onClick={(e) => e.preventDefault()}
              data-bs-toggle='dropdown'
            >
              <figure className='profile-picture'>
                <img
                  src={picture_url}
                  alt='User'
                  className='rounded-circle'
                  data-lock-picture='img/!logged-user.jpg'
                />
              </figure>
              <div
                className='profile-info'
                data-lock-name={username}
              >
                <span className='name'>{username}</span>
              </div>
            </a>
          </div>
          <button
            className='btn btn-sm btn-outline-danger m-3'
            onClick={logout}
          >
            <i className='fas fa-sign-out-alt' aria-hidden='true'></i>
            {/* Logout */}
          </button>
        </div>
        {/* end: search & user box  */}
      </header>
      {/* end: header */}

      <div className='inner-wrapper'>
        {/* start: aside */}
        {!checker ? null :
          <aside id='sidebar-left' className='sidebar-left'>
            <div className='sidebar-header'>
              <div className='sidebar-title'>Navigation</div>
              <div
                className='sidebar-toggle d-none d-md-block'
                data-toggle-class='sidebar-left-collapsed'
                data-target='html'
                data-fire-event='sidebar-left-toggle'
              >
                <i className='fas fa-bars' aria-label='Toggle sidebar'></i>
              </div>
            </div>

            <div className='nano'>
              <div className='nano-content'>
                <nav id='menu' className='nav-main' role='navigation'>
                  <ul className='nav nav-main'>
                    <li>
                      <NavLink
                        to='/user'
                        className='nav-link'
                        href='file:///C:/cipsmn/user-dashboard.html'
                      >
                        <i className='bx bx-home-alt' aria-hidden='true'></i>
                        <span>Dashboard</span>
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to='/user/certs'
                        className='nav-link'
                        href='file:///C:/cipsmn/user-certificate.html'
                      >
                        <i className='bx bx-certification' aria-hidden='true'></i>
                        <span>Certificates</span>
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to='/user/payments' className='nav-link'>
                        <i className='bx bxl-paypal' aria-hidden='true'></i>
                        <span>Payments</span>
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to='/user/badge' className='nav-link'>
                        <i className='bx bxs-badge-check' aria-hidden='true'></i>
                        <span>Badge</span>
                      </NavLink>
                    </li>
                    {authCtx.donations == "true" ?
                      <li>
                        <NavLink to='/user/donate' className='nav-link'>
                          <i className='bx bx-donate-blood' aria-hidden='true'></i>
                          <span>Donate</span>
                        </NavLink>
                      </li> : null
                    }
                    <li>
                      <NavLink to='/user/profile' className='nav-link'>
                        <i className='bx bxs-user' aria-hidden='true'></i>
                        <span>Profile</span>
                      </NavLink>
                    </li>
                    <li>
                      <div className='nav-link'>
                        <span>Registration Id: {localData?.reg_id || ""}</span>
                      </div>
                    </li>
                  </ul>
                </nav>
              </div>

              {/* <script>
        // Maintain Scroll Position
        if (typeof localStorage !== 'undefined') {
            if (localStorage.getItem('sidebar-left-position') !== null) {
                var initialPosition = localStorage.getItem('sidebar-left-position'),
                    sidebarLeft = document.querySelector('#sidebar-left .nano-content');

                sidebarLeft.scrollTop = initialPosition;
            }
        }
    </script> */}
            </div>
          </aside>
        }
        {/* end: aside */}

        {/* main content goes here */}
        {props.children}
      </div>
    </Fragment>
  )
}

export default UserLayout
